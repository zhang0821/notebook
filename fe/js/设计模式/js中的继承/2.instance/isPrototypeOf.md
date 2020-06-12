
它属于Object.prototype上的方法，这点你可以将Object.prototype打印在控制台中看看。

isPrototypeOf()的用法和instanceof相反。

它是用来判断指定对象object1是否存在于另一个对象object2的原型链中，是则返回true，否则返回false

```js
Child.prototype.isPrototypeOf(child1)
// true
```
