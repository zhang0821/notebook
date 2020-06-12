##核心思想： 将子类的原型对象指向父类的实例
```js
function Parent () {
  this.name = 'Parent';
  this.sex = 'boy'
}
Parent.prototype.getName = function () {
  console.log(this.name)
};
function Child () {
  this.name = 'child'
};
Child.prototype = new Parent();

var child1 = new Child();
child1.getName()
```
但是这时 child到自己本身Child上的原型链路会被切断。

Q:为什么原型链继承是要用Child.prototype = new Parent()这种方式?
A: 如果 采用Child.prototype = Parent.prototype的方式来继承，只能拿到父类原型上的属性和方法，拿不到构造器内的

## 总结
优点：

继承了父类的模板，又继承了父类的原型对象

缺点：

如果要给子类的原型上新增属性和方法，就必须放在Child.prototype = new Parent()这样的语句后面

无法实现多继承(因为已经指定了原型对象了)

来自原型对象的所有属性都被共享了，这样如果不小心修改了原型对象中的**引用类型**属性，那么所有子类创建的实例对象都会受到影响

创建子类时，无法向父类构造函数传参数(这点从child1.name可以看出来)
