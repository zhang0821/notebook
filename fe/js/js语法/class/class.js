/**
 * es6的类class
 */

class TEST {
    // 内部变量 can only be read or written within the class body.
    // #innerA = 1;
    // #innerB = 2;

    static inner = 'inner static';
    constructor(option) {

        this.outterA = option.a || 11;
        this.outterB = option.b || 22;
    }

    // Static methods are called without instantiating their class and cannot be called through a class 2.instance
    static outterFuncA(a) {
        console.log('innerFuncA', #innerA + a);
    }

    // 代表 private 的成员函数
    // #innerFuncB() {
    //     return #innerB;
    // }

    cleanTheBody = function () {
        console.log('我会用唾液清洁身体')
    };

    hideTheShit () {
        console.log('我在臭臭完之后会把它藏起来')
    }

    normalFunc() {
        console.log(this.outterB + this.#innerFuncB());
    }
}

let test = new TEST({a: 21});

console.log(TEST.inner);
