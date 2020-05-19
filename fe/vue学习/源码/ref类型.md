ref类型是用来做基本类型包装的，一个普通的对象可以通过Proxy来做劫持，但是基本类型行不通，vue3的做法是直接把基本类型包装在一个object的`.value`中，同时直接劫持这个object.value的getter和setter来实现响应式。



### isRef

```javascript
const isRefSymbol = Symbol()

export interface Ref<T = any> {
  // This field is necessary to allow TS to differentiate a Ref from a plain
  // object that happens to have a "value" field.
  // However, checking a symbol on an arbitrary object is much slower than
  // checking a plain property, so we use a _isRef plain property for isRef()
  // check in the actual implementation.
  // The reason for not just declaring _isRef in the interface is because we
  // don't want this internal field to leak into userland autocompletion -
  // a private symbol, on the other hand, achieves just that.
  [isRefSymbol]: true
  value: T
}

export function isRef<T>(r: Ref<T> | unknown): r is Ref<T>
export function isRef(r: any): r is Ref {
  return r ? r._isRef === true : false
}
```

判断Ref类型实际会使用_isRef这个key，因为效率更高，判断symbol属性慢得多。

之所以不在接口里声明_isRef是因为这个symbol是一个私有属性，不希望对外暴露。



### ref & shallowRef

```javascript
export function ref<T>(value: T): T extends Ref ? T : Ref<UnwrapRef<T>>
export function ref<T = any>(): Ref<T | undefined>
export function ref(value?: unknown) {
  return createRef(value)
}

export function shallowRef<T>(value: T): T extends Ref ? T : Ref<T>
export function shallowRef<T = any>(): Ref<T | undefined>
export function shallowRef(value?: unknown) {
  return createRef(value, true)
}


function createRef(value: unknown, shallow = false) {
  if (isRef(value)) {
    return value
  }
  if (!shallow) {
    value = convert(value)
  }
  const r = {
    _isRef: true,
    get value() {
      track(r, TrackOpTypes.GET, 'value')
      return value
    },
    set value(newVal) {
      value = shallow ? newVal : convert(newVal)
      trigger(
        r,
        TriggerOpTypes.SET,
        'value',
        __DEV__ ? { newValue: newVal } : void 0
      )
    }
  }
  return r
}
```

ref就是用来追踪基本类型的方法，xxx.value会被proxy依赖追踪。
shwllowRef只保证这个值本身，不会做深层转换,如果`xxx.value = {...}` ，这个对象就不会是响应式的了。



### customRef

```javascript
export function customRef<T>(factory: CustomRefFactory<T>): Ref<T> {
  const { get, set } = factory(
    () => track(r, TrackOpTypes.GET, 'value'),
    () => trigger(r, TriggerOpTypes.SET, 'value')
  )
  const r = {
    _isRef: true,
    get value() {
      return get()
    },
    set value(v) {
      set(v)
    }
  }
  return r as any
}
```

可以自定义一个ref对象，自定义getter和setter，通常可以用来做debounce、observerble、返回promise等。