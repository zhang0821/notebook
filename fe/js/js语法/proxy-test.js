// 为对象绑定 before、after属性 是不是也满足绝大多数场景下对proxy的使用目的
function send() {
    console.log('send do');
};

send.prototype.before = () => {
    console.log('send before');
};

send();

// 纯proxy特性测试

let a = [],
timer = null;
inter = 2;
numMax = 1;
function defProxy() {
    a = new Proxy(a, {
        set(target, p, value, receiver) {
            // console.log(target, p, value, receiver);
            console.log(value);

            if (target.length === receiver.length && +p === 0) {
                timer = setInterval(() => {
                    console.log('timer interlval', inter);
                }, inter*1000);
                console.log('从空的时候第一次push数据进来');
            }

            if (target.length === receiver.length && p === 'length' && +value === 0) {
                console.log('清空了数组');
                if (timer) {
                    clearInterval(timer);
                    timer = null;
                }
            }
            console.log('p , +value', p , +value);

            if (p === 'length' && +value >= numMax) {
                console.log('> max', numMax);
                doMax();
            }
            return Reflect.set(target, p, value, receiver);
        }
    });
}

defProxy();
function doMax () {
    a.splice(0);
    a = [];
    defProxy();
}
a.push({
    name: 'a-obj'
});
numMax = 2;
inter = 5;
a.push(123);
// a.pop();
// a.pop();
// setTimeout(() => {
//     a.splice(0);
//
//     inter = 7;
//     a.push(111);
// }, 20000);



// // logger 测试demo
// let a = [];
// let b = [];
//
// out_max = 'a5';
// out_max_b = 'b5';
// function test() {
//
//     let testobj_a = {
//         max: out_max,
//         timer: null
//     };
//     let testobj_b = {
//         max: out_max_b,
//         timer: null
//     };
//     function setFun(testobj) {
//         return {
//             set(obj, prop, value, target) {
//
//                 console.log('set操作最内部1：', 'obj', obj, ',obj lenfth', obj.length, ',prop', prop,',typeof prop', typeof prop, ',value', value, ',typeof value', typeof value);
//
//                 if (obj.length === 0 && typeof value === 'object') {
//                     console.log('第一个进来 去帮定时器');
//
//                     if (!testobj.timer) {
//                         testobj.timer = setInterval(() => {
//                             console.log('obj.max', testobj.max);
//                         }, 5000)
//                         console.log('设定了定时器', testobj.timer);
//
//                     }
//                     // setTimerCb();
//                 }
//                 obj[prop] = value;
//
//                 console.log('set操作最内部2：', 'obj', obj, ',obj lenfth', obj.length, ',prop', prop,',typeof prop', typeof prop, ',value', value, ',typeof value', typeof value);
//
//                 if (obj.length === 0) {
//                     console.log('最后一个出去 ');
//
//                     if (testobj.timer){
//                         console.log('去解除定时器', testobj.timer);
//                         clearInterval(testobj.timer);
//                         testobj.timer = null;
//                     }
//
//                 }
//
//                 return true;
//             }
//         }
//     }
//     a = new Proxy(a, setFun(testobj_a));
//     console.log( '!!!!!',typeof a, a.toString());
//     b = new Proxy(b, setFun(testobj_b));
// }
// test();
// a.push({0: 'test1'});
// b.push({0: 'test1_b'});
//
// console.log('------------------');
// a.push({0: 'test2'});
// b.push({0: 'test2_b'});
//
// console.log('------------------');
//
// setTimeout(() => {
//     console.log('~~splice 0 ', a.splice(0));
//     console.log('~~splice 0 ', b.splice(0));
//     out_max = 'a4';
//     out_max_b = 'b40';
//     test();
//
// }, 10*1000);
// console.log('-------test do more-----------');
//
//
// a = [];
// out_max = 4;
// out_max_b = 40;
// test();
// a.push({0: 'test3'});
// console.log('------------------');
//
//
// setTimeout(() => {
//     console.log('~~splice 0===1 ', a.splice(0));
//
// }, 20*1000);
//
// console.log('-------test do more-----------');
//
//
// a = [];
// out_max = 3;
// out_max_b = 30;
//
// test();
//
// a.push({0: 'test4'});
// console.log('------------------');
//
// a.push({0: 'test5'});
// console.log('------------------');
// setTimeout(() => {
//     console.log('~~splice 1 ', a.splice(0, 2));
// }, 10*1000);
// console.log('------------------');
//
// setTimeout(() => {
//     console.log('~~splice 2', a.splice(0));
//
// }, 5*1000);
