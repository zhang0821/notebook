// 订阅-发布 模式 ————时间上的解偶、对象间的解偶
// 关于常规 订阅-发布
// 关于 是否一定要先订阅？？ 参看qq离线消息实现： 可以把没来得及订阅前的消息暂存起来，订阅后再 发布一次
// 全局事件 命名冲突如何解决？
    // 使用命名空间 eg: 调用时使用 GlobalEvent.create('namespace1').listen；
/**
 * 主要思路：
 * 中控部分需要包含2大主体：
 * 1.订阅者队列
 * 2.各类处理事件：事件订阅，并把订阅者的回调处理函数放入队列、事件发布、事件删除
*/

let event = {
    clientList: {},
    // fn: 要触发执行的回调
    // 此处如果使用箭头函数 this的使用会引起混乱 （貌似 node 环境和 浏览器环境 表现不一致）
    listen: function (key, fn) {
        !this.clientList[key] && (this.clientList[key] = []);
        this.clientList[key].push(fn); //一个订阅者也可能会添加多个回调事件
    },
    trigger: function() {
        // arguments 是在trigger被执行的时候，主动被传入的参数
        const key = Array.prototype.shift.call(arguments); //获取订阅者的key
        const fns = this.clientList[key];

        if (!fns || fns.length === 0) {
            return false;
        }

        // 执行绑定的回调函数
        for (let fn of fns) {
            fn.apply(this, arguments);
        }
    }
}

// 一个工具函数---给所有对象都动态安装 订阅-发布 模式

var installEvent = function(obj) {
    for (let item in event) {
        obj[item] = event[item];
    }
}

var testEvt = {};

installEvent(testEvt);

testEvt.listen('listenEvent1', arg => {
    console.log('接收到订阅返回', arg + 'a 的订阅');
})

testEvt.listen('listenEvent1', arg => {
    console.log('接收到订阅返回', arg + 'b 的订阅');
})

testEvt.trigger('listenEvent1', '1111');

// 添加一个 取消订阅 事件
event.remove = function (key, fn) {
    if (!this.clientList[key]) {
        // 本来就没有订阅过事件
        return;
    }
    if (!fn) {
        // 没有传指定要取消订阅的事件 就全部取消
        this.clientList[key] = [];
    } else {
        var fns = this.clientList[key];
        // 删除这个指定的 fn 事件
        // 反向遍历列表 然后删除指定时间
        for (var i = fns.length - 1; i >= 0; i--) {
            if (fns[i] === fn) {
                fns.splice(i, 1);
            }
        }
    }
}

// 全局的 订阅-发布 对象
// 定义的event作为一个全局的对象
// event 此时类似一个中介
// 订阅 & 发布 的操作 均通过 中介event来完成

var GloabalEvent = (function () {
    var clientList = {};
    // fn: 要触发执行的回调
    // 此处如果使用箭头函数 this的使用会引起混乱 （貌似 node 环境和 浏览器环境 表现不一致）
    var listen = function (key, fn) {
        !this.clientList[key] && (this.clientList[key] = []);
        this.clientList[key].push(fn); //一个订阅者也可能会添加多个回调事件
    };
    var trigger = function() {
        // arguments 是在trigger被执行的时候，主动被传入的参数
        const key = Array.prototype.shift.call(arguments); //获取订阅者的key
        const fns = this.clientList[key];

        if (!fns || fns.length === 0) {
            return false;
        }

        // 执行绑定的回调函数
        for (let fn of fns) {
            fn.apply(this, arguments);
        }
    };
    var remove = function (key, fn) {
        if (!this.clientList[key]) {
            // 本来就没有订阅过事件
            return;
        }
        if (!fn) {
            // 没有传指定要取消订阅的事件 就全部取消
            this.clientList[key] = [];
        } else {
            var fns = this.clientList[key];
            // 删除这个指定的 fn 事件
            // 反向遍历列表 然后删除指定时间
            for (var i = fns.length - 1; i >= 0; i--) {
                if (fns[i] === fn) {
                    fns.splice(i, 1);
                }
            }
        }
    };
    return {
        listen,
        trigger,
        remove
    }
})();

GloabalEvent.listen('subs', function(res) {
    console.log('订阅消息的返回是', res);
})
GloabalEvent.trigger('subs', '这是触发返回的数据')

