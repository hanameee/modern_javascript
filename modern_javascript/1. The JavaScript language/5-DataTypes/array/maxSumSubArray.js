// 최대 부분수열의 합
function getMaxSubSum(arr) {
    let maxSum = 0;
    let partialSum = 0;
    for (let item of arr) {
        partialSum += item;
        maxSum = Math.max(maxSum, partialSum);
        if (partialSum < 0) {
            partialSum = 0; // 음수면 부분합을 0으로 (부분합에 포함시키지 않는 것)
        }
    }
    return maxSum;
}

// 카데인 알고리즘이라고 하나봄. 사실상 DP임. M(i+1) 는 M(i) 값 + i+1번째 원소이거나, i+1 원소 그 자체
// dp[n] = max(0, dp[n-1]) + arr[n] 부분합을 구한 뒤 음수가 되면 폐기하고 양수라면 부분합에 취합한다. 이렇게 구한 부분합이 이전에 구한 최대값보다 크다면 최대값을 업데이트한다. 시간복잡도는 O(n)
console.log(getMaxSubSum([100, -9, 2, -3, 5]));
