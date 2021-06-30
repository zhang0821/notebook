/*
 * @Descripttion: promise A+ 规范实现
 * @Author: zhangli45<zhangli45@baidu.com>
 */

/**
 * 规范具体内容
 * @see https://juejin.cn/post/6844903649852784647
 * @see https://mengera88.github.io/2017/05/18/Promise%E5%8E%9F%E7%90%86%E8%A7%A3%E6%9E%90/
 *
 */

/**
 * 微任务：
 *
 * 一个 微任务（microtask）就是一个简短的函数，当创建该函数的函数执行之后，并且 只有当 Javascript 调用栈为空，
 * 而控制权尚未返还给被 user agent 用来驱动脚本执行环境的事件循环之前，该微任务才会被执行。
 *
 * promise就是一个微任务
 * js中可创建的 微任务
 *
 * 1. process.nextTick（ Node 端 ）
 * 2. MutationObserver（ 浏览器端 ）
 * 3. queueMicrotask() @see https://developer.mozilla.org/zh-CN/docs/Web/API/HTML_DOM_API/Microtask_guide
 */

/**
 * 使用一个promise时
 * 
let example = new Promise((resolve, reject) => {
    resolve();
    // reject();
});
 */


/**
 * resolvePromise
 * 未实现then的链式调用的辅助函数
 *
 * @param {*} x 上一个then调用完后返回的结果
 * @param {*} resolve 
 * @param {*} reject 
 */

 const resolvePromise = (promise, x, resolve, reject) => {
    if (promise === x) {
        // 上一个promise的then中返回了自己
        // 需要报错处理
        return reject(new TypeError('Chaining cycle detected for promise #<Promise>'))

    }
    if (x instanceof cusPromise) {
        // 处理上一个then return 了一个promise的情况的
        // 执行 x，调用 then 方法，目的是将其状态变为 fulfilled 或者 rejected
        // x.then(value => resolve(value), reason => reject(reason))
        x.then(resolve, reject)
    }
    else {
        // 普通值的情况
        resolve(x)
    }
};



class cusPromise {

    // 规定: pending可以转化为fulfilled或rejected并且只能转化一次
    state = 'pending';

    // 成功后回调传递出去的最终值
    value = null;
    // 失败后回调传递出去的原因
    reason = null;

    // 存储成功回调函数
    // 设置其为 [] 形式 是为了保证该promise的多次then调用都可以被执行 而不是后面的逻辑覆盖前面的
    onFulfilledCallback = [];
    // 存储失败回调函数
    onRejectedCallback = [];

    /**
     * 首先new Promise时，传入了一个立即执行函数
     * @param {Function} executorFn 一个立即执行函数
     * executorFn接收两个回调：
     * 成功回调resolve
     * 失败回调reject
     */
    constructor(executorFn) {
        // executorFn(this._resolve.bind(this), this._reject.bind(this)); // 如果_resolve没有使用箭头函数 则使用bind来绑定this
        // executorFn(this._resolve, this._reject); // step1

        // 需要对错误进行捕获 出错时提前reject出去
        try {
            executorFn(this._resolve, this._reject);
        } catch (error) {
            this._reject(error);
        }
    }

    _resolve = newValue => {
        // 只有状态是等待，才执行状态修改
        if (this.state = 'pending') {
            this.state = 'fulfilled';
            this.value = newValue;
            // Promises/A+规范明确要求回调需要通过异步方式执行，用以保证一致可靠的执行顺序。
            // 要加入一些处理，保证在resolve执行之前，then方法已经注册完所有的回调。
            queueMicrotask(() => {
                while (this.onFulfilledCallback.length) {
                    this.onFulfilledCallback.shift()(this.value);
                }
            });
        }
    }

    _reject = reason => {
        if (this.state = 'pending') {
            this.state = 'rejected';
            this.reason = reason;
            queueMicrotask(() => {
                // resolve里面将所有成功的回调拿出来执行
                while (this.onRejectedCallback.length) {
                    this.onRejectedCallback.shift()(this.reason);
                }
            });
        }
    }

    // onFulfilled, onRejected 成功/失败 回调函数
    then = (onFulfilled, onRejected) => {
        // promise使用时 then内是可以传空。对于传入空值时 将本该value值向下继续resolve出去即可
        onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : val => val;
        onRejected = typeof onRejected === 'function' ? onRejected : err => {throw err};

        const _p = new cusPromise((resolve, reject) => {
            if (this.state === 'fulfilled') {
                // 需要异步处理 等待 _p被传金完后再执行
                queueMicrotask(() => {
                    try {
                        let x = onFulfilled(this.value);
                        resolvePromise(_p, x, resolve, reject);
                    } catch (error) {
                        reject(error);
                    }
                });
            }
            else if(this.state === 'rejected') {
                queueMicrotask(() => {
                    try {
                        let x = onRejected(this.reason);
                        resolvePromise(_p, x, resolve, reject);
                    } catch (error) {
                        reject(error);
                    }
                });
            }
            else if (this.state === 'pending') {
                // 考虑executorFn内部是一个异步的处理流程
                // 因为不知道后面状态的变化情况，所以将成功回调和失败回调存储起来
                // 等到执行成功/失败函数的时候再传递
                // this.onFulfilledCallback.push(onFulfilled);
                // this.onRejectedCallback.push(onRejected);
                // onFulfilled 、onRejected均使用resolvePromise进行集中处理
                this.onFulfilledCallback.push(() => {
                    queueMicrotask(() => {
                        try {
                            let x = onFulfilled(this.value);
                            resolvePromise(_p, x, resolve, reject);
                        } catch (error) {
                            reject(error);
                        }
                    });
                })

                this.onRejectedCallback.push(() => {
                    queueMicrotask(() => {
                        try {
                            let x = onRejected(this.reason);
                            resolvePromise(_p, x, resolve, reject);
                        } catch (error) {
                            reject(error)
                        }
                    });
                });

            }
        });

        return _p;
    }
    catch = onRejected => {
        return this.then(undefined,onRejected)
    }
    // 对外暴露的api
    static resolve(param) {
        if (param instanceof cusPromise) {
            return param;
        }
        // 否则 转化成常规的
        return new cusPromise(resolve => {
            resolve(param);
        })
    }

    static reject(err) {
        return new cusPromise((resolve,reject) => {
            reject(err);
        })
    }
    // promise.all的实现
    // 返回每一个promise的处理结果
    static all(promiseArr) {
        return new cusPromise((resovle, reject) => {
            let results = [];
            let completedCnt = 0;
            for (let i = 0; i < promiseArr.length; i++) {
                promiseArr[i]
                .then(res => {
                    results[i] = res;
                    completedCnt++;
                    if (completedCnt === promiseArr.length){
                        // 完成了所有的promise resolve出所有结果
                        resovle(results);
                    }
                })
                .catch(err => {
                    // 某一个promise进入catch 则整个运行结束
                    reject(err);
                })
            }
        });
    }

    // promise.race的实现
    // 返回最先完成promise事件的结果
    static race(promiseArr) {
        return new cusPromise((resovle, reject) => {
            promiseArr.forEach(apromise => {
                apromise.then(res => {
                    // 第一个进入then的结果 resolve出去即可
                    resovle(res);
                }).catch(err => {
                    reject(err)
                })
            });
        });
    }
}

module.exports = cusPromise;