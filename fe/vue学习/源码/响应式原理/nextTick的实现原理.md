## 作用

```javascript
Defer a task to execute it asynchronously 将一个立即执行函数延迟到当前调用栈执行完以后执行

延迟一个任务使其异步执行，在下一个tick时执行，一个立即执行函数，返回一个function

这个函数的作用是在task或者microtask中推入一个timerFunc，在当前调用栈执行完以后以此执行直到执行到timerFunc 
```

​	[nextTick](https://cn.vuejs.org/v2/api/#Vue-nextTick)函数执行的目的是在microtask或者task中推入一个function，在当前栈执行完毕（也许还会有一些排在前面的需要执行的任务）以后执行nextTick传入的function



## 两个相关问题

####为什么用microtask

可以使用的有：task、microtask， 二者的区别在于：

		根据 HTML Standard，在每个 task 运行完以后，UI 都会重渲染，那么在 microtask 中就完成数据更新，当前 task 结束就可以得到最新的 UI 了。
		反之如果新建一个 task 来做数据更新，那么渲染就会进行两次。

####这个被推入microtask的timerFunc的实现方式选取

在timerFunc实现的选取中，作者在源码中做了注释说明，大意是：

一共有`Promise`、`MutationObserver`以及`setTimeout`三种尝试得到timerFunc的方法

		JS 的 event loop 执行时会区分 task 和 microtask，引擎在每个 task 执行完毕，从队列中取下一个 task 来执行之前，会先执行完所有 microtask 队列中的 microtask。setTimeout 回调会被分配到一个新的 task 中执行，而 Promise 的 resolver、MutationObserver 的回调都会被安排到一个新的 microtask 中执行，会比 setTimeout 产生的 task 先执行。
		
		要创建一个新的 microtask，优先使用 Promise
		如果浏览器不支持，再尝试 MutationObserver。
		实在不行，只能用 setTimeout 创建 task 了。
		
	作者：顾轶灵
	链接：https://www.zhihu.com/question/55364497/answer/144215284
	来源：知乎
	
	首先是Promise，Promise.resolve().then()可以在microtask中加入它的回调，
	
	MutationObserver新建一个textNode的DOM对象，用MutationObserver绑定该DOM并指定回调函数，在DOM变化的时候则会触发回调,该回调会进入microtask，即textNode.data = String(counter)时便会加入该回调。
	
	setTimeout是最后的一种备选方案，它会将回调函数加入task中，等到执行。




综上，nextTick的目的就是产生一个回调函数加入task或者microtask中，当前栈执行完以后（可能中间还有别的排在前面的函数）调用该回调函数，起到了异步触发（即下一个tick时触发）的目的。

####延伸 ：macrotasks，microtasks

​	`macrotasks:`setTimeout ，setInterval， setImmediate，requestAnimationFrame,I/O ，UI渲染

​	`microtasks:` Promise， process.nextTick， Object.observe， MutationObserver

```javascript
	当一个程序有：setTimeout， setInterval ，setImmediate， I/O， UI渲染，Promise ，process.nextTick， Object.observe， MutationObserver的时候：
	
	1.先执行 macrotasks：I/O -》 UI渲染-》requestAnimationFrame
	2.再执行 microtasks ：process.nextTick -》 Promise -》MutationObserver ->Object.observe
	3.再把setTimeout setInterval setImmediate【三个货不讨喜】 塞入一个新的macrotasks，
	依次：setTimeout ，setInterval --》setImmediate
```


##相关参量：

`timerFunc`: 一个函数指针，指向函数将被推送到任务队列中，等到主线程任务执行完时，任务队列中的timerFunc被调用

`callbacks`：存放异步执行的回调。传入的cb会被push进`callbacks`中存放起来

`pending`: 一个标记位，如果已经有timerFunc被推送到任务队列中去则不需要重复推送。用于判断保证timerFunc在下一个tick之前只执行一次

`isUsingMicroTask`: 是一个状态标记。是否使用MicroTasks

`flushCallbacks内部接口`：下一个tick时的回调


		作为一个回掉函数使用
		内部主要工作：复制取出callbacks参量中存储的所有cb,并依次执行。



##timerFunc参量函数具体实现


#### 支持promise的宿主环境内

```javascript
timerFunc = () => {
    Promise.resolve().then(flushCallbacks)
    if (isIOS) setTimeout(noop) //强制添加一个处理计时器来刷新microTasks队列
  }
  
  /*(isIOS) setTimeout(noop) 操作的说明
  在有问题的UIWebViews中，Promise.then不会完全崩溃，但它可能会陷入一种奇怪的状态，即回调被推送到微任务队列中，但队列不会被刷新，直到浏览器需要执行一些其他工作，例如处理计时器。因此，我们可以通过添加一个空计时器来“强制”刷新微任务队列。
  */
```


#### 支持MutationObserver的宿主环境内

`判定条件`

```javascript
/*依据：
已知的：PhantomJS, iOS7, Android 4.4不支持promise
MutationObserver is unreliable in IE11)
*/
!isIE
&& typeof MutationObserver !== 'undefined'
&& (
  isNative(MutationObserver) ||
  // PhantomJS and iOS 7.x
  MutationObserver.toString() === '[object MutationObserverConstructor]'
)
```

`具体实现`

新建一个textNode的DOM对象，用MutationObserver绑定该DOM并指定回调函数，在DOM变化的时候则会触发回调,该回调会进入主线程（比任务队列优先执行），即textNode.data = String(counter)时便会触发回调

```javascript
	let counter = 1
	const observer = new MutationObserver(flushCallbacks)
  const textNode = document.createTextNode(String(counter))
  observer.observe(textNode, {
    characterData: true
  })
  timerFunc = () => {
    counter = (counter + 1) % 2
    textNode.data = String(counter)
  }
```

####前两者都不支持的情况下，已task形式新增任务，使用settimeout即可

```javascript
timerFunc = () => {
    setTimeout(flushCallbacks, 0)
  }
```



##nextTick接口函数具体实现

```js
export function nextTick (cb?: Function, ctx?: Object) {
  let _resolve
  callbacks.push(() => {
    if (cb) {
      try {
        cb.call(ctx)
      } catch (e) {
        handleError(e, ctx, 'nextTick')
      }
    } else if (_resolve) {
      _resolve(ctx)
    }
  })
  if (!pending) {
    pending = true
    timerFunc()
  }
  // $flow-disable-line
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(resolve => {
      _resolve = resolve
    })
  }
}
```



### 使用Vue.js的global API的$nextTick方法，即可在回调中获取已经更新好的DOM实例

Eg:访问真实DOM节点更新后的数据

```html
<template>
  <div>
    <div ref="test">{{test}}</div>
    <button @click="handleClick">tet</button>
  </div>
</template>

```

```javascript
export default {
    data () {
        return {
            test: 'begin'
        };
    },
    methods () {
        handleClick () {
            this.test = 'end';
            this.$nextTick(() => {
                console.log(this.$refs.test.innerText);//打印"end"
            });
            console.log(this.$refs.test.innerText);//打印“begin”
        }
    }
}
```
