/**
 * delete操作删除数据相关
 *
 * delete 操作删除了是一个属性
 */

let TEST_ARR = [1,2,3];
console.log('TEST_ARR', TEST_ARR, 'len:', TEST_ARR.length);
delete TEST_ARR[1];
console.log('TEST_ARR', TEST_ARR, 'len:', TEST_ARR.length);

// 如果你想让一个数组元素继续存在但是其值是 undefined，那么可以使用将 undefined 赋值给这个元素而不是使用 delete

TEST_ARR[1] = undefined;
console.log('TEST_ARR', TEST_ARR, 'len:', TEST_ARR.length);


const collectionTypes = new Set<Function>([Set, Map, WeakMap, WeakSet]);
console.log('collectionTypes', collectionTypes);
console.log('TEST_ARR constructor', TEST_ARR.constructor);

// sort

let sortArr = [11,3,5,1,9,10];
let sortedArr = sortArr.sort();
console.log('sortArr', sortArr, 'sortedArr', sortedArr);

