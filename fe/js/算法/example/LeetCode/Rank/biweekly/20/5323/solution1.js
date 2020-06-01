/**
 * https://leetcode-cn.com/problems/sort-integers-by-the-number-of-1-bits/
 * 
 * 
 * 5323. 根据数字二进制下 1 的数目排序
 * 
 * Easy
 * 
 * 208ms
 * 36.1mb
 */

const sortByBits = arr => {
  arr.sort((a, b) => {
    const x = getBitCount(a);
    const y = getBitCount(b);
    if (x - y == 0) {
      return a - b;
    }
    return x - y
  })
  return arr;
}

function getBitCount(num) {
  let ans = 0;
  const str = num.toString(2);
  for (let i = 0, max = str.length; i < max; i++) {
    if (str[i] === '1') {
      ans++;
    }
  }
  return ans;
}