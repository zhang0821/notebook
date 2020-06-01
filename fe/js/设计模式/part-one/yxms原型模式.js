/**
 * 原型模式----通过克隆创建对象
 * 是一种设计模式，也是一种编程泛型
 * 1.便捷创建某个类型的对象
 * 2.利用Object.create()方法
*/

let Planet = function () {
    this.blood = 100;
    this.level = 90;
}

// 此处 Planet 并不是一个类 而是一个函数构造器
let planet = new Planet();
planet.blood = {
    test1: 100,
    test2: 200
};
planet.level = 100;

Object.create = Object.create || function(obj) {
    let F = function(){};
    F.prototype = obj;
    return new F();
}

let clonePlanet = Object.create(planet);
console.log('clonePlanet', clonePlanet.blood);
console.log('clonePlanet', clonePlanet.level);

// 基于原型链的委托机制就是原型继承的本质
/** 
 * 1.除了跟对象Object.prototype以外,任何对象都有一个原型
 * 2.Object.create(null)可以创建一个没有原型的对象
*/
