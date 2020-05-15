function filterRange(arr, a, b) {
    newArr = arr.filter((elem) => elem <= b && elem >= a);
    return newArr;
}

arr = [5, 3, 8, 1];
console.log(filterRange(arr, 1, 4));
