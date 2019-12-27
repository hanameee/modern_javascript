// Promise 객체의 생성
const promise = new Promise((resolve, reject) => {
    // 비동기 작업을 수행한다
    if (/*비동기 작업 수행 성공*/) {
        resolve("result");
    } else {
        reject("failure reason");
    }
});
