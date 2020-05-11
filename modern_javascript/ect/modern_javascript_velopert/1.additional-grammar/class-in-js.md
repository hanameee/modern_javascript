# Class in JS

[참고 자료 : Poiemaweb 클래스]([https://poiemaweb.com/es6-class#4-%EB%A9%A4%EB%B2%84-%EB%B3%80%EC%88%98](https://poiemaweb.com/es6-class#4-멤버-변수))

---
## 1. 클래스 정의와 인스턴스 생성

> 클래스 이름은 파스칼 케이스를 사용하는 것이 일반적이다.

```js
// class 선언문
class Person {
  // constructor
  constructor(name) {
    // class field = 멤버 변수
    this._name = name;
  }
  // method
  sayHi() {
    console.log(`Hi! ${this._name}`);
  }
}

// instance 생성
const me = new Person('Hannah');
me.sayHi(); // Hi! Hannah
```

⚠️ 모든 선언문은 런타임 이전에 먼저 실행되므로, 식별자(변수, 함수, 클래스)에 해당하는 클래스 역시 선언문으로 작성할 시 호이스팅이 발생한다.

하지만, 클래스는  let, const 키워드로 선언한 변수처럼 호이스팅 되기에 선언문 이전에 클래스를 참조하면 ReferenceError이 발생한다.

```js
console.log(Person); // ReferenceError: Cannot access 'Foo' before initialization
class Person { };
```

선언식으로 정의한 클래스의 이름은 constructor과 동일하기에, new 연산자와 함께 클래스 이름을 호출하면 클래스의 인스턴스가 생성된다.

```js
class Person { };
const foo = new Foo(); // 여기서의 Foo는 생성자 함수 (constructor) 이다.
```

## 2. Constructor

constructor 은

- (1) 인스턴스 생성과 (2) 클래스 필드의 생성 및 초기화를 실행하는 특수한 메소드이다
- 반드시 new 연산자와 함께 호출해야 한다
- 클래스 내에 한개만 존재할 수 있다
- 생략할 수 있으며, 생략할 경우 클래스 필드가 없는 빈 객체를 생성한다

```js
// constructor 없는 빈 클래스 생성
class Person { };
// 인스턴스 생성 후
const me = new Person();
// 프로퍼티 동적 할당 및 초기화
me.name = "hannah";
```

## 3. Getter, Setter

[참고 링크](https://beomy.tistory.com/14)

### 3.1) Getter

Getter은 **클래스 필드에 접근할 때마다 class field의 값을 조작하는 행위가 필요할 때** 사용한다.
Getter는 호출하는 것이 아니라 프로퍼티처럼 참조하는 형식으로 사용하며, 참조 시에 메소드가 호출된다. getter는 이름 그대로 무언가를 취득할 때 사용하므로 반드시 무언가를 반환해야 한다. 

### 3.2 Setter

Setter는 **클래스 필드에 값을 할당할 때마다 클래스 필드의 값을 조작하는 행위가 필요할 때** 사용한다.
(=  setter는 특정한 속성의 값이 변경되어 질 때마다 함수를 실행하는데 사용될 수 있다.)

Setter는 호출하는 것이 아니라 프로퍼티처럼 값을 할당하는 형식으로 사용하며 할당 시에 메소드가 호출된다. 

```javascript
class Foo {
  constructor(arr = []) {
    this._arr = arr;
  }
  
  // getter: 메소드 이름 앞에 get 키워드를 사용해 정의한다
  get firstElem() {
    // getter는 반드시 무언가를 반환하여야 한다.
    return this._arr.length ? this._arr[0] : null;
  }

  // setter: 메소드 이름 앞에 set 키워드를 사용해 정의한다
  set firstElem(elem) {
    // ...this._arr은 this._arr를 개별 요소로 분리한다
    this._arr = [elem, ...this._arr];
  }
}

const foo = new Foo([1, 2]);
// 클래스 필드 firstElem에 접근하면 getter가 호출된다.
console.log(foo.firstElem); // 1
// 클래스 필드 lastElem에 값을 할당하면 setter가 호출된다.
foo.firstElem = 100;
console.log(foo.firstElem); // 100
```