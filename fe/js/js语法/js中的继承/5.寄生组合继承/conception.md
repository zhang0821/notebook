### 前言
组合继承的缺点是：

1. 父类构造函数会被调用两次(调用执行Child.prototype = new Parent()，的时候，多执行了一次，继承父类实例的属性)
2. 生成了两个实例，在父类实例上产生了无用废弃的属性

Q: 那么怎么才能只想要一个干净并且能链接到父类原型链上的对象?(不是通过继承父类实例上的属性来实现继承，而让我直接就能继承父类原型链上的属性

### A: 利用 Object.creat()

```js
// proto，需要指定的原型对象, 指定你要新建的这个对象它的原型对象
// propertiesObject,，可选参数，给新对象自身添加新属性以及描述器
Object.create(proto, propertiesObject);
```
但同时要注意，因为使用Object.create，所以此时Child的constructor是null,需要手动为其赋值回他的constructor

`Child.prototype.constructor = Child`

## 寄生组合继承的实现方法

**区别于组合组合继承的只有一步**： 利用 `Child.prototype = Object.create(Parent.prototype)`来替代之前的`new Parent()`

```js
function Parent (name) {
  this.name = name
}
Parent.prototype.getName = function () {
  console.log(this.name)
}
function Child (name) {
  this.sex = 'boy'
  Parent.call(this, name)
}
// 与组合继承的区别
Child.prototype = Object.create(Parent.prototype) // 使得 child1.__proto__ 为 Parent.prototype
Child.prototype.constructor = Child;

var child1 = new Child('child1')

console.log(child1)
child1.getName()

console.log(child1.__proto__)
console.log(Object.create(null))
console.log(new Object())

```
### 延伸 `Object.create(null)` 和 `new Object()`的区别
1. Object.create(null) ： 传递的参数是null，将它的__proto__属性设置为null，
那它就相当于是没有原型链了，连Object.prototype上的方法它都不能用了(比如toString()、hasOwnProperty())

2. new Object() : Object本身就是一个构造函数，就像Parent、Child这种，只不过它的原型对象是我们常用的Object.prototype

## 总结
寄生组合继承算是ES6之前一种比较完美的继承方式吧。

它避免了组合继承中调用两次父类构造函数，初始化两次实例属性的缺点。

所以它拥有了上述所有继承方式的优点：

    1。只调用了一次父类构造函数，只创建了一份父类属性
    
    2。子类可以用到父类原型链上的属性和方法
    
    3。能够正常的使用instanceOf和isPrototypeOf方法
