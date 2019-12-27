// Promise 객체의 생성
const promise = new Promise((resolve, reject) => {
    // 비동기 작업을 수행한다
    if (/*비동기 작업 수행 성공*/) {
        resolve("result");
    } else {
        reject("failure reason");
    }
});


const promiseAjax = (method, url, payload) => {
    return new Promise((resolve, reject) => {
        // XHLHttpRequest 생성자 함수로 새로운 request 객체 인스턴스 생성
        const xhr = new XMLHttpRequest();
        // HTTP method와 URL을 가지고 요청 초기화(세팅)
        xhr.open(method,url);
        // HTTP 요청 헤더의 값을 설정
        xhr.setRequestHeader('Content-type','application/json');
        xhr.send(JSON.stringify(payload));

        xhr.onreadystatechange = function(){
            // 서버 응답 완료가 아니면 무시
            if(xhr.readyState !== XMLHttpRequest.DONE) return;
            if(xhr.status >= 200 && xhr.status < 400) {
                // 정상 응답 - 
            }
        }

    })
}