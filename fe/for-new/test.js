// console.log(Object.is({}, {}))
// console.log(+0 === -0);
// console.log(NaN === NaN);
//
// console.log(Object.is(+0, -0));
// console.log(Object.is(NaN, NaN));

// let也存在变量提升
// let x = 'global';
//
// function func1(){
//     console.log(x);
//     let x = 'func';
// }
//
// func1();


// var scope = "global scope";
// function checkscope(){
//     var scope = "local scope";
//     function f(){
//         return scope;
//     }
//     return f;
// }
//
// let f = checkscope()
// console.log(f());


// var name = 'Mike'; //第一次定义name
// function showName() {
//     console.log(name);  //输出 Mike 还是 Jay ？
// }
//
// function changeName() {
//     var name = 'Jay'; //重新定义name
//     showName(); //调用showName()
// }
// changeName();

var per={
    name:"jake",
    age:20,
    getName:function(){
        return this.name
    },
    getAge:function(){
        return this.age
    }
}
per.name = '111';
console.log(per.getName());

function PERSON () {

    let name = 'jake2';

    this.sex = 'man';
    this.getName = function(){
        return this.sex;
    };
}
let per2 = new PERSON();
per2.sex = 'woman'
console.log(per2.getName());
