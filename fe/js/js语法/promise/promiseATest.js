/*
 * @Descripttion: promise a+实现测试
 * @Author: zhangli45<zhangli45@baidu.com>
 */

const MyPromise = require('./promise-a+');

const promise = new MyPromise((resolve, reject) => {
    setTimeout(() => {
        console.log('等待1s后resovle出success')
        resolve('success')
    }, 1000)
    // resolve('success')

})
// 这个时候将promise定义一个p1，然后返回的时候返回p1这个promise
const p1 = promise.then(value => {
   return new MyPromise(resolve => {
        setTimeout(() => {
            resolve('p1内继续等待1s后resovle出success')
        }, 1000);
   })
})

// 运行的时候会走reject
p1.then(value => {
  console.log('resolve 2', value)
//   setTimeout(()=>{
//       throw new Error('a async error from resolve 2')
//   }, 1000)
//   throw new Error('a error from resolve 2')
    // return MyPromise.resolve('直接MyPromise.resolve sucecss')
    return MyPromise.reject('直接MyPromise.reject fail')

})
.then()
.then()
.then()
.then()
.then(value => {
    console.log('resolve 4', value)
}, err => {
    console.log('err 4', err.message)
    console.log('err 4', err)
    throw err;
})
.catch(err => {
    console.log('catch111111', JSON.stringify(err))
})