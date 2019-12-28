# Ajax

[참고 링크 - poiemaweb](https://poiemaweb.com/js-ajax)

---

## 1. Ajax (Asynchronous JavaScript and XML)

Ajax는 자바스크립트를 이용해서 **비동기적(Asynchronous)**으로 서버와 브라우저가 데이터를 교환할 수 있는 통신 방식을 의미한다.



## 2. XMLHttpRequest
브라우저는 **[XMLHttpRequest](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest) 객체**를 이용하여 Ajax 요청을 생성하고 전송한다. 서버가 브라우저의 요청에 대해 응답을 반환하면 같은 XMLHttpRequest 객체가 그 결과를 처리한다.

XMLHttpRequest 는 JavaScript를 통해 우리가 서버로 부터 다양한 리소스(e.g. images, text, JSON, even HTML snippets)를 가져오는 요청을 만들어 주며, 요청에 대한 응답을 이용한 DOM 조작을 통해 전체 페이지를 불러오지 않고도 **필요한 부분만을 업데이트** 할 수 있다.

### 2.1) Ajax Request

Ajax 요청처리의 예는 다음과 같다.

```js
// XMLHttpRequest 객체 (요청) 생성
const xhr = new XMLHttpRequest();
// 비동기 방식으로 request 오픈 : (method, url[, async]) 의 파라미터를 받음
xhr.open("POST","/users")
// HTTP Request Header의 값 설정
xhr.setRequestHeader('Content-type', 'application/json');
const data = { id: 3, title: 'JavaScript', author: 'Park', price: 5000};
// send에는 request body에 담아 전송할 데이터를 전달할 수 있다
// 요청 method가 GET인 경우, send 메소드의 인수는 무시되고 request body는 null로 설정된다.
xhr.send(JSON.stringify(data));
```

### 2.2) Ajax Response

Ajax 응답처리의 예는 다음과 같다.

```js
// XMLHttpRequest 객체 (요청) 생성
const xhr = new XMLHttpRequest();
// XMLHttpRequest.readyState 프로퍼티가 변경(이벤트 발생)될 때마다 콜백함수(이벤트 핸들러)를 호출한다.
xhr.onreadystatechange = function(e) {
  // readyStates는 XMLHttpRequest의 상태(state)를 반환
  // readyState: 4 => DONE(서버 응답 완료)
  if(xhr.readyState != XMLHttpRequest.DONE) return;
  // status는 response 상태 코드를 반환 : 200 => 정상 응답
  if(xhr.status === 200){
    // XMLHttpRequest.responseText에는 서버가 전송한 데이터가 담겨 있다
    consol.log(xhr.responseText);
  } else {
    console.log('Error!');
  }
};
```

#### readyState

readXMLHttpRequest 객체의 `readyState` 프로퍼티를 통해 response가 클라이언트에 도달했는지를 추적할 수 있다.

`readyState` 의 값은 아래와 같다.

| Value | State            | Description                                           |
| :---: | :--------------- | :---------------------------------------------------- |
|   0   | UNSENT           | XMLHttpRequest.open() 메소드 호출 이전                |
|   1   | OPENED           | XMLHttpRequest.open() 메소드 호출 완료                |
|   2   | HEADERS_RECEIVED | XMLHttpRequest.send() 메소드 호출 완료                |
|   3   | LOADING          | 서버 응답 중(XMLHttpRequest.responseText 미완성 상태) |
|   4   | DONE             | 서버 응답 완료                                        |
#### status

readXMLHttpRequest 객체의 `status` 프로퍼티를 통해 request 에 대한 response 의 상태를 알 수 있다. 상태는 HTTP status code 값으로 리턴된다.

각 status에 대한 내용은 [공식 문서](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status) 참고.

Status 값은 5가지 범위로 분류된다.

1. Informational responses (`100`–`199`)
2. Successful responses (`200`–`299`)
3. Redirects (`300`–`399`)
4. Client errors (`400`–`499`)
5. Server errors (`500`–`599`)

따라서 `(xhr.status >= 200 && xhr.status < 400)` 는 정상 응답을 의미한다고 볼 수 있다.

[용례]

```html
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8" />
        <title>Our superheroes</title>
        <link
            href="https://fonts.googleapis.com/css?family=Faster+One"
            rel="stylesheet"
        />
        <link rel="stylesheet" href="style.css" />
    </head>

    <body>
        <header></header>

        <section></section>

        <script>
            const header = document.querySelector("header");
            const section = document.querySelector("section");
            // 1. 우리가 가져오고 싶은 JSON의 URL을 변수에 담는다
            var requestURL =
                "https://mdn.github.io/learning-area/javascript/oojs/json/superheroes.json";
            // 2. XMLHttpRequest 생성자 함수를 사용해 새로운 request 객체 인스턴스를 만든다
            var request = new XMLHttpRequest();
            // 3. request 객체의 open 메서드를 사용해 요청을 연다
            // 이때, 필수 파라미터 2개는 (1)HTTP method (2)요청하는 URL 이렇게 2개이다
            request.open("GET", requestURL);
            // 4. responseType을 json으로 정의하고, send 메서드를 사용해 요청을 전송한다
            request.responseType = "json";
            request.send();
            // 5. onload는 XHR 상호작용이 성공적으로 끝났을때 called 되는 function이다. 즉, request.response를 보장한다
            request.onload = function() {
                // 요청에 대한 응답인 json 데이터를 JS 객체 형태로 변환해 superHeroes 변수에 저장한다
                var superHeroes = request.response;
                populateHeader(superHeroes);
                showHeroes(superHeroes);
            };
          	// 6. response Obj를 가지고 DOM manipulate하는 함수
            function populateHeader(jsonObj) {
                var myH1 = document.createElement("h1");
                myH1.textContent = jsonObj["squadName"];
                header.appendChild(myH1);
                var myPara = document.createElement("p");
                myPara.textContent =
                    "Hometown: " +
                    jsonObj["homeTown"] +
                    " // Formed: " +
                    jsonObj["formed"];
                header.appendChild(myPara);
            }
          ...
        </script>
    </body>
</html>

```



## 3. Fetch API

[참고 링크](https://www.zerocho.com/category/HTML&DOM/post/595b4bc97cafe885540c0c1c)

XHR 객체의 가독성이나 코드 복잡도를 개선하기 위해 나온 것이 Fetch API로, Fetch API는 request 후에 **Promise** 객체를 return 한다.

Fetch 함수의 구조는 다음과 같다.

```js
fetch('주소',설정객체).then(콜백).catch(콜백);
```

- 주소 : 요청을 보낼 URL 입력
- 설정객체 :  GET, POST 등의 메소드, 보낼 데이터 등
- then : 응답 response 객체 받음
- catch : 요청에 대한 에러 받음

```js
fetch("https://mdn.github.io/learning-area/javascript/oojs/json/superheroes.json").then((res) => {
  // 성공을 알리는 HTTP 상태코드
  if(res.status === 200 || res.status === 201) {
    res.text().then(text => console.log(text));
    // 실패를 알리는 HTTP 상태코드
  } else {
    console.error(res.statusText);
  }
}).catch(err => console.error(error));
```
fetch 함수는 promise를 리턴한다. 체이닝 방식으로 후속 처리 메소드인 then과 catch 가 호출되고 있는 것을 볼 수 있다.

then 함수는 응답으로 비동기 처리의 결과인 **Response 객체**를 받는데, Response 객체의 구조는 아래와 같다.
 ![image-20191229031716847](../../REACT_study/Udemy/images/image-20191229031716847.png)

Response 객체는 응답에 대한 정보를 담고 있으며, 객체 안의 `status` 와 `statusText` 등은 성공 여부를 판가름할 때 쓰면 된다.

`headers`는 응답에 대한 헤더 정보를 담고 있는 Headers 객체이다.

`body`는 응답 내용인데 Stream으로 되어 있어 쉽게 값을 볼 수 없다. 대신, Response 객체에서 값을 볼 수 있게 해주는 메소드 5가지가 존재한다.

- text
- arrayBuffer
- blob
- json
- formData

위 메소드들은 모두 Promise를 return한다. 그렇기에 위의 예시 코드에서도

`res.text().then(text => console.log(text));`

**text** 메소드가 Promise를 return하기에 다시 한번 후속 처리 메소드 then으로 text를 받은 것을 볼 수 있다.

만약 **json** 데이터가 응답으로 오면 `res.json().then(json => console.log(json));` 이렇게 받으면 되고, **blob**이나 **arrayBuffer**는 이미지나 파일같은 데이터일 때 사용하면 된다.,

