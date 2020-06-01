/*
 * @Descripttion: 代理模式--送花例子
 * @Author: zhangli45<zhangli45@baidu.com>
 */


/**
 * 保护代理、虚拟代理
 * 1.在代理者B处 过滤掉一些不满足条件的请求 =》保护代理
 * 2.在代理者B处 完成一些代价比较大的操作（也就是满足条件的情况才执行一些代码）=》虚拟代理
**/

// 保护代理---A 送花给 C ，通过代理者B来完成中转

// 买一束花的实际动作
var Flower = function(name) {
    this.name = name;
};

// 送花者
var A ={
    sendFlower: target => {
        // new 操纵让代理者来做 就是虚拟代理了
        // let flower = new Flower('向日葵');
        // target.recieveFlower(flower);
        target.recieveFlower();
    }
}

// 帮送花的人,在C心情好的时候帮忙送花
var B = {
    recieveFlower: flower => {
        !flower && (flower = new Flower('玫瑰'));
        console.log('B收到了', flower);
        C.listenGoodMood(() => {
            console.log('B监听到C的好心情，帮送花');
            // 送花给C操作，即是执行 C的收花操作
            C.recieveFlower(flower);
        })
    }
}

// 收花的C

var C = {
    recieveFlower: flower => {
        console.log('C收到了花，', flower.name);
    },
    listenGoodMood: async fn => {
        // 比如此处 5s 后, C 心情好了 才执行一个操作
        await setTimeout(() => {
            console.log('C现在心情好');
            fn();
        }, 5000);
    }
}

A.sendFlower(B);