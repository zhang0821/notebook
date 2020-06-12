function Parent () {
    this.name = 'parent'
}
function Child () {
    this.sex = 'boy'
}
Child.prototype = new Parent()
var child1 = new Child()

console.log(child1 instanceof Child)
// true
// 查找顺序
// child1 -> child1.__proto__ -> Child.prototype

console.log(child1 instanceof Parent)
// true
// 查找顺序
// child1 -> child1.__proto__ -> Child.prototype -> Child.prototype.__proto__ -> Parent.prototype

console.log(child1 instanceof Object)
// true
// 查找顺序
