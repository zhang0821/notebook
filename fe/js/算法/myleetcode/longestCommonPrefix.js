/**
 * 最长公共前缀
 * @param {string[]} strs
 * @return {string}
 *
 编写一个函数来查找字符串数组中的最长公共前缀。

 如果不存在公共前缀，返回空字符串 ""。

 示例 1:

 输入: ["flower","flow","flight"]
 输出: "fl"
 示例 2:

 输入: ["dog","racecar","car"]
 输出: ""
 解释: 输入不存在公共前缀。
 说明:

 所有输入只包含小写字母 a-z 。

*/
var longestCommonPrefix = function(strs) {
    if (!strs.length) {
        return "";
    }
    let shortest = strs[0];
    // 找出最短的那个字符串
    for (let str of strs) {
        if (str.length < shortest.length) {
            shortest = str;
        }
    }
    let longestCommonPrefix = [];
    for(let i = 0; i < shortest.length; i++) {
        const curFlag = shortest.slice(i, i+1);
        let baseStr = curFlag;
        for (let j = 0 ;  j< strs.length; j++) {
            const cur = strs[j].slice(i, i+1);
            if (baseStr !== cur){
                baseStr = cur;
                break;
            }
        }
        if (curFlag === baseStr) {
            longestCommonPrefix.push(curFlag);
        }
        else {
            break;
        }
    }
    console.log(longestCommonPrefix.join(''));
    return longestCommonPrefix.join('');
};

longestCommonPrefix(["flower","flow",""]);