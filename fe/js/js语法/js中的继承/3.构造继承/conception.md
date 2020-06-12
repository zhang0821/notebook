在子类构造函数内部使用call或apply来调用父类构造函数
**使用apply、call、bind**

    通过call()、apply()或者bind()方法直接指定this的绑定对象, 如foo.call(obj)
    
    使用.call()或者.apply()的函数是会直接执行的
    
    而bind()是创建一个新的函数，需要手动调用才会执行
    
    .call()和.apply()用法基本类似，不过call接收若干个参数，而apply接收的是一个数组
    

##基本原理

```js
function Parent (name) {
    this.name = name
}
function Child () {
    this.sex = 'boy';
    // 构造函数内部调用父类构造函数 实现继承
    Parent.call(this, 'child')
}
var child1 = new Child();

console.log(child1);
// child1内部属性有：sex， name

```
### 子类和父类同属性时，具体取值哪个按照先后顺序来判断，后面的会覆盖前面的
```js
function Parent (name) {
  this.name = name
}
// tips：这个原型上的方法，不能被Child继承了
Parent.prototype.getName = function () {
  console.log(this.name)
}

function Child () {
  this.sex = 'boy';
  Parent.call(this, 'good boy');//1
  this.name = 'bad boy'//2
}
var child1 = new Child();
console.log(child1.name) // 'bad boy'
// 若1，2对换，则输出：'good boy'
```

###优缺点
优点：
    
    1. 解决了原型链继承中，子类共享父类引用对象的问题。（当继承一个引用类型的属性时，某一个子类修改值，所有别的子类包括父类的该值都被修改的问题）
    因为：使用父类的构造函数来增强子类实例，等于是复制父类的实例属性给子类
    2. 实现多继承 (子类的构造函数中，可以去实例话call多个父类)
    3. 创建子类实例时，可以向父类传递参数

缺点：

    1. 构造继承只能继承父类的实例属性和方法，不能继承父类原型的属性和方法。（Parent.call(this, 'good boy')只是复制了Parent构造函数里的属性和方法，不包括原型对象
    2. 实例并不是父类的实例，只是子类的实例(`child1 instanceof Parent`的值为false)
    3. 无法实现函数复用，每个子类都有父类实例函数的副本，影响性能
