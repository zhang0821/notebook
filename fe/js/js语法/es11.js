/**
 * globalThis 全局对象
 *
 * 浏览器中可用的全局对象是变量 window
 * Node.js 中是一个叫做 global 的对象
 *
 * 不同环境中都使用统一的全局对象 ：globalThis
 */
// 浏览器
console.log(window == globalThis);

// node.js
console.log(global == globalThis);

/**
 * MatchAll 匹配所有项
 *
 * matchAll 返回更多的信息，包括找到匹配项的索引。
 */

const regex = /\b(apple)+\b/;
const fruits = "pear, apple, banana, apple, orange, apple";

// 普通match返回见到的内容
for (const match of fruits.match(regex)) {
    console.log(match);
}

//matchAll返回所有匹配的信息，包括index等等
for (const match of fruits.matchAll(regex)) {
    console.log(match);
}
/**
 * 顶级 Await
 *
 */

// 无需把代码包裹在一个 async 函数中了，直接使用await即可

/**
 * Promise.allSettled
 * @type {Promise<string>}
 */
// 某个请求失败后，其他请求的结果能够正常返回
// example
promise_1 = Promise.resolve('hello')
promise_2 = new Promise((resolve, reject) => setTimeout(reject, 200, 'problem'))

Promise.allSettled([promise_1, promise_2])
    .then(([promise_1_result, promise_2_result]) => {
        console.log(promise_1_result); // 输出：{status: 'fulfilled', value: 'hello'}
        console.log(promise_2_result); // 输出：{status: 'rejected', reason: 'problem'}
    });
