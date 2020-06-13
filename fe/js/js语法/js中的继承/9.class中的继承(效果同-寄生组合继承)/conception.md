## 主要是依靠两个东西：

`extends`

`super`

## 理解两个参数

### extends

#### 理解extends的基本作用

```js
class Parent {
  constructor (name) {
    this.name = name
  }
  getName () {
    console.log(this.name)
  }
}

class Child extends Parent {}

// 等同于
class Child extends Parent {
    constructor (name) {
        super(name)
        this.sex = 'boy'
    }
}

```
在class中如果没有定义constructor方法的话，这个方法是会被默认添加的。

所以对于extends，他的作用：
    
    1. class可以通过extends关键字实现继承父类的所有属性和方法
    2. 若是使用了extends实现继承的子类内部没有constructor方法，则会被默认添加constructor和super


#### 理解extends的继承目标

`extends后面接着的继承目标不一定要是个class。`

`class B extends A {}，只要A是一个有prototype属性的函数，就能被B继承。`

`由于函数都有prototype属性，因此A可以是任意函数`

### super

#### 作用

super在constructor中，绝对不能省！！

这个和es6的继承机制有关：
    
    1。ES5中的继承(例如构造继承、寄生组合继承) ：
    实质上是先创造子类的实例对象this，然后再将父类的属性和方法添加到this上(使用的是Parent.call(this))。
    
    2。而在ES6中却不是这样的：
    它实质是先创造父类的实例对象this(也就是使用super())，然后再用子类的构造函数去修改this。
    
    
子类必须得在constructor中调用super方法，否则新建实例就会报错，
因为子类自己没有自己的this对象，而是继承父类的this对象，然后对其加工，如果不调用super的话子类就得不到this对象

#### super的两种用法

ES6规定，通过super调用父类的方法时，super会绑定子类的this

1.一种是当作函数来调用

    1. 当super被当作函数调用时，代表着父类的`构造函数`(但是返回的却是子类的实例，也就是说super内部的this指向的是Child)
    
    2. 在子类的constructor中super()就相当于是Parent.constructor.call(this)

 当作函数来使用时的一些限制：
 
    1。子类constructor中如果要使用this的话就必须放到super()之后（super()，它就是用来产生实例this的，那么再调用它之前，肯定是访问不到this的啦）
    
    2。super当成函数调用时只能在子类的construtor中使用
2. 一种是当做对象来使用

super如果当成一个对象来调用的话，也可能存在于class里的不同地方，比如`constructor`、`子类实例方法`、`子类构造方法`，在这些地方它分别指代的是什么呢

只需要记住：
1）在子类的普通函数中super对象指向父类的原型对象

2）在子类的静态方法中super对象指向父类

```js
class Parent {
  constructor (name) {
    this.name = name
  }
// 父类原型对象上的方法
  getName () {
    console.log(this.name)
  }
}

// 父类原型对象上的方法
Parent.prototype.getSex = function () {
	console.log('boy')
}
// 为父类的静态方法
Parent.getColors = function () {
  console.log(['white'])
}
class Child extends Parent {
  constructor (name) {
    super(name)
    super.getName()
  }
// 子类原型对象上方法
  instanceFn () {
    super.getSex()
  }
// 子类的静态方法
  static staticFn () {
    super.getColors()
  }
}
var child1 = new Child('child1') // 此时会log：child1
child1.instanceFn() // 实际调用来父类原型上的getSex，log：boy

Child.staticFn() // 实际调用父类的静态方法getColors，log：['white']

console.log(child1) // log：Child{ name: 'child1' }
// 即，输出child1的实例属性和方法
//child1中就只有一个name属性是通过调用super(name)从父级那里复制来的，其它方法都不能被child1"表现"出来，但是可以调用


```


## 总结

###ES6中的继承：

主要是依赖extends关键字来实现继承，且继承的效果类似于寄生组合继承

使用了extends实现继承不一定要constructor和super，因为没有的话会默认产生并调用它们

extends后面接着的目标不一定是class，只要是个有prototype属性的函数就可以了

###super相关：

在实现继承时，如果子类中有constructor函数，必须得在constructor中调用一下super函数，因为它就是用来产生实例this的。

super有两种调用方式：当成函数调用和当成对象来调用。
    
    super当成函数调用时，代表父类的构造函数，且返回的是子类的实例，也就是此时super内部的this指向子类。在子类的constructor中super()就相当于是Parent.constructor.call(this)。
    
    super当成对象调用时，普通函数中super对象指向父类的原型对象，静态函数中指向父类。且通过super调用父类的方法时，super会绑定子类的this，就相当于是Parent.prototype.fn.call(this)。

### ES5继承和ES6继承的区别：

    在ES5中的继承(例如构造继承、寄生组合继承) ，实质上是先创造子类的实例对象this，然后再将父类的属性和方法添加到this上(使用的是Parent.call(this))。

    而在ES6中却不是这样的，它实质是先创造父类的实例对象this(也就是使用super())，然后再用子类的构造函数去修改this。
