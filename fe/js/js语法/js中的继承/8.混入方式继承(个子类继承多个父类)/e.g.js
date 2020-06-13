function Parent (sex) {
    this.sex = sex
}
Parent.prototype.getSex = function () {
    console.log(this.sex)
}
function OtherParent (colors) {
    this.colors = colors
}
OtherParent.prototype.getColors = function () {
    console.log(this.colors)
}
function Child (sex, colors) {
    Parent.call(this, sex)
    OtherParent.call(this, colors) // 新增的父类
    this.name = 'child'
}
Child.prototype = Object.create(Parent.prototype)
Object.assign(Child.prototype, OtherParent.prototype) // 新增的父类原型对象
Child.prototype.constructor = Child

var child1 = new Child('boy', ['white'])
// child1.getSex()
// child1.getColors()
// console.log(child1)

console.log(Child.prototype.__proto__ === Parent.prototype);
// true
console.log(Child.prototype.__proto__ === OtherParent.prototype);
// false
console.log(child1 instanceof Parent);
// true

console.log(child1 instanceof OtherParent);
// false
