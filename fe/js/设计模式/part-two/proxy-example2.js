/*
 * @Descripttion: 代理模式--- 实现图片预加载
 * @Author: zhangli45<zhangli45@baidu.com>
 */

// 不使用代理的一个图片预加载

var myImage = (function () {
    const imageNode = document.createElement('img');
    document.body.appendChild(imageNode);

    let img = new Image;
    img.onload = () => {
        imageNode.src = img.src;
    }
    return {
        setSrc : src => {
            imageNode.src = '本地的loading.gif占位图片地址';
            img.src = src;
        }
    }
})();
myImage.setSrc('一个远程的图片的真实地址');

// 弊端： 比如以后网速快到不需要考虑预加载，我们要摘除预加载的逻辑时，就不得不动现在定义好的这个图片创建对象

// 引入代理，来完成预加载的逻辑

// 新版本

var newMyImage = (function() {
    const imageNode = document.createElement('img');
    document.body.appendChild(imageNode);

    return function (src) {
        imageNode.src = src;
    }
})()

var proxyImage = (function () {
    let img = new Image;

    img.onload = () => {
        newMyImage(this.src);
    }
    return function (src) {
        newMyImage('本地的loading.gif占位图片地址');
        img.src = src;
    }
})();

proxyImage('一个远程的图片的真实地址');


