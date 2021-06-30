/*
 * @Descripttion: es6的类class
 * @Author: zhangli45<zhangli45@baidu.com>
 */
class TEST {
    // 内部变量 can only be read or written within the class body.
    static innerA = 1;
    static innerB = 2;
    static inner = 'inner static';
    constructor(option) {
        this.outterA = option.a || 11;
        this.outterB = option.b || 22;
    }

    // Static methods are called without instantiating their class and cannot be called through a class 2.instance
    static outterFuncA(a) {
        this.innerFuncB();
        console.log('innerFuncA', TEST.innerA + a);
    }

    // 代表 private 的成员函数
    innerFuncB() {
        console.log('innerFuncB run ');
        return TEST.innerB;
    }

    cleanTheBody = function () {
        console.log('我会用唾液清洁身体')
    };

    hideTheShit () {
        console.log('我在臭臭完之后会把它藏起来')
    }

    normalFunc() {
        console.log(this.outterB + TEST.innerFuncB());
    }
}

let test = new TEST({a: 21});

console.log(TEST.innerFuncB('嘿嘿嘿'));
