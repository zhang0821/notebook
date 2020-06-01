
// () => {} 无this
const thisTestObj = {
    name: 'a',
    getName() {
        console.log('name:', this.name);
    },
    getNameFunc: function () {
        console.log('name:', this.name);
    },
    // error
    getNameArrow: () => {
        console.log('name:', this.name);
    },
    child: {
        son: {
            name: 'sonName'
        }
    }
};

// const类型的对象 不能直接赋值修改整个 error
// thisTestObj = {}
// 可以修改属性值

thisTestObj.name = 'b';

thisTestObj.getName();
thisTestObj.getNameArrow();
thisTestObj.getNameFunc();

// symbol作为key
let id = Symbol("uniqueId");
console.log('log id:', id.toString(), 'id description', id.description);

let id1 = Symbol('uniqueId');

console.log('使用Symbol(key) 创建的symbol类型值 绝对不相同 id === id1 ?', id === id1);
console.log('而使用Symbol.for(key) 创建的symbol类型值 将是全局的，key相同时两个创建的对象也相同， Symbol.for("key") === Symbol.for("key") ?', Symbol.for("key") === Symbol.for("key"));



thisTestObj[id] = 'uniqueId-id';

// symbol类型的key 在迭代器工作时会被忽略
for (let key in thisTestObj) {
    console.log('key:', key);
}

//  Object.assign操作中，可以识别到symbol类型的数据
let thisTestObj1 = Object.assign({}, thisTestObj);
console.log('thisTestObj1，', thisTestObj1);


// 对象key遍历后，输出顺序： number类型的会按照大小的排序来顺序输出
let sortObjKeyTest = {
    '100' : '100',
    '50' : '50',
    1: '1',
    23: '23'
};
console.log('对于数字类的最为key，key的输出顺序将按照数字的大小来输出：', Object.keys(sortObjKeyTest));

let sortObjNormalTest = {
    'name' : '100',
    '50' : '50',
    1: '1',
    "age": '23'
};
console.log('对于数字类的最为key，key的输出顺序将按照创建的时间来顺序输出，而内部只要时数字的部分，这部分还是会按照数字大小排序输出：', Object.keys(sortObjNormalTest));

// console.log('测试 ?. 运算符用法', thisTestObj?.child?.son?.name);


// 对象的垃圾回收机制
// https://javascript.info/garbage-collection
