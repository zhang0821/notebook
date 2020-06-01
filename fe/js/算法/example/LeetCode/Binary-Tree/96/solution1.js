/**
 * https://leetcode-cn.com/problems/unique-binary-search-trees/
 * 
 * 96. 不同的二叉搜索树
 * 
 * Medium
 * 
 * 64ms 96.00%
 * 33.7mb 40.00%
 */
const numTrees = n => {
  const dp = new Array(n + 1).fill(0)
  dp[0] = 1 
  dp[1] = 1
  for (let i = 2; i <= n; i++) {
    for (let j = 0; j < i; j++) {
      dp[i] += dp[j] * dp[i - j - 1]
    }
  }
  return dp[n]
}