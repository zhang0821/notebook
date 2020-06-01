// 多态
const utils = require ('../../utils');

let makeSound = animal => {
    if (animal instanceof DUCK) {
        utils.log('makeSound', '传入的对象是继承DUCK的原型链');
    }
    else if (animal instanceof DOG) {
        utils.log('makeSound', '传入的对象是继承DUCK的原型链');
    }
}

let DUCK = function() {};
let DOG = function() {};

makeSound(new DUCK());
