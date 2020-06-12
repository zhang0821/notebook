## es6之前 是构造函数
```js
    function Cat(name, color) {
        // 私有成员
        var heart = '❤️';
        var stomach = '胃';
    
        // 私有属性方法
        var heartbeat = function () {
            console.log(heart + '跳');
        };
    
        // 公共成员
        this.name = name;
        this.color = color;
    
        // 公有属性方法
        this.jump = function () {
            heartbeat();
        };
    }

    // 静态属性方法
    // 只存在Cat类上，不存在于实例上
    Cat.actingCute = function () {
        console.log('一听到猫我就想到了它会卖萌')
    };
    
    Cat.prototype.cleanTheBody = function () {
        console.log('我会用唾液清洁身体')
    }

    Cat.name = '原型对象上的name';

    let mycat = new Cat('selfName', 'black');

    // 校验原型链的属性查找
    // 在原型对象的原型对象上定义一个属性
    Cat.prototype.name1 = '原型对象的原型对象上的name'
    Object.prototype.name2 = '最顶层对象的属性'
```
1. 静态属性方法, 只存在Cat类上，不存在于实例上
2. 定义上prototype上的 属于公有属性
3. var开头定义的 就是私有属性
4. 打印mycat时，只会打印出实例上会有的属性，原型对象上的属性，比如cleanTheBody,不会打印出来
### 构造函数内一些概念的区分
1. prototype上添加的属性，和直接在构造函数内部采用`this.`定义的属性，都能属于一个实例的方法
2. 二者的区分，可以采用：`.hasOwnProperty()`, 对于构造函数内部定义的属性，就是实例自身的属性
3. 构造函数内部的`this.`表示的是：给使用构造函数创建的实例上增加属性s，
而不是给构造函数本身增加(只有Cat.xx才是给构造函数上增加属性)
#### 关联延伸

下面这三个方法可以用来校验出一个实例的自身属性：

for...in...
// 能获取到实例对象**自身**的属性和**原型链上**的属性

Object.keys()，同Object.getOwnPropertyNames()
// 只能获取实例对象**自身的**属性

Object.getOwnPropertyNames()
// 一个属性是不是实例自身的属性

### 一些要注意的其他问题
Q1. 如果构造函数和构造函数原型对象上存在相同名称的属性,咋办呢
A: 如例子中，原型对象Cat上虽然有一个名叫name的属性，但是实例对象mycat自己有自己内部的name，mycat.name的值就是new时自己的值。
只有mycat在自己这儿找不到某个属性时，去会去原型对象上拿。
这其中其实涉及到的概念就是`原型链查找`：
    
    当访问一个对象的属性 / 方法时，它不仅仅在该对象上查找，
    还会查找该对象的原型，以及该对象的原型的原型，一层一层向上查找，
    直到找到一个名字匹配的属性 / 方法或到达原型链的末尾（null）。

## ES6之后的封装 class
###**需要特别注意的一点！！类的所有方法都定义在类的prototype属性上面**，
例子：
```js
class Cat {
    constructor() {
    }

    toString() {
    }

    toValue() {
    }
}

// 等同于
function Cat() {}
Cat.prototype = {
    constructor() { 
    }
    toString() {
    }
    toValue() {
    }
};
```

### class又被称为constructor构造方法
1. 当使用class的时候，它会默认调用constructor这个函数，
来接收一些参数，并构造出一个新的实例对象(this)并将它返回。
2. 如果你的class没有定义constructor，也会隐式生成一个constructor方法

### 定义时采用方式不同的 一些细节的区分
```js
class Cat {
    // 使用=来定义一个属性和方法，效果与第二点相同，会被定义到实例上
    
    cleanTheBody = function () {}
    
    // 直接定义一个方法，会被添加到原型对象prototype上

    hideTheShit () {}
}

```
其实不需要特意的去记住它，你只需要知道：
**在类的所有方法,都定义在类的prototype属性上面**
cleanTheBody你可以理解为它和color一样只是一个普通的变量，
只不过这个变量是个函数，所以它并不算是定义在类上的函数，
因此不会存在于原型对象上。

### 类class 不存在提升机制
```js

var a = new A()
function A () {}
console.log(a)

var b = new B()
class B {}
console.log(b)

// 输出：
// A {}
// Uncaught ReferenceError: Cannot access 'B' before initialization
```

### class内的箭头函数
**当成普通的class内部的 = 赋值操作的属性即可**
构造函数中如果使用了箭头函数的话，**this指向的就是这个实例对象**

### 属性是否覆盖问题
1, constructor中定义的相同名称的属性和方法会**覆盖**在class里定义的。
即：
```js
class A {
    constructor() {
        this.name = '111';
    }
    name = '123'
    getName = function() {
      return this.name
    }
}
A.prototype.name = '222'
let a = new A()

a.getName() // 得到的是 111
```
2, 原型对象中相同名称的属性和方法,还是以constructor中的为准

### 总结
(一) class的基本概念：
1）当你使用class的时候，它会默认调用constructor这个函数，来接收一些参数，并构造出一个新的实例对象(this)并将它返回。

2）如果你的class没有定义constructor，也会隐式生成一个constructor方法
(二) class中几种定义属性的区别：

1）在constructor中var一个变量，它只存在于constructor这个构造函数中

2）在constructor中使用this定义的属性和方法会被定义到实例上

3）在class中使用=来定义一个属性和方法，效果与第二点相同，会被定义到实例上

4）在class中直接定义一个方法，会被添加到原型对象prototype上

5）在class中使用了static修饰符定义的属性和方法被认为是静态的，被添加到类本身，不会添加到实例上

(三) other:

1）class本质虽然是个函数，但是并不会像函数一样提升至作用域最顶层，

2）如遇class中箭头函数等题目请参照构造函数来处理使用class生成的实例对象，也会有沿着原型链查找的功能
