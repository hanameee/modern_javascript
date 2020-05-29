# [Objects: the basics](https://javascript.info/object-basics)

## 4.1) [Objects](https://javascript.info/object)

### 객체 생성하기

1. 객체 리터럴 문법 (주로 사용된다)

   ```js
   let user = {};
   ```

2. 객체 생성자 문법

   ```js
   let user = new Object();
   ```

### 단축 프로퍼티

변수를 사용해 프로퍼티를 만들어 줄 때, 프로퍼티의 이름과 값이 변수의 이름과 동일할 경우 단축 구문을 사용할 수 있다.

```js
function makeUser(name, age) {
  return {
    name, // name: name 과 같음
    age   // age: age 와 같음
  };
}
```

### 'in' 연산자로 프로퍼티 존재 여부 확인하기

객체에 존재하지 않는 프로퍼티에 접근하려고 해도 에러가 발생하지 않고, `undefined` 를 반환한다.
이런 특징을 이용하거나, in 연산자를 이용하면 프로퍼티의 존재 여부를 확인할 수 있다.

```js
let user = { name: "John", age: 30 };

alert( user.noSuchProperty === undefined ); // 프로퍼티가 존재하지 않는다면 true
alert("age" in user); // true
```

in 연산자를 사용할 땐 왼쪽에 프로퍼티 이름, 오른쪽에 객체가 온다. 프로퍼티 이름은 보통 따옴표로 감싼 문자열이 오고, 따옴표를 생략할 경우 변수로 판단하고 조사한다.

```js
let user = { age: 30 };

let key = "age";
alert( key in user); // 따옴표가 없으므로 변수 취급하여 "age" 프로퍼티 이름이 존재하는지를 확인한다
```

### `for...in` 반복문으로 객체의 모든 키 순회하기

```js
let user = {
  name: "John",
  age: 30,
  isAdmin: true
};

// 반복 변수를 선언 (let key) 해야 한다
for (let key in object) {
  alert(key); // name, age, isAdmin - 키
  alert(user[key]); // John, 30, true - 키에 해당하는 값
}
```

### 객체 정렬 방식

객체는 특별한 방식으로 정렬되는데, 정수 프로퍼티는 자동으로 정렬되고 (오름차순) 그 외의 프로퍼티는 객체에 추가한 순서 그대로 정렬된다.

정수 프로퍼티란 변형 없이 정수에서 왔다갔다 할 수 있는 문자열을 의미한다 (ex. "40")

### 참조에 의한 비교

객체를 비교할 때는 동등 연산자 `==`와 일치 연산자 `===`가 동일하게 동작한다. **피연산자인 두 객체가 동일한 객체일 경우에만** 참이 반환된다.

```js
let a = {};
let b = a; // 참조에 의한 복사

alert( a == b ); // true
alert( a === b ); // true
```

a와 b는 모두 같은 객체를 참조하고 있기 때문에, 동등 연산자와 일치 연산자 모두 true 이다.

```js
let a = {};
let b = {}; // 독립된 두 객체

alert( a == b ); // false
```

a와 b는 같아 보이지만, 사실은 서로 다르게 만들어진 독립된 객체이기 때문에 동등 연산자와 일치 연산자 모두 false 이다.

### const 객체

`const` 로 선언한 객체는 변경 가능하다.

const는 오직 객체에 대한 참조 값만 고정한다. 객체 내부에 접근해서 프로퍼티를 변경하는 것은 참조 값을 변경하지 않기 때문에 에러가 나지 않는다.

에러는 아래처럼 `const` 로 선언한 객체를 다른 것으로 덮어씌우려 할 때 일어난다.

```js
const user = {
  name: "John"
};

// TypeError: Assignment to constant variable.
user = {
  name: "Pete"
};
```

### 객체 복사와 병합

객체를 참조에 의한 복사가 아닌, 동일한 값을 가지지만 독립적인 새로운 객체를 만들고 싶다면?

- 새로운 빈 객체를 만든 다음, 객체의 모든 프로퍼티를 반복문으로 순회해 프로퍼티를 전부 복사해 넣기

