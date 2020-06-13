## 概念

寄生式继承也没啥东西的，
它就是在原型式继承的基础上再封装一层，
来增强对象，之后将这个对象返回


原理是：


```js
function createAnother (original) {
    // 通过调用 Object.create() 函数创建一个新对象
    var clone = Object.create(original);
    
    // 以某种方式来增强对象
    clone.fn = function () {};
    
    // 返回这个对象
    return clone;
}

```

### 主要用途： 想要继承某个对象上的属性，同时又想在新创建的对象中新增上一些其它的属性。


```js
var cat = {
  heart: '❤️',
  colors: ['white', 'black']
}
function createAnother (original) {
    var clone = Object.create(original);
    // 新增来一个属性
    clone.actingCute = function () {
      console.log('我是一只会卖萌的猫咪')
    }
    return clone;
}
var guaiguai = createAnother(cat)
var huaihuai = Object.create(cat)

guaiguai.actingCute()
console.log(guaiguai.heart)
console.log(huaihuai.colors)
console.log(guaiguai)
console.log(huaihuai)

```

## 总结

实现方式：

在原型式继承的基础上再封装一层，来增强对象，之后将这个对象返回。

优点：

再不用创建构造函数的情况下，实现了原型链继承，代码量减少一部分。

缺点：

一些引用数据操作的时候会出问题，两个实例会公用继承实例的引用数据类
谨慎定义方法，以免定义方法也继承对象原型的方法重名
无法直接给父级构造函数使用参数

