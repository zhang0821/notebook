/**
 * @param {string} s
 * @return {boolean}
 *
 给定一个只包括 '('，')'，'{'，'}'，'['，']' 的字符串，判断字符串是否有效。

 有效字符串需满足：

 左括号必须用相同类型的右括号闭合。
 左括号必须以正确的顺序闭合。
 注意空字符串可被认为是有效字符串。

 */
var isValid = function(s) {
    if (s === "") {
        return true;
    }

    const pair = {
        ')' : '(',
        '}' : '{',
        ']' : '['
    }
    const arr = s.split('');

    let stack = [];
    let result = true;
    for (let i = 0; i < arr.length; i++) {
        // 左括号放入stack中
        if (!pair[arr[i]]) {
            stack.push(arr[i]);
        }
        // 右括号则去stack中匹配
        else {
            const searchStr = pair[arr[i]];
            const matchIndex =  stack.lastIndexOf(searchStr);
            // 刚开始就不能匹配，或者不能正常成对
            //因为会有pop操作，所以stack内就直接比较找到的是不是stack中最新的即可
            if (!~matchIndex || (matchIndex != stack.length-1)) {
                result = false;
                break;
            }
            else {
                stack.pop();
            }
        }
    }

    //还需要进一步对stack进行处理 处理最后stack内全剩下左括号的case
    if (stack.length > 0) {
        let allLeft = true;
        stack.forEach(item => {
            //是左括号
            if (pair[item]) {
                allLeft = false;
            }
        });
        allLeft && (result = false);
    }
    // if ((stack.length % 2) !== 0 ) {
    //     result = false;
    // }
    console.log(result);
    return result;
};
isValid("(())");