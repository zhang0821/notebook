/** 单例模式
 * 用途：eg：点击登陆出现一个弹窗，整个工程全局只会创建一次登陆弹窗，且为唯一的
 * 
*/

/**
 * 惰性单例模式
 * 调用时才创建 而不是页面加载时就创建
 */
// 1. 通用的单例模式
var getSingle = function (fn) {
    var instance;
    return instance || (instance = fn.apply(this, arguments));
    
};
// 2. 使用它--创建一个ifram标签
var creteIframe = getSingle(function() {
    var iframe = document.createElement('iframe');
    document.body.appendChild(iframe);
    return iframe;
})
/**
 * 不透明的单例模式
 */
let singleton = function(name) {
    this.name = name;
}
singleton.getInstance = (function() {
    let instance = null;
    return function(name) {
        if (!instance) {
            instance = new singleton(name);
        }
        return instance;
    }
})();

/**
 * 用代理实现单例模式
 */
// 1. 首先创建一个普通的类
var Normal = function (name) {
    this.name = name;
    this.init();
};
Normal.prototype.init = function() {
    console.log('这里运行了一些初始化的操作');
}
// 2,引入一个代理类
var ProxySingleNormal = (function() {
    var instance;
    return function(name) {
        if (!instance) {
            instance = new Normal(name);
        }
        return instance;
    }
})();

