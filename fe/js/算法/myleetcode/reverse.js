/**
 * @param {number} x
 * @return {number}
 */
var reverse = function(x) {
    let numStr =( x > 0 ? '+' : '') + String(x);

    let numStrArr = numStr.split("");
    numStrArr.shift();
    numStrArr.reverse();
    let newNum = Number(numStrArr.join(''));
    if (x < 0) {
        newNum = 0 - newNum;
    }
    //[-2^31，2^31-1] 溢出该范围 值为0
    if(newNum > 2147483647 || newNum < -62235) {
        console.log(0);
        return 0;
    }
    console.log(newNum);
    return newNum;
};
reverse(1534236469);