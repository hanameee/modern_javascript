let arr = ["nap", "teachers", "cheaters", "PAN", "ear", "era", "hectares"];

function aclean(arr) {
    const aSet = new Set();
    const answerArr = [];
    for (let word of arr) {
        if (aSet.has(word.toLowerCase().split("").sort().join(""))) {
            continue;
        }
        aSet.add(word.toLowerCase().split("").sort().join(""));
        answerArr.push(word);
        console.log(aSet, word);
    }
    return answerArr;
}
console.log(aclean(arr)); // "nap,teachers,ear"나 "PAN,cheaters,era"이 출력되어야 합니다.

// 알파벳 순으로 정렬된 글자를 맵의 키로 사용해, 키 값에 값 하나만 저장되도록 해도 됨.
function aclean2(arr) {
    let obj = {};

    for (let i = 0; i < arr.length; i++) {
        let sorted = arr[i].toLowerCase().split("").sort().join("");
        obj[sorted] = arr[i];
    }

    return Object.values(obj);
}

let arr = ["nap", "teachers", "cheaters", "PAN", "ear", "era", "hectares"];

alert(aclean(arr));
