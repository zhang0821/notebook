##思路
使用**原型链继**承来保证子类能继承到父类**原型中**的属性和方法

使用**构造继承**来保证子类能继承到父类的**实例**属性和方法
```js
// 原型链继承
Child.prototype = new Parent()
// 构造继承
function Child () {
  Parent.call(this, ...arguments)
}
```

##基操：
1. 通过call/apply在子类构造函数内部调用父类构造函数

2. 将子类构造函数的原型对象指向父类构造函数创建的一个匿名实例

3. 修正子类构造函数原型对象的constructor属性，将它指向子类构造函数

`constructor`在这里是啥？—— 是原型对象上的一个属性，指向的是构造函数

```js
child1.__proto__ = Parent.prototype;
Parent.prototype.constructor = Parent
child1.__proto__.constructor = Parent
```
#### constructor实际的意义和用途（其实用__proto__就可以代替）


constructor它是构造函数原型对象中的一个属性，正常情况下它指向的是原型对象。

它并不会影响任何JS内部属性，只是用来标示一下某个实例是由哪个构造函数产生的而已。

如果我们使用了原型链继承或者组合继承无意间修改了constructor的指向，那么出于编程习惯，我们最好将它修改为正确的构造函数。


考虑下面的场景case
```js
var a;
(function () {
  function A () {
    this.a = 1
    this.b = 2
  }
  A.prototype.logA = function () {
    console.log(this.a)
  }
  a = new A()
})()

a.logA()

```
Q: 此时 不想修改匿名函数里面这部分，要给A新增一个方法logB来打印b，该怎么做呢

A: 外层访问不到A，但是我们可以通过原型链查找，来获取A的原型对象。使用constructor（或者__proto__）
```js
a.__proto__.logB = function () {
  console.log(this.b)
}
a.logB()

//  或者

a.constructor.prototype.logB = function () {
  console.log(this.b)
}
a.logB()

```

## 优缺点
优点：

    1. 可以继承父类实例属性和方法，也能够继承父类原型属性和方法
    2. 弥补了原型链继承中引用属性共享的问题
    3. 可传参（call的时候传参），可复用(方法放在父类的prototype上就好)

缺点：

    1. 使用组合继承的时候，会凭空多调用一次父类构造函数
        第一次是原型链继承的时候，new Parent()
        第二次是构造继承的时候，Parent.call()调用的
    2. 所以生成了两个实例，子类实例中的属性和方法会覆盖子类原型(父类实例)上的属性和方法，
    所以增加了不必要的内存。

一个tips的例子

```js
function Parent (name, colors) {
  this.name = name
  this.colors = colors
}
Parent.prototype.features = ['cute']
function Child (name, colors) {
  Parent.apply(this, [name, colors])
}
Child.prototype = new Parent()
Child.prototype.constructor = Child

var child1 = new Child('child1', ['white'])
child1.colors.push('yellow')
child1.features.push('sunshine')
var child2 = new Child('child2', ['black'])

console.log(child1.colors)
// ['white', 'yellow']
console.log(child2.colors)
// ['black']

console.log(child1.features)
// ['cute', 'sunshine']
console.log(child2.features)
// ['cute', 'sunshine']

// 因为child1， child2都没有各自的实例的feture属性，都是沿着原型链去父类上查找的，操作的都是同一个内存地址

```
