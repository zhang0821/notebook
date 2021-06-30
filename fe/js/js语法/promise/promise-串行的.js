/**
 * 题目：
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    const subFlow = createFlow([() => delay(1000).then(() => log("c"))]);

    createFlow([
        () => log("a"),
        () => log("b"),
        subFlow,
        [() => delay(1000).then(() => log("d")), () => log("e")],
    ]).run(() => {
        console.log("done");
    });
    // 需要按照 a,b,延迟1秒,c,延迟1秒,d,e, done 的顺序打印
 */


// 方法一
function createFlow(effects = []) {
    // 先把参数浅拷贝一份（编写库函数，尽量不要影响用户传入的参数是个原则），再简单的扁平化 flat 一下。
    const sources = effects.slice().flat();

    // run内 顺序读取sources内每个参量，直到读取完毕后停止
    function run(cb){
        while(sources.length) {
            let curSource = sources.shift();
            //
            let next = () => createFlow(sources).run(cb);
            if (typeof curSource === 'function') {
                let res = curSource();
                if (res && res.then) {
                    res.then(next);
                    return;
                }
                // res 可能还是一个promise
                // 通过是否有then判断是否是一个promise
            }
            else if (curSource && curSource.isFlow) {
                curSource.run(next);
                return;
            }
        }
        cb && cb();
    }
    return {
        run,
        isFlow: true,
    }
}
// 方法二 借鉴axios的写法
function createFlow(effects = []) {
    let promise = Promise.resolve();
    return {
        run(cb) {
            if (typeof cb !== 'function') {
                cb = new Function;
            }

            while(effects.length) {
                let effect = effects.shift();
                if (typeof effect === 'function') {
                    promise = promise.then(effect).catch(e => e);
                }
                else if(typeof effect.run === 'function') {
                    promise = promise.then(effect.run).catch(e => e);
                }
                else if(Array.isArray(effect)) {
                    promise = promise.then(createFlow(effect).run).catch(e => e);
                }
            }

            return promise.then(cb);
        }
    }

}
// 法3 reduce

// 法4 遍历promise
function createFlow(effects = []) {
    const sources = effects.slice().flat();
    return {
        async run(cb) {
            for (let source of sources) {
                typeof source === 'function'
                ? await source()
                : await source.run()
            }
            typeof cb === 'function' && cb();
        }
    }
}

const delay = () => new Promise((resolve) => setTimeout(resolve, 5000));
createFlow([
    () => console.log("a"),
    () => console.log("b"),
    createFlow([() => console.log("c")]),
    [() => delay().then(() => console.log("d")), () => console.log("e")],
]).run();




/******* 实现promise的串行执行 简化代码 *******/
const creatNewPromise = (time, id) => {
    return new Promise((resolve => {
        setTimeout(() => {
            console.log('this promise id is', id);
            resolve();
            console.log('this promise id is' + id + 'end');
        }, time * 1000);
    }));
}

let promiseQueue =[
    creatNewPromise(10, 1),
    creatNewPromise(2, 2),
    creatNewPromise(3, 3)
];
/**
 * 方法一：利用reduce
 *
 * 并不能保证是顺序执行的
 */
promiseQueue.reduce((acc, cur) => {
    return acc.then(() => cur());
}, Promise.resolve());

/**
 * 方法二：利用对await的遍历
 */

const makePromiseQueue = async (myPromises = []) => {
    for (let aPromise of myPromises) {
        await aPromise();
    }
};

makePromiseQueue(promiseQueue);

