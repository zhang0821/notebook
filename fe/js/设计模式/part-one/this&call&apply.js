/** 
 * apply
 * 接受两个参数
 * 参数1. 指定函数体内this对象的指向
 * 参数2. 以数组 || 类数组的形式[,,,],传入参数给被调用的函数
*/
const data = 'goableData';
const funcApply = {
    data: 'ApplyData',
    returnData: function() {
        return this.data;
    }
}
console.log(funcApply.returnData());
let clonefuncApply = funcApply.returnData;
console.log(clonefuncApply());

// const applyShow = () => {
//     console.log('applyShow', arguments);
// }
function applyShow() {
    console.log('applyShow', arguments);
}
applyShow(1,2,3);

let applyBindShow = applyShow.bind(this, 4, 5);

Function.prototype.bind = function() {
    if (Function.prototype.bind) {
        console.log('zhichi');
        return Function.prototype.bind
    }
    let self = this;
    // 取出第一个参数
    let contex = [].shift.call(arguments);
    // 转为真正的数组
    // bind时传入的参数
    let args = [].slice.call(arguments);
    return function() {
        // 最终函数调用时的，所有参数 = bind时传入的参数 + 函数真正调用时传入的参数
        let finalArgs = [].concat.call(args, [].slice.call(arguments));
        return self.apply(contex, finalArgs);
    }
}
applyBindShow(1,2,3);