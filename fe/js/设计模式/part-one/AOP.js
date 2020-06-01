// 面向切面编程
// 添加职责--装饰者模式
Function.prototype.before = function(beforeFn) {
    this.a = 'beforea';
    let _self = this; //保存原函数的引用
    return function () { //返回的代理函数，包含了原函数和新函数
        beforeFn.apply(this, arguments); //执行新函数 修正this,传递最初的this到下一层
        // beforeFn(arguments); //执行新函数，修正this
        return _self.apply(this, arguments); //执行原函数
    };
}

Function.prototype.after = function(afterFn) {
    this.a = 'aftera';
    let _self = this;
    return function () {
        let ret = _self.apply(this, arguments); //
        afterFn.apply(this, arguments); //执行新函数 ，传递好this的链条
        // afterFn(arguments)
        return ret; //执行原函数
    };
}

let func = function() {
    this.a = 'funcChangeA';
    console.log(2);
    return 'x';
}
let a = 'global';
let b = {
    a:12,
    func : func.before(function() {
        console.log(1, this.a)
    }).after(function() {
        console.log(3, this.a)
    })
}


console.log(b.func(), b.a)