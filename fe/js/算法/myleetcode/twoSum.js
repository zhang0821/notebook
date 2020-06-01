/*
 给定一个整数数组 nums 和一个目标值 target，请你在该数组中找出和为目标值的那 两个 整数，并返回他们的数组下标。

 你可以假设每种输入只会对应一个答案。但是，你不能重复利用这个数组中同样的元素。

 示例:

 给定 nums = [2, 7, 11, 15], target = 9

 因为 nums[0] + nums[1] = 2 + 7 = 9
 所以返回 [0, 1]

 ([3,3], 6) => [0,1]
 来源：力扣（LeetCode）
 链接：https://leetcode-cn.com/problems/two-sum
 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
*/
var twoSum = function(nums, target) {
    //从小到大排序
    //注意 这里数组赋值是引用的方式
    const arr = [...nums];
    arr.sort((x, y) => x - y);
    // if (arr.length < 2
    //     || (arr[0] > target)
    //     || (arr[0]+arr[1] >target)
    //     || (target == undefined)
    // ) {
    //     console.log([]);
    //     return [];
    // }
    let i = 0;
    let j = arr.length - 1;
    let result = [];
    while (i < (arr.length - 1) && (j > i)) {
        if (arr[i] + arr [j] == target) {
            if (arr[i] === arr [j]) {
                const index_i = nums.indexOf(arr[i]);
                result.push(index_i);
                nums.splice(index_i, 1);
                result.push(nums.indexOf(arr[j])+1);
            }else {
                result = [nums.indexOf(arr[i]), nums.indexOf(arr[j])];
            }
            break;
        } else if (arr[i] + arr [j] > target) {
            j--;
        } else {
            i++;
        }
    }
    console.log(result.sort((x, y) => x - y));
    return result.sort((x, y) => x - y);
};
twoSum([-1,-2,-3,-4,-5],-8);
