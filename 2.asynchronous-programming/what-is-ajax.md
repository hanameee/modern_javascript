# Ajax

[참고 링크 - poiemaweb](https://poiemaweb.com/js-ajax)

---

## 1. Ajax (Asynchronous JavaScript and XML)

Ajax는 자바스크립트를 이용해서 **비동기적(Asynchronous)**으로 서버와 브라우저가 데이터를 교환할 수 있는 통신 방식을 의미한다.



## 2. XMLHttpRequest

[공식 문서](https://developer.mozilla.org/ko/docs/Web/API/XMLHttpRequest)

XMLHttpRequest (=**XHR**) API는 매우 유용한 JavaScript 오브젝트로, JavaScript를 통해 우리가 서버로 부터 다양한 리소스(e.g. images, text, JSON, even HTML snippets)를 가져오는 요청을 만들어 준다.

즉, 전체 페이지를 불러오지 않고도 **필요한 부분만을 업데이트** 할 수 있다.

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

