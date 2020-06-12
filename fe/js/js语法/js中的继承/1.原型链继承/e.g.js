function Parent () {
this.name = 'Parent'
this.sex = 'boy'
}
Parent.prototype.getSex = function () {
    console.log(this.sex)
}
function Child () {
    this.name = 'child'
}
Child.prototype = Parent.prototype

var child1 = new Child()
child1.getSex()
console.log(child1)
