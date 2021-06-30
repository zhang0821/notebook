// 链式编程,语义清晰化
// 解决函数的嵌套层数不断增多的横向延展，提高代码可读性
const log = (title, func) => {
    console.log('函数式编程系列----', title);
    console.log('运行结果：', eval(func));
}
const utils = {
    chain(val) {
        this._temp = val;
        return this;
    },
    sub(val) {
        this._temp -= val;
        // 以实现链式结构
        return this;
    },
    sum(val) {
        this._temp += val;
        return this;
    },
    value() {
        const _temp = this._temp;
        this._temp = undefined;// 归位
        return _temp;
    }
}
log('链式函数', utils.chain(1).sum(2).sub(3).sum(3).value());

//*******常见函数式编程模型 */
/*闭包
闭包的创造条件是：
    1.存在内、外两层函数
    2.内层函数对外层函数的局部变量进行了引用
*/
const makeCluster = () => {
    let val = 1;
    return function() {
        return val++;
    }
}
const counter = makeCluster();
log('简单的闭包例子-执行1', counter());
log('简单的闭包例子-执行2', counter());

const cache = (() => {
    const store = {};
    return {
        get(key) {
            return store[key];
        },
        set(key, val) {
            store[key] = val;
        }
    };
})();
log('利用闭包做存储--赋值', cache.set('test', 1));
log('利用闭包做存储--取值', cache.get('test'));

// 高阶函数 map函数
log('高阶函数🌰---map', [1,2,3].map(n => ++n));

// 柯里化
/** 一个加法的例子
*输出结果，可自由组合的参数
console.log(add(1, 2, 3, 4, 5));  // 15
console.log(add(1, 2, 3, 4)(5));  // 15
console.log(add(1)(2)(3)(4)(5));  // 15
 */
/**
 * 应用场景
 * 1.参数复用
 * 2.延迟执行
 */
const curryAdd = x => {
    return y => {
        return x + y;
    }
}

const discount = x => {
    return price => {
        return price * (1 - x);
    }
}
let tenPercentDiscount = discount(0.1);
let twentyPercentDiscount = discount(0.2);
log('柯里化--编写小模块的代码，可以更轻松的重用和配置-eg:500打9折', tenPercentDiscount(500));
log('柯里化--编写小模块的代码，可以更轻松的重用和配置-eg:500打8折', twentyPercentDiscount(500));

// 柯里化 - 实现 reduce
