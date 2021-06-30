/*
 * @Descripttion: js系列问题对应js test
 * @Author: zhangli45<zhangli45@baidu.com>
 */

// todo 1 undefined问题
// let undefined = 'change it'
// console.log('undefined', undefined)
// let a;
// console.log('a', a === void 0)

// todo 2 null
// console.log('typeof null:', typeof null)

// todo 3 搞清楚 typeof 和 instanceof 的区别

/**
 * todo 4 数组扁平化
 */

let arr = [1, [2, 2], [[3, 3, 3], [3, 3, 3]], [[[4]]]];

// 法1： flat
// console.log(arr.flat(1));
// console.log(arr.flat(2));
// console.log(arr.flat(Infinity));

// 法2 reduce递归
// const toFlatArr = arr => {
//     return arr.reduce((pre, cur) => {
//         let  item = Array.isArray(cur) ? toFlatArr(cur) : cur;
//         return pre.concat(item);
//     }, []);
// }
// console.log(toFlatArr(arr))

// 法3 函数递归
// let flatedArr = [];
// const deepFlatArr = array => {
//     for (let index = 0; index < array.length; index++) {
//         let element = array[index];
//         Array.isArray(element) ? deepFlatArr(element) : flatedArr.push(element)
//     }
// }
// deepFlatArr(arr);
// console.log(flatedArr);

// 法4 json.stringfy + 正则
// const regRuleHandle = arr => {
//     let arrStr = JSON.stringify(arr)
//     // 利用正则去掉 '[' 和 ']' 
//     let handledStr = arrStr.replace(/(\[)|(\])/g, '');
//     return handledStr.split(',').map(item => Number(item));
// }
// regRuleHandle(arr)

// 法5 json.stringfy / parse + 正则

// const regRuleHandleM2 = arr => {
//     let arrStr = JSON.stringify(arr)
//     // 利用正则去掉 '[' 和 ']'
//     let handledStr = '[' + arrStr.replace(/\[|\]/g, '') + ']';
//     return JSON.parse(handledStr);
// }
// console.log(regRuleHandleM2(arr))

/**
 * todo 5 数组去重
 *
 * 1. 利用set、map
 * 2. 遍历时 利用include/indexOf 判断是否已存在
 * 3. filter
 */

let repeatArr = arr.flat(Infinity);

//  set
// getSoloArr = arr => {
//     let arrSet = new Set(repeatArr);
//     return Array.from(arrSet);
// }

// map
// getSoloArr = array => {
//     let arrMap = new Map();
//     array.forEach(element => {
//         arrMap.set(element, true)
//     });
//     return Array.from(arrMap.keys());
// }

// filter

// getSoloArr = array => {
//     return array.filter((item, index, arr) => arr.indexOf(item) === index)
// }

// console.log('getSoloArr', getSoloArr(repeatArr))

/**
 * todo 6 类数组转换成数组
 *
 * 1. Array.from
 * 2. 扩展运算符 ...
 * 3. 利用concat
 * 4. 利用slice
 */

// concat
let demoArr = new Set([1, 2, 2, 3])

const likeArrToArr = likeArr => {
    // return [].concat(likeArr);
    // return Array.prototype.concat.apply([], likeArr)
    return Array.prototype.slice.call(likeArr)
}

// console.log('类数组转化为数组', likeArrToArr(demoArr))

/**
 * todo 7 节流
 *
 * 高频时间触发,但n秒内只会执行一次,所以节流会稀释函数的执行频率。
 * 
 * 不管事件触发有多频繁，都会保证在规定时间内一定会真正执行一次
 */

const throttle = (fn, time) => {
    let hasRun = false;
    return function () {
        if(hasRun) {
            return;
        }
        hasRun = true;
        setTimeout(() => {
            fn.apply(this, arguments)
            hasRun = false;
        }, time)
    }
}

/**
 * todo 8 防抖
 * 触发高频时间后n秒内函数只会执行一次,如果n秒内高频时间再次触发,则重新计算时间
 * 
 * 事件频繁触发的时候，会按照最后一次的触发时机 去真正执行一次
 */

const dedounce = (fn, time) => {
    let timer = null;
    return function () {
        timer && clearTimeout(timer);
        timer = setTimeout(() => {
            fn.apply(this, arguments);
        }, time)
    }
}

/**
 * todo 9 实现一个 new
 *
 * new 运算符：创建一个用户定义的对象类型的实例或具有构造函数的内置对象的实例。
 * A = new B
 * 1. 创建一个空的简单js对象：{}
 * 2. 链接该对象到另一个对象上：操作constructor的值
 * 3. 将当前上下文环境设置为step1创建的对象。修改 this 的指向
 * 4. 如果该函数没有返回对象，则返回this
 *
 * 涉及到的其他问题：Object.create()、new Object() 和 {} 的区别
 *
 * new Object === 直接字面量 {} 创建形式：Object的实例，原型指向Object.prototype，继承内置对象Object
 *
 * Object.create： 创建的对象的原型指向传入的对象，Object.create()方法创建一个新对象，使用现有的对象来提供新创建的对象的__proto__。
 */
const newOperatorDetail = (B, ...args) => {
    if (typeof B !== 'function') {
        throw new Error('B 应该为一个对象！')
    }
    // createdObj的__proto__指向构造函数的prototype
    let createdObj = Object.create(B.prototype);
    // 把构造函数的this指向obj，并执行构造函数把结果赋值给result
    let realObj = B.apply(createdObj, args);

    // 构造函数B的执行结果是 引用类型，就把这个引用类型的对象返回给 A
    // 否则如果是值类型 就把createdObj这个空对象返回给A
    const isObject = typeof realObj === 'object' && res !== null;
    const isFunction = typeof realObj === 'function';
    return isObject || isFunction ? realObj : createdObj;
}

/**
 * todo 10 instanceof
 * 使用：a instanceof B
 * instanceof 的作用是：检测 构造函数B的原型prototype属性是否出现在实例a的原型链上
 */

const doInstanceof = (a, B) => {
    let proto = Object.getPrototypeOf(a);
    while(1) {
        if(proto === null) {
            return false;
        }
        if (proto === B.prototype) {
            return true;
        }
        proto = Object.getPrototypeOf(proto);
    }
}