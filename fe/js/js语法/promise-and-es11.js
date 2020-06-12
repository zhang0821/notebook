// @see https://juejin.im/post/5ec5eed6e51d45788d1caeec


// Promise.allSettled
// 某个请求失败后，其他请求的结果能够正常返回
// example
promise_1 = Promise.resolve('hello')
promise_2 = new Promise((resolve, reject) => setTimeout(reject, 200, 'problem'))

Promise.allSettled([promise_1, promise_2])
    .then(([promise_1_result, promise_2_result]) => {
        console.log(promise_1_result); // 输出：{status: 'fulfilled', value: 'hello'}
        console.log(promise_2_result); // 输出：{status: 'rejected', reason: 'problem'}
    });
