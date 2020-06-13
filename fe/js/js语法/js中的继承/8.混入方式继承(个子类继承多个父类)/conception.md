## 主要利用： ES6中的方法Object.assign()

## 原理

伪代码

```js
function Child () {
    Parent.call(this)
    OtherParent.call(this)
}
Child.prototype = Object.create(Parent.prototype)
Object.assign(Child.prototype, OtherParent.prototype)
Child.prototype.constructor = Child;

```
