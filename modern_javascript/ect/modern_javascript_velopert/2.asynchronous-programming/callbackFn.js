// 비동기 처리를 위한 콜백 함수
const work = callback => {
    setTimeout(() => {
        console.log("[work1 함수 시작]");
        const start = Date.now();
        for (let i = 0; i < 1000000000; i++) {}
        const end = Date.now();
        console.log(end - start + "ms");
        callback();
    }, 0);
};

function work2(callback) {
    console.log("[work2 함수 시작]");
    const start = Date.now();
    for (let i = 0; i < 1000000000; i++) {}
    const end = Date.now();
    console.log(end - start + "ms");
}

work(() => console.log("난 work의 콜백함수야"));
console.log("1. 난 다음 작업이야");
console.log("1. 난 그 다음 작업이야");

work2(() => console.log("난 work의 콜백함수야"));
console.log("2. 난 다음 작업이야");
console.log("2. 난 그 다음 작업이야");

// callback hell 예시
function increaseAndPrint(n, callback) {
    setTimeout(() => {
        const increased = n + 1;
        console.log(increased);
        if (callback) {
            callback(increased);
        }
    }, 1000);
}

increaseAndPrint(0, n => {
    increaseAndPrint(n, n => {
        increaseAndPrint(n, n => {
            increaseAndPrint(n, n => {
                increaseAndPrint(n, n => {
                    setTimeout(() => console.log("끝!"), 1000);
                });
            });
        });
    });
});
