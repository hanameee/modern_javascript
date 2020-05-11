Object Oriented Programming in JS

[참고 자료 : Poiemaweb 자바스크립트 객체지향 프로그래밍](https://poiemaweb.com/js-object-oriented-programming)
[참고 자료 : Poiemaweb 프로토타입 ](https://poiemaweb.com/js-prototype)

---
### 복습 - JS에서 객체를 만드는 방법 3가지

```js
// 1.객체 리터럴
var obj1 = {};
obj1.name = "Lee";

// 2.Object() 생성자 함수 - 거의 쓸 일 X
var obj2 = new Object();
obj2.name = "Lee";

// 3.생성자 함수
function F() {}
var obj3 = new F();
obj3.name = "Lee";
```

ECMAScript 6에서 새롭게 [클래스](https://poiemaweb.com/es6-class)가 도입되었으나, 그렇다고 해서 ES6의 Class가 새로운 객체지향 모델을 제공하는 것이 아니며 Class도 사실 함수이고 기존 prototype 기반 패턴의 Syntactic sugar 이다.

그러니 Prototype Chain을 먼저 이해해보자!

## Prototype

자바스크립트는 **프로토타입 기반 객체지향 프로그래밍 언어**이다. 

- [[Prototype]]

  - 함수를 포함한 모든 객체가 가지고 있는 인터널 슬롯이다.

  - **객체의 입장에서 자신의 부모 역할을 하는 프로토타입 객체를 가리키며 함수 객체의 경우 `Function.prototype`를 가리킨다.** 

    ```javascript
    console.log(Person.__proto__ === Function.prototype);
    ```

- prototype 프로퍼티

  - 함수 객체만 가지고 있는 프로퍼티이다.

  - **함수 객체가 생성자로 사용될 때 이 함수를 통해 생성될 객체의 부모 역할을 하는 객체(프로토타입 객체)를 가리킨다.**

    ```javascript
    console.log(Person.prototype === foo.__proto__);
    ```

### 객체 리터럴 방식으로 생성된 객체의 prototype chain

```js
// 객체 리터럴 방식으로 생성된 person - 사실은 내장 함수인 Object() 생성자 함수로 만들어진 것
var person = {
  name: 'Lee',
  gender: 'male',
  sayHello: function(){
    console.log('Hi! my name is ' + this.name);
  }
};

console.log(person.__proto__ === Object.prototype) // 1. true
console.log(Object.prototype.constructor === Object) // 2. true
console.log(Object.__proto__ === Function.prototype) // 3. true
console.log(Function.prototype.__proto__ == Object.prototype) // 4. true
```

1. person의 [[prototype]] = person의 prototype 객체 = Object.prototype
   : 객체 리터럴을 사용하여 생성된 person 객체의 프로토타입 객체는 Object.prototype이다.
2. Object.prototype의 constructor은 Object (생성자 함수) 이다
3. Object의 [[prototype]] = Function.prototype
4. Function.prototype.[[prototype]] == Object[[prototype]]
   : Function을 생성자함수로 만들어진 객체의 prototype 객체 == Object

![object_literal_prototype_chaining](https://poiemaweb.com/img/object_literal_prototype_chaining.png)

### JS에서 함수를 정의하는 방식

1) 함수 선언문
2) 함수 표현식
3) Function 생성자 함수

#### 1. 함수 선언문

```js
function square(number){
  return number * number;
}
```

#### 2. 함수 표현식

```js
let square = function(number) {
  return number * numb
}
```



Object.prototype 객체를 **프로토타입 체인의 종점(End of prototype chain)**이라 한다.