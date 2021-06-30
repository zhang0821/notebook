const genFuncList = len => {
    let list = [];
    for (let i =0; i<len;i++) {
        list.push((() => {
            new Promise(resolve => {
                console.log('creat promise index', i);
                setTimeout(() => {
                    console.log('run promise inner index', i);
                    resolve();
                }, (i + 1) * 1000);
            });
        })())
    }
    return list;
}
/**
 * todo remind
 * promise 在创建的时候 其实就已经执行了 只是返回的结果内部的逻辑导致返回结果的延迟 会有差别
 */
let list = genFuncList(10);
console.log('list', list);
const runPromiseList = async block => {
    let result = [];
    while(list.length) {
        console.log('while list', list.length);
        let runlist = list.splice(0, block);
        await Promise.all(runlist).then(res => {
            console.log('all then res', res);
            result.push(...res)
        });
    }
    return result;
}
// console.log('res', runPromiseList(3));
