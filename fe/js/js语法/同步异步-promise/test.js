// console.log('start')
// setTimeout(() => {
//     console.log('time out')
// }, 0);
// new Promise((resolve, reject) => {
//     console.log('new promise');
//     resolve('1');
// }).then(a => {
//     if (a) {
//         console.log(a);
//         resolve();
//     }
//     else {
//         reject();
//     }
// }).then(b => {
//     if (b) {
//         console.log(b);
//     }
//     else {
//         reject();
//     }
// }).catch(() => console.log('3'));
// let timer = setInterval(() => console.log('interval'), 1000);
// clearInterval(timer);
//
//


// console.log(Array.isArray([]))
// console.log({}.constructor)
// console.log(typeof "")
// console.log(typeof true)
// console.log(typeof undefined)
// console.log(typeof [])


// console.log(['1', '2', '3'].map(parseInt))
function Test(color) {
    var name = 123;
    function showOnly() {
        console.log('show name color', name + '+' + this.color)
    }
    this.color = color;
}
Test.prototype.showColor = function () {
    console.log('showColor', this.color)
}
Test.showName = function () {
    console.log('showname', Test.name)
}
Object.prototype.showName = function () {
    console.log('最顶层对象的属性')
}
let test = new Test('black');
test.showColor()
test.showName()

console.log(Object.keys(test), Object.keys(Test))
