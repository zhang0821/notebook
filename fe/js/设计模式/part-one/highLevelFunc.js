// 1. curring
const curring = function (fn) {
    let args = [];
    return function () {
        if (arguments.length === 0) {
            return fn.apply(this, args);
        }
        else {
            [].push.apply(args, arguments);
            return arguments.callee;
        }
    }
}
let count = (function() {
    let sum = 0;
    return function() {
        for(let i=0; i < arguments.length; i++) {
            sum += arguments[i];
        }
        return sum;
    }
})();

count = curring(count);
count(1,2,3);
count(2);
console.log(count(3));
console.log(count());

// 2. uncurring
// 把泛化 this 的过程提取出来
Function.prototype.uncurring = function() {
    let self = this;
    return function() {
        let obj = [].shift.call(arguments);
        return self.apply(obj, arguments);
    }
}
// 栗子，数组的一些方法进行uncurring
for (let i=0, fn, arr = ['push', 'shift', 'forEach']; fn = arr[i++];) {
    Array[fn] = Array.prototype[fn].uncurring();
}
let testObj = {
    0: 2,
    length: 1,
    1: 3
};
console.log(testObj);
Array.push(testObj, 4);
console.log(testObj);
Array.push(testObj, 5);
console.log(testObj);

// 3. 节流-throttle
// 函数被频繁调用的场景
// 使用setTimeout来延迟执行函数
const throttle = function(fn, interval) {
    let _self = fn,
        timer,
        firsttime = true;
    return function() {
        let args = arguments,
            _me = this;
        if (firsttime) {
            _self.apply(_me, args);
            return firsttime = false;
        }
        if (timer) {
            return false;
        }
        timer = setTimeout(function() {
            clearTimeout(timer);
            timer = null;
            _self.apply(_me, args);
        }, interval || 500);
    }
};
let onresize = throttle(function() {
    console.log('1s 触发一次');
}, 1000);

// 4. 分时函数 减少一次性操作量过大的压力
let timeChunk = function(arr, fn, count) {
    let obj,
        len = arr.length,
        timer;
    let start = function() {
        for (let i =0; i< Math.min(count || 1, arr.length); i++) {
            let obj = arr.shift();
            fn(obj);
        }
    }
    return function() {
        timer = setInterval(function() {
            if (arr.length === 0) {
                return clearInterval(timer);
            }
            start();
        }, 2000);
    };
};


/** 5. 惰性加载函数
 * 惰性加载表示函数执行的分支仅会发生一次。
 * 有两种实现惰性加载的方式：
 * 1.在函数被调用时再处理函数
 * 2.在声明函数时就指定适当函数。
*/
// 在函数被调用时再处理函数
/**
 * 
 * ，第一种事函数在第一次调用时，对函数本身进行二次处理，该函数会被覆盖为符合分支条件的函数，
 * 这样对原函数的调用就不用再经过执行的分支了，我们可以用下面的方式使用惰性载入重写addEvent()
 */
let addEvent1 = (type, element, fun) => {
    if (element.addEventListener) {
        addEvent1 = (type, element, fun) => {
            element.addEventListener(type, fun, false);
        }
    } else if (element.attachEvent) {
        addEvent1 =  (type, element, fun) => {
            element.attachEvent('on' + type, fun);
        }
    } else {
        addEvent1 = (type, element, fun) => {
            element['on' + type] = fun;
        }
    }
    return addEvent1(type, element, fun);
}

// 第一次调用函数时就不会损失性能了，只在代码加载时会损失一点性能。
let createXHR = ( () => {
    if (typeof XMLHttpRequest != 'undefined'){
        return () => {
            console.log('XMLHttpRequest')
            // ...
        }
    } else if (typeof ActiveXobject != 'undefined') {
        return () => {
            console.log('ActiveXobject')
            // ...
        }
    } else {
        return () => {
            console.log('else')
            // ...
        }
    }
})();