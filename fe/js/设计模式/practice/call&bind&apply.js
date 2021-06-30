/**
 * 【call bind apply】改变函数执行时的上下文，再具体一点就是改变函数运行时的this指向
 */

// 一个类
function Test(name) {
    this.name = name;
}

Test.prototype = {
    printName: function (a, b) {
        console.log('printName:', this.name, a, b)
    }
}
let testObj = new Test('init name');
testObj.printName();


/**
 * 区别
 */
let objCall = {
    name: 'Call obj'
}
// 传参是以列表的形式
testObj.printName.call(objCall, 1, 2);

let objApply = {
    name: 'apply obj'
}
// 传参是以数组的形式
testObj.printName.apply(objApply, [1,2,3]);

// bind方法是事先把fn的this改变 不会马上执行
// bind是返回改变了上下文后的一个函数
let objBind = {
    name: 'Bind obj'
}
let bindPrint = testObj.printName.bind(objBind);
bindPrint(1,2);

/**
 * 应用
 */

// 【1】将伪数组转化为数组（含有length属性的对象，dom节点, 函数的参数arguments）

function getArgs() {
    console.log(arguments);
    return Array.prototype.slice.call(arguments);
}

console.log('应用 getArgs', getArgs(1,2,3,4,5,6))
console.log('应用 getArgs', getArgs([1,2,3,4,5,6]))
let obj4 = {
    0: 1,
    1: 'thomas',
    2: 13,
    length: 3 // 一定要有length属性
};
console.log('应用 getArgs', getArgs(obj4), 'arr原生方法得到的结果：', Array.prototype.slice.call(obj4));
// 【2】 数组拼接
const arr1 =[1, 2]
const arr2 =[1, 2]
console.log('方法1拼接数组', arr1.concat(arr2), arr1)
console.log('方法2拼接数组', Array.prototype.push.apply(arr1, arr2), arr1)

// 【3】类型判断
let num1 = 1;
let string1 = '';
let arr = [];
let obj1 = {};
let fn1 = () => {};
console.log('类型判断 num1', Object.prototype.toString.call(num1))
console.log('类型判断 string1', Object.prototype.toString.call(string1))
console.log('类型判断 arr', Object.prototype.toString.call(arr))
console.log('类型判断 obj1', Object.prototype.toString.call(obj1))
console.log('类型判断 fn1', Object.prototype.toString.call(fn1))

// 【4】继承问题
function Parent(name) {
    this.name = name;
    this.showName = function() {
        console.log('son print name', this.name)
    }
}
function Son(name) {
    Parent.call(this, name)
}
let son = new Son('son');
son.showName()

