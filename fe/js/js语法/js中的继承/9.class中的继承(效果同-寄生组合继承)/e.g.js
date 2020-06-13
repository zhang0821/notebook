class Parent {
    constructor (name) {
        this.name = name
    }
    getName () {
        console.log(this.name)
    }
}
class Child extends Parent {
    constructor (name) {
        super(name)
        this.sex = 'boy'
    }
}
var child1 = new Child('child1')
console.log(child1)
child1.getName()

console.log(child1 instanceof Child)
console.log(child1 instanceof Parent)
