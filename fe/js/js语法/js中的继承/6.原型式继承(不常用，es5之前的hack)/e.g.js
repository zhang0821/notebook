function objcet (obj) {
    function F () {};
    F.prototype = obj;
    F.prototype.constructor = F;
    return new F();
}
var cat = {
    heart: '❤️',
    colors: ['white', 'black']
}

var guaiguai = create(cat)
var huaihuai = create(cat)

console.log(guaiguai)
console.log(huaihuai)

console.log(guaiguai.heart)
console.log(huaihuai.colors)