- Object.assign 을 사용해 객체를 복사하기

  ```js
  let user = {
    name: "John",
    age: 30
  };
  
  let clone = Object.assign({}, user);
  ```

### 깊은 복사

위 예시처럼 객체의 프로퍼티가 원시값이 아닌, 다른 객체에 대한 참조 값일 경우엔 어떻게 해야 할까? 이 경우, 프로퍼티를 복사하는 것 만으로는 객체를 완전하게 복제할 수 없다.

이런 경우엔  `user[key]`의 각 값을 검사하면서 그 값이 객체라면 객체의 구조도 복사해주는 **deepcopy**가 필요하다.

깊은 복사 시 사용되는 표준 알고리즘인 [Structured cloning algorithm](https://html.spec.whatwg.org/multipage/structured-data.html#safe-passing-of-structured-data)을 사용하면 위 사례를 비롯한 다양한 상황에서 객체를 복제할 수 있다. 추가적으로 자바스크립트 라이브러리 [lodash](https://lodash.com/)의 메서드나 [_.cloneDeep(obj)](https://lodash.com/docs#cloneDeep)을 사용하면 해당 알고리즘을 직접 구현하지 않고도 깊은 복사를 처리할 수 있다.



## 4.2) [Garbage collection](https://javascript.info/garbage-collection)

자바스크립트 엔진 내에서는 가비지 컬렉터가 끊임없이 동작하면서 자동으로 메모리 관리를 수행한다.

자바스크립트는 도달 가능성 (reachability) 개념을 사용해 메모리 관리를 수행하는데, 가비지 컬렉터는 모든 객체를 모니터링하고, 도달할 수 없는 객체는 삭제한다.



🖐  JS의 가비지 컬렉션에 대한 자세한 내용 정리는 지금으로써는 생략한다.



## 4.3) [Symbol type](https://javascript.info/symbol)

`Symbol`은 원시형 데이터로, 유일무이한 식별자를 만드는 데 사용된다.

자바스크립트는 객체 프로퍼티 키로 오직 문자형과 심볼형만을 허용한다.

### 심볼이란?

심볼값은 `Symbol()` 을 호출하여 만들 수 있으며, 유일한 식별자 (Unique identifier) 를 만들고 싶을 때 사용한다.

```js
let id = Symbol();
```

심볼을 만들 때 "심볼 이름" 이라고 불리는 설명을 붙일 수 도 있다. 심볼은 유일성이 보장되는 자료형이므로 설명이 동일한 심볼이라도 다른 심볼값이다. 설명은 그저 이름표 역할일 뿐이다.

```js
// "id"라는 설명이 붙여진 심볼 id
let id = Symbol("id");
```

심볼은 문자형으로 자동 형변환되지 않는다. 심볼이나 심볼 이름을 출력하고 싶은 경우 `.toString()`  메서드나 `symbol.description` 을 활용해야 한다.

### 숨김 프로퍼티

심볼을 이용하면 외부 코드에서 접근이 불가능하고 값도 덮어쓸 수 없는 숨김 프로퍼티를 만들 수 있다. 

서드파티 코드에서 가져온 user 객체가 있을 때, 만약 문자열 "id" 를 사용해 식별자를 만든다면 충돌이 발생할 가능성이 있다.

```js
let user = { name: "John" };

// 문자열 "id"를 만든 식별자
user.id = "스크립트 id 값";
// 만약 제3의 스크립트가 동일하게 문자열 "id"를 이용해 식별자를 만든다면
user.id = "제3 스크립트 id 값"
// 의도치 않게 값이 덮어 쓰이게 된다.
```

하지만 심볼을 이용해 전용 식별자를 만들어 프로퍼티의 키로 사용한다면, 심볼은 유일성이 보장되므로 이름이 같더라도 식별자가 충돌하지 않는다.

```js
let user = { 
  name: "John"
};

let id = Symbol("id");

// 심볼을 키로 사용해 데이터에 접근할 수 있다
user[id] = 1;
```

### for...in 과 Object.assign에서의 심볼

`for...in` 으로 객체의 key를 순회할 때, Symbol인 key는 반복문에서 배제된다. '심볼형 프로퍼티 숨기기(hiding symbolic property)' 라는 원칙 때문이고, 이 원칙 덕분에 외부 스크립트나 라이브러리는 심볼형 키를 가진 프로퍼티에 접근하지 못한다.

그러나 `Object.assign` 은 키가 심볼인 프로퍼티를 배제하지 않고 객체 내 모든 프로퍼티를 복사한다.



🖐 전역 심볼, 시스템 심볼에 대한 내용은 지금으로써는 생략한다.



## 4.4) [Object methods, "this"](https://javascript.info/object-methods)

### 메서드 만들기

```js
// 일반적인 메서드 선언
let user = {
  name: "John",
  age: 30
  sayHi: function() {
  	alert("안녕하세요!");
	}
};

// function을 생략한 단축 구문
let user = {
  name: "John",
  age: 30
  sayHi() {
  	alert("안녕하세요!");
	}
};
```

### this

자바스크립트에서 this 는 런타임에 결정되며, `this` 는 메서드를 호출할 때 사용된 객체를 나타낸다.

#### edge case

```js
let user = {
  name: "John",
  hi() { alert(this.name); },
  bye() { alert("Bye"); }
};

user.hi(); // John 

// name에 따라 user.hi나 user.bye가 호출되게 한다면
(user.name == "John" ? user.hi : user.bye)(); // Error: Cannot read property 'name' of undefined
```

예상과는 달리 메서드를 호출할 때 `this` 값에 undefined가 할당되어 에러가 난다. 그 이유는 무엇일까?

객체.메서드 에서 `.` 은 함수가 아닌 참조 타입을 반환한다.
참조 타입 값은 `(base, name, strict)`이 조합된 형태를 띈다

- `base`: 객체
- `name`: 프로퍼티의 이름
- `strict`: 엄격 모드에서 true

user.hi 에서 참조 타입 값을 반환하는데, 이런 참조형 값에 `()` 를 붙여 호출하면 객체, 객체의 메서드와 연관된 모든 정보를 받고 이 정보를 이용해 this (이 예시에서는 user) 가 결정된다.

그런데 위 edge case 에선 `user.hi()` 가 아니라, `user.hi` 의 함수 값만 받아서 전달하기에 `this` 의 정보가 사라지게 된다.  user의 메서드를 실행한 것이 아니라, this에 대한 정보가 전혀 없는 상태에서 (user.hi라는 함수) 를 그냥 `()` 호출 한 것이 되는 것이다.

조금 더 자세히 설명하자면 점이나 대괄호를 통해 프로퍼티에 접근하려는 경우 참조 타입 값(`(base, name, strict)`)이 반환된다. 그런데, **메서드 호출을 제외하고, 참조 타입 값에 행해지는 모든 연산은 참조 타입 값을 일반 값으로 변환**시킨다. 그리고 이 과정에서 `this`의 정보가 누락된다.

`obj.method()` 같이 점을 사용하거나, `obj[method]()` 같이 대괄호를 사용해 함수를 호출했을 때에만 `this` 값이 의도한 대로 전달되며 위 edge case 같은 경우엔  [func.bind()](https://ko.javascript.info/bind#solution-2-bind) 등을 이용하면 해결 할 수 있다. 이후에 학습할 것임.

### 화살표 함수의 this

화살표 함수는 일반 함수와는 달리 고유한 `this` 를 가지지 않고, 일반적인 외부 함수에서 this 값을 가져온다.

별도의 this 가 만들어지는 것을 원하지 않고, 외부 컨텍스트에 있는 this를 이용하고 싶을 경우에 유용하다. 자세한 내용은 화살표 함수를 공부하며 다룰 것임.



## 4.5) [Object to primitive conversion](https://javascript.info/object-toprimitive)

객체끼리 더하거나, 빼면 어떻게 될까? `alert(obj)` 처럼 객체를 출력할 때는?
이 모든 경우 객체가 원시 자료형으로 자동 형변환된다.

1. 객체는 논리 평가 시 항상 true를 반환함
2. **숫자형** 변환은 객체끼리 빼는 연산을 할 때나 (ex.  Date 끼리 뺄때) 수학 관련 함수를 적용할 때 일어남
3. **문자형** 변환은 주로 객체를 출력하려고 할 때 일어남

### toPrimitive 

자바스크립트는 형 변환이 필요할 때, 아래와 같은 알고리즘에 따라 원하는 메서드를 찾고 호출함

1. 객체에 `obj[Symbol.toPrimitive](hint)`메서드가 있는지 찾고, 있다면 메서드를 호출한다. `Symbol.toPrimitive`는 시스템 심볼이며, 심볼형 키로 사용된다.
2. 1에 해당하지 않고 hint가 "string" 이라면,
   - `obj.toString()`이나 `obj.valueOf()`를 호출한다 (존재하는 메서드만 실행됨).
3. 1과 2에 해당하지 않고, hint가 "number" 이나 "default" 라면,
   - `obj.valueOf()`나 `obj.toString()`을 호출한다 (존재하는 메서드만 실행됨).

### toString과 valueOf

`toString` , `valueOf` 는 심볼이 생기기 전부터 존재해왔던 메서드들임. 이 메서드들을 이용해 (구식이긴 하지만) 형 변환을 직접 구현할 수 있음.

앞서 나온 것처럼, 객체에  `Symbol.toPrimitive`가 없으면 자바스크립트는 아래 규칙에 따라 `toString`이나 `valueOf`를 호출함.

- `toString`은 문자열 `"[object Object]"`을 반환함
- `valueOf`는 객체 자신을 반환함 - 그 결과가 무시되는 것과 같음

```js
let user = {name: "John"};

alert(user); // [object Object]
alert(user.valueOf() === user); // true
```

객체에 `Symbol.toPrimitive`와 `valueOf`가 없으면, `obj.toString()`이 모든 형 변환을 처리하기 때문에 사실상 `toString` 만 구현하면 충분한 경우가 많다.

```js
let user = {
  name: "John",

  toString() {
    return this.name;
  }
};

alert(user); // toString -> John
alert(user + 500); // toString -> John500
```



## 4.6) [Constructor, operator "new"](https://javascript.info/constructor-new)

### 생성자 함수

생성자 함수는 그냥 함수와 다를 것이 없지만, 아래 두가지 관례를 띠른다.

1. 함수 이름의 첫 글자는 대문자로 시작
2. 반드시 `new` 연산자를 붙여 실행


생성자 함수는 아래의 알고리즘을 따른다.

```js
function User(name) {
  // 1. this = {};  (빈 객체가 암시적으로 만들어짐)

  // 2. 새로운 프로퍼티를 this에 추가함
  this.name = name;
  this.isAdmin = false;

  // return this;  (3. this가 암시적으로 반환됨)
}

let user = new User("Hannah") // 위의 알고리즘이 실행됨
```

생성자 함수는 위와 같이 반환해야 할 것들이 모두 `this` 에 저장되고, `this` 가 자동으로 반환되기 떄문에 return을 명시적으로 써 줄 필요가 없다.

만약 `return`  문이 있다면

- 객체를 return 한다면 `this` 대신 객체가 반환된다
- 원시형을 return 한다면 return 문이 무시된다.

하지만 `return`문이 있는 생성자 함수는 거의 없다 ^^

### 생성자 함수 내 메서드, 프로퍼티 만들기

```js
function User(name) {
  // 프로퍼티
  this.name = name;
  // 메서드
  this.sayHi = function() {
    alert( "My name is: " + this.name );
  };
}

let john = new User("John");

john.sayHi(); // My name is: John

```

### 요약

1. 생성자 함수는 일반 함수와 다를 것이 없다. 다만, 일반 함수와 구분하기 위해 함수 이름 첫 글자를 **대문자**로 쓴다.

2. 생성자 함수는 반드시 `new` 연산자와 함께 호출해야 한다. `new`와 함께 호출하면 내부에서 `this`가 암시적으로 만들어지고, 마지막엔 `this`가 반환된다.

