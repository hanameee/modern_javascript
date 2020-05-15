function copySorted(arr) {
    const newArr = Array.from(arr);
    // 아니면 arr.slice().sort() 도 됨
    return newArr.sort();
}

let arr = ["HTML", "JavaScript", "CSS"];

console.log(copySorted(arr));
console.log(arr);
