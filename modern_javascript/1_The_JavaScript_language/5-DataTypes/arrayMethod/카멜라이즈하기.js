// 내 코드
function camelize(str) {
    arr = str.split("");
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === "-") {
            arr[i + 1] = arr[i + 1].toUpperCase();
        }
    }
    arr = arr.filter((char) => char != "-");
    return arr.join("");
}

// 답 코드 -- 앗... 그냥 - 기준으로 split 하면 되는군 머쓱
function camelize2(str) {
    return str
        .split("-")
        .map((word, idx) =>
            idx == 0 ? word : word[0].toUpperCase() + word.slice(1)
        )
        .join("");
}
console.log(camelize("background-color"));
console.log(camelize("list-style-image"));
console.log(camelize("-webkit-transition"));
