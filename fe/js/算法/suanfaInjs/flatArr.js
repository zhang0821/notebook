let ary = [1, [2, [3, [4, 5]]], 6];
let str = JSON.stringify(ary);

/**
 * 原生js的api：flat
 *
 * var newArray = arr.flat([depth])
 * depth默认是1
 * 按照一个可指定的深度递归遍历数组，并将所有元素与遍历到的子数组中的元素合并为一个新数组返回
 */
console.log('扁平化后的数组：', ary.flat(Infinity));
