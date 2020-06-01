/**
 * @param {string} s
 * @return {number}
 * @see https://leetcode-cn.com/problems/roman-to-integer/
 */
var romanToInt = function(s) {
    //罗马数字包含以下七种字符: I， V， X， L，C，D 和 M。
    const romanIndex = 'I,V,X,L,C,D,M'.split(',');
    const numIndex = [1, 5, 10, 50, 100, 500, 1000];
    const ROMAN_NUM_MAP = {};
    romanIndex.forEach((item, index) => {
        ROMAN_NUM_MAP[item] = numIndex[index];
    });
    //处理输入
    const inputs = s.split('');

    let sum = 0;
    // flag用来保存遍历到的当前数的右边那个数，初始值置为0
    let flag = 0;
    for (let i = inputs.length -1 ;i >=  0; i--) {
        const cur = ROMAN_NUM_MAP[inputs[i]];
        //从右往左开始， 如果现在的数比他右边的数小，则减去cur，否则，加上cur
        if (cur >= flag) {
            sum += ROMAN_NUM_MAP[inputs[i]];
        }else {
            sum -= ROMAN_NUM_MAP[inputs[i]];
        }
        flag = cur;
    }
    console.log(sum);
    return sum;
};
romanToInt('MCMXCIV');