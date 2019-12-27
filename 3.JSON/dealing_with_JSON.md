# dealing_with_JSON

[참고 자료 - 공식 API 문서](https://developer.mozilla.org/ko/docs/Learn/JavaScript/Objects/JSON)
[참고 자료 2 - tcpschool](http://tcpschool.com/json/json_basic_structure)

---

## JSON 이란

JSON은 클라이언트와 서버 간 데이터 교환을 위한 규칙, 즉 데이터 포맷이다.
자바스크립트의 객체 리터럴과 매우 흡사하지만, **JSON은 순수한 텍스트로 구성된 규칙이 있는 데이터 구조이다.**

### JSON 객체

JSON 객체는 중괄호({})로 표현한다.

```json
{
    "name": "식빵",
    "family": "웰시코기",
    "age": 1,
    "weight": 2.14
}
```

키는 반드시 큰따옴표(⚠️작은따옴표 사용불가)로 둘러싸야 한다.

### JSON 배열

JSON 배열은 대괄호([])로 표현한다.

```json
"dog": [
    {"name": "식빵", "family": "웰시코기", "age": 1, "weight": 2.14},
    {"name": "콩콩", "family": "포메라니안", "age": 3, "weight": 2.5},
    {"name": "젤리", "family": "푸들", "age": 7, "weight": 3.1}
]
```

위 예제는 배열의 이름이 "dog"이고, 3개의 JSON 객체를 요소로 가지는 JSON 배열이다.

## JS와 JSON

자바스트립트는 JSON 전역 객체를 통해 문자열과 JSON 객체의 상호변환을 지원한다.
JSON 데이터를 처리하기 위해 지원하는 메소드들은 다음과 같다. 

- JSON.stringify()
- JSON.parse()
- toJSON()

### 1. JSON.stringfy()

JSON.stringify() 메소드는 **인수로 전달받은 자바스크립트 객체**를 **문자열로 변환**하여 반환한다.

브라우저에서 서버로 **JS object 를 전송하고 싶다면, 보내기 전에 JS 객체를 JSON 형태로 변환**해야 한다. 이를 위해 JSON.stringfy() 를 사용한 뒤 send를 할 수 있다.

[용례]

```js
// 자바스크립트 객체
var dog = {name: "식빵", family: "웰시코기", age: 1, weight: 2.14}; 
// 자바스크립트 객체를 문자열로 변환
var data = JSON.stringify(dog);
```

### 2. JSON.parse()
JSON.parse() 메소드는 JSON.stringify() 메소드와는 반대로 **인수로 전달받은 문자열**을 **자바스크립트 객체로 변환**하여 반환한다.

**서버로부터 브라우저로 전송된 JSON 데이터는 문자열**이다. 이 문자열을 객체로서 사용하려면 객체화하여야 하는데 이를 역직렬화(Deserializing)이라 한다. 이를 위해 내장 객체 JSON의 static 메소드인 JSON.parse를 사용하게 된다.

[용례]

```js
// JSON 형식의 문자열
var data = '{"name": "식빵", "family": "웰시코기", "age": 1, "weight": 2.14}';
// JSON 형식의 문자열을 자바스크립트 객체로 변환
var dog = JSON.parse(data); 

document.getElementById("json").innerHTML = dog + "<br>";

document.getElementById("json").innerHTML += dog.name + ", " + dog.family;
```

### 3. toJSON()

자바스크립트의 toJSON() 메소드는 **자바스크립트의 Date 객체의 데이터**를 **JSON 형식의 문자열로 변환하여 반환**한다.

이 메소드는 오직 `Date.prototype` 객체에서만 사용할 수 있음에 주의!