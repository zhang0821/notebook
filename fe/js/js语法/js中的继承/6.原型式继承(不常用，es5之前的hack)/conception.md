## 概念

原理是：


```js

function objcet (obj) {
    // 创建一个构造函数
    function F () {};
    // 构造函数的原型指向对象
    F.prototype = obj;
    F.prototype.constructor = F;
    
    // 然后调用 new 操作符创建实例，返回这个实例
    return new F();

    //本质是一个浅拷贝
}
```

其实这个方式存在是因为在es5之前，没有object.create方法，所以用了当面这个函数来代替它
