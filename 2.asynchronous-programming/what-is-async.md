# 자바스크립트의 비동기식 처리 모델

[참고 링크 - poiemaweb](https://poiemaweb.com/es6-promise)

---

## 1. 동기식 처리 모델과 비동기식 처리 모델

### 동기식 처리 모델
직렬적으로 태스크를 수행한다. 즉, 태스크는 순차적으로 실행되며 어떤 작업이 수행 중이면 다음 태스크는 대기한다.

예를 들어 서버에서 데이터를 가져와서 화면에 표시하는 태스크를 수행할 때, 서버에 데이터를 요청하고 데이터가 응답될 때까지 이후의 태스크들은 **블로킹**된다.

### 비동기식 처리 모델

병렬적으로 태스크를 수행한다. 태스크가 종료되지 않은 상태라 하더라도, 대기하지 않고 즉시 다음 태스크를 실행한다.

예를 들어 서버에서 데이터를 가져와서 화면에 표시하는 태스크를 수행할 때, 서버에 데이터를 요청한 이후 서버로부터 데이터가 응답될 때까지 대기하지 않고 (Non-Blocking) 즉시 다음 태스크를 수행한다

이후 서버로부터 데이터가 응답되면 이벤트가 발생하고 이벤트 핸들러가 데이터를 가지고 수행할 태스크를 계속해 수행한다.

자바스크립트 **대부분의 DOM 이벤트와 Timer 함수(setTimeout, setInterval), Ajax 요청은 비동기식 처리 모델로 동작**한다.

## 2. Callback hell

비동기식 처리 모델에서 처리 순서를 보장하기 위해 콜백 함수를 사용하면, 여러개의 콜백 함수가 중첩되어 복잡도가 발생하는 단점이 있다.

```js
step1(function(value1) {
  step2(value1, function(value2) {
    step3(value2, function(value3) {
      step4(value3, function(value4) {
        step5(value4, function(value5) {
            // value5를 사용하는 처리
        });
      });
    });
  });
});
```

콜백함수의 가장 큰 문제점은 예외처리가 어렵다는 것이다.

```js
try {
  setTimeout(() => { throw new Error('Error!'); }, 1000);
} catch (e) {
  console.log('에러를 캐치하지 못한다..');
  console.log(e);
}
```

setTimeout 함수의 콜백 함수를 호출하는 것은 setTimeout 함수가 아니기에 (setTimeout 함수의 콜백 함수는 태스트 큐로 이동한 후 호출 스택이 비어졌을 때 호출 스택으로 이동되어 실행된다. 이때 setTimeout 함수는 이미 호출 스택에서 제거된 상태이다.)

예외(exception)는 호출자(caller) 방향으로 전파되는데, setTimeout의 콜백 함수의 호출자는 setTimeout이 아니기에, setTimeout 함수의 콜백 함수 내에서 발생시킨 에러는 catch 블록에서 캐치되지 않는다.

## 3. Promise

프로미스 객체는 Promise 생성자 함수를 통해 인스턴스화 한다. Promise 생성자 함수는 비동기 작업을 수행할 **콜백 함수**를 인자로 전달받는데 이 콜백 함수는 **resolve와 reject 함수를 인자**로 전달받는다.

```js
// Promise 객체의 생성
const promise = new Promise((resolve, reject) => {
    // 비동기 작업을 수행한다
    if (/*비동기 작업 수행 성공*/) {
        resolve("result");
    } else {
        reject("failure reason");
    }
});

```

위 예제처럼 비동기 함수 내에서 Promise 객체를 생성하고 그 내부에서 비동기 처리를 구현한다.

이때 비동기 처리에 성공하면 **resolve** 메소드를 호출하고, resolve 메소드의 인자로는 **비동기 처리 결과**를 전달한다. 이 **처리 결과**는 **Promise 객체의 후속 처리 메소드로 전달**된다.

만약 비동기 처리에 실패하면 **reject** 메소드를 호출한다. 이때 reject 메소드의 인자로 에러 메시지를 전달한다. 이 **에러 메시지**는 **Promise 객체의 후속 처리 메소드로 전달**된다.

#### Promise 의 후속 처리 메소드 (then, catch)

Promise로 구현된 **비동기 함수**는 **Promise 객체를 반환**하여야 한다.

Promise로 구현된 비동기 함수를 호출하는 측(promise consumer)에서는 Promise 객체의 후속 처리 메소드(then, catch)를 통해 비동기 처리 결과 또는 에러 메시지를 전달받아 처리한다.

Promise 객체는 상태를 가지는데 - 이 상태에 따라 후속 처리 메소드를 체이닝 방식으로 호출한다. Promise의 후속 처리 메소드는 아래와 같다.

- then

  then 메소드는 두 개의 콜백 함수를 인자로 전달 받는다. 첫 번째 콜백 함수는 성공(fulfilled, resolve 함수가 호출된 상태) 시 호출되고 두 번째 함수는 실패(rejected, reject 함수가 호출된 상태) 시 호출된다. **then 메소드는 Promise를 반환한다.**

- catch

  예외(비동기 처리에서 발생한 에러와 then 메소드에서 발생한 에러)가 발생하면 호출된다. **catch 메소드는 Promise를 반환한다.**

## 4. Async & Await

[기본 문법]

```js
// (1) 함수 앞에 async 예약어를 붙인다
async function 함수명() {
  // (2) 함수 내부 로직 중 비동기 처리 코드 앞에 await을 붙인다
  // 비동기 처리 메서드는 반드시 promise 객체를 반환해야 한다
  await 비동기_처리_메서드_명();
}
```

(2) `await`의 대상이 되는 비동기 처리 코드는 일반적으로 HTTP 통신을 하는 비동기 처리 코드, 예를 들면 [Axios](https://github.com/axios/axios) 등 프로미스를 반환하는 API 호출 함수이다.

