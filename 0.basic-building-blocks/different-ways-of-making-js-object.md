참고 자료

- 1. 부캠 DAY8
- 2. [MDN web docs - Working with objects](https://developer.mozilla.org/ko/docs/Web/JavaScript/Guide/Working_with_Objects) 
- 3. [Poiemaweb - 객체](https://poiemaweb.com/js-object)

---

# 1. 객체(Object)란?

Javascript는 객체(object) 기반의 스크립트 언어이며 자바스크립트를 이루고 있는 거의 “모든 것”이 객체이다. 원시 타입(Primitives)을 제외한 나머지 값들(함수, 배열, 정규표현식 등)은 모두 객체이다.

Javascript의 객체는 키(key)와 값(value)으로 구성된 프로퍼티(Property)들의 집합이다. 프로퍼티의 값으로 Javascript에서 사용할 수 있는 모든 값을 사용할 수 있다.

### [JS의 함수는 1급 객체이다.](https://bestalign.github.io/2015/10/18/first-class-object/)

따라서 프로퍼티 값으로 함수를 사용할 수 있으며, 이 경우 일반 함수와 구분하기 위해 `메소드`라고 부른다.

이와 같이 객체는 데이터를 의미하는 프로퍼티와, 데이터를 참조하고 조작할 수 있는 동작을 의미하는 메소드로 구성된 집합이다. 객체는 Property와 Method를 모두 포함할 수 있기에 데이터와 동작을 하나의 단위로 구조화할 수 있어 유용하다.

JS의 객체는 객체지향에서의 상속을 구현하기 위해 `프로토타입` 이라고 불리는 객체의 프로퍼티와 메소드를 상속받을 수 있다.

## 1.1 프로퍼티 (Property)

프로퍼티는 Key와 Value로 구성되며, Key는 프로퍼티를 식별하기 위한 식별자(identifier)이기에 unique하다.

프로퍼티의 명명 규칙과 사용 가능한 값은 아래와 같다.

- Key: 모든 문자열 (빈 문자열 포함) 또는 symbol 값
- Value: 모든 값



프로퍼티 key에 문자열, symbol 외의 값을 지정하면 암묵적 형변환이 되어 문자열이 된다.
이미 존재하는 key를 중복 선언하면 나중에 선언한 프로퍼티가 먼저 선언한 프로퍼티를 덮어쓴다.

## 1.2 메소드 (method) 

프로퍼티 값이 함수일 경우, 일반 함수와 구분하기 위해 메소드라 부른다. 즉, 메소드는 객체에 제한되어 있는 함수를 의미한다.

---

# 2. 객체 생성 방법

## 2.1 객체 리터럴

가장 일반적인 JS의 객체 생성 방식이다. 중괄호 `{}` 를 사용해, 중괄호 내에 1개 이상의 프로퍼리를 기술하여 해당 프로퍼티가 추가된 객체를 간편하게 생성할 수 있다. 

```js
// 객체 생성
let dog = {
  name: "멍멍이",
  age: 1,
  sound: "왈왈",
  bark: function () {
    console.log(this.sound + " 하고 짖어요");
  }
}

console.log(typeof dog); // object
console.log(dog); // {name: "멍멍이", age: 1, sound: "왈왈", bark: ƒ}
dog.bark(); // 왈왈 하고 짖어요
```

## 2.2 Object 생성자 함수

new 연산자와 Object 생성자 함수를 호출해 빈 객체를 생성할 수 있다. 빈 객체를 생성한 이후 프로퍼티나 메소드를 추가하여 객체를 완성하는 방법이다.

생성자(constructor) 함수란, new 키워드와 함께 객체를 생성하고 초기화하는 함수를 말한다. 생성자 함수를 통해 생성된 객체를 인스턴스(instance)라 한다. 

자바스크립트는 Object 생성자 함수 이외에도 String, Number, Boolean, Array, Date, RegExp 등의 Built-in 생성자 함수를 제공한다.

일반 함수와 생성자 함수를 구분하기 위해 생성자 함수의 이름은 파스칼 케이스 (PascalCase) 를 사용하는 것이 일반적이다.

```js
// new 연산자와 Object 생성자 함수를 호출해 빈 객체 생성
let dog = new Object();

// 빈 객체에 프로퍼티 추가
dog.name = "멍멍이";
dog.age = 1;
dog.sound = "왈왈";
dog.bark = function () {
  console.log(this.sound + " 하고 짖어요")
}

// 결과는 위의 객체 리터럴 방식으로 생성한 object와 동일
console.log(typeof dog); // object
console.log(dog); // {name: "멍멍이", age: 1, sound: "왈왈", bark: ƒ}
dog.bark(); // 왈왈 하고 짖어요
```

Object 생성자 함수 방식은 특별한 이유가 없다면 유용하지 않다.
객체 리터럴 방식이 결국 Object 생성자 함수로 객체를 생성하는 것을 단순화시킨 축약표현이기 때문이다. (JS 엔진은 객체 리터럴로 객체를 생성하는 코드를 만나면 내부적으로 Object 생성자 함수를 사용해 객체를 생성한다)

## 2.3 생성자 함수

같은 프로퍼티를 가지지만 값만 다른 여러개의 객체를 생성해야 할때, 생성자 함수를 사용하면 마치 객체를 생성하기 위한 템플릿처럼 사용하여 프로퍼티가 동일한 객체 여러개를 간편하게 생성할 수 있다.

JS의 생성자 함수는 특별한 형식이 정해져 있는 것이 아니라, 기존 함수와 동일한 방법으로 함수를 선언하되 함수를 호출할 때 `new` 연산자를 붙여 호출하면 해당 함수는 생성자 함수로 동작한다.

이는 생성자 함수가 아닌 일반 함수에 new 연산자를 붙여 호출해도 마치 생성자 함수처럼 동작할 수 있다는 것을 의미하기에, 혼란을 방지하기 위해 생성자 함수명은 일반적으로 파스칼 케이스(첫문자 대문자로 기술)를 이용한다. 

```js
// 생성자 함수
function Dog(name,age,sound) {
  this.name = name;
  this.age = age;
  this.sound = sound;
  this.bark = function() {
    console.log(this.sound + " 하고 짖어요")
  }
}

// 생성자 함수로부터 인스턴스 생성
let dog1 = new Dog('멍멍이',1,'왈왈');

// 결과는 마찬가지로 객체 리터럴 방식, Object 생성자 함수를 이용한 방식과 동일
console.log(typeof dog); // object
console.log(dog); // {name: "멍멍이", age: 1, sound: "왈왈", bark: ƒ}
dog.bark(); // 왈왈 하고 짖어요
```

생성자 함수 내의 `this` 는 생성자 함수가 생성할 인스턴스(instance)를 가리킨다. => 함수를 선언할 때가 아닌, call 하는 context에서 this가 결정되기 때문이다.

this에 연결(바인딩)된 프로퍼티와 메소드는 public(외부에서 참조 가능)하다.

생성자 함수 내에서 선언된 일반 변수는 private(외부에서 참조 불가능)하다. 생성자 함수 내부에서는 자유롭게 접근이 가능하나, 외부에서는 접근할 수 없다.

```js
function Dog(name,age,sound) {
  let isAdopted = true;					// private
  this.name = name;							// public
  this.age = age;								// public
  this.sound = sound;						// public
  this.bark = function() {			// public
    console.log(this.sound + " 하고 짖어요")
  }
}

let dog1 = new Dog('멍멍이',1,'왈왈');

console.log(dog.age); // 1
console.log(dog.isAdopted); // undefined - isAdopted 변수는 Dog 생성자 함수 내에서만 접근 가능하다.
```

---

# 3. 객체 프로퍼티 접근

## 3.1 프로퍼티 키

프로퍼티 키는 일반적으로 문자열이므로 따옴표(`"` 또는 `'`) 를 사용한다. 하지만, JS에서 사용 가능한 유효한 이름인 경우 따옴표를 생략할 수 있다.

반대로 말하면, JS에서 사용 가능한 유효한 이름이 아닌 경우 반드시 따옴표를 사용해야만 한다.

```js
let dog = {
  hair_type: "short",
  'hair-color': 'brown', // first-name 은 JS에서 사용가능한 유효한 이름이 아니다.
  function: 1 // 에러가 발생하진 않지만, 예약어를 사용하면 예상치 못한 에러가 발생할 수 있으므로 사용하지 말아야 한다.
}
```

위 코드를 보면 `hair_type` 에서는 따옴표 생략이 가능하지만 `hair-color` 에서는 반드시 따옴표를 사용해줘야 함을 알 수 있다.

hair-color 은 자바스크립트에서 사용 가능한 유효한 이름이 아니라 ‘-‘ 연산자가 있는 표현식이기 때문이다.

hair-color 을 말 그대로 `hair 빼기 color` 인 표현식 형태로 프로퍼티 키로 사용하려면, 키로 사용할 표현식을 대괄호 `[]` 로 묶어야 한다. 문자열 타입의 값으로 수렴될 수 있는 표현식이라면 이런 식으로 프로퍼티 키로 사용이 가능하다.

[ JS 예약어 목록 ]

```pseudocode
abstract  arguments boolean break byte
case  catch char  class*  const
continue  debugger  default delete  do
double  else  enum* eval  export*
extends*  false final finally float
for function  goto  if  implements
import* in  instanceof  int interface
let long  native  new null
package private protected public  return
short static  super*  switch  synchronized
this  throw throws  transient true
try typeof  var void  volatile
while with  yield
// *는 ES6에서 추가된 예약어
```

## 3.2 프로퍼티 값 읽기

객체의 프로퍼티 값에 접근하는 방법은 `마침표(.) 표기법` 과 `대괄호([]) 표기법` 이 있다.

- 프로퍼티 키가 유효한 JS 이름이고, 예약어가 아닌 경우엔 두 표기법 모두를 사용할 수 있다.

- 프로퍼티 키가 유효한 JS 이름이 아니거나, 예약어인 경우 프로퍼티 값은 반드시 대괄호 표기법으로 읽어야 한다.

### 마침표 표기법 (Dot Notation)

프로퍼티 키가 문자열( _ &  $ 포함)으로 시작하는 경우에 사용할 수 있다.
숫자로 시작할 수 없고, 변수를 포함할 수 없고, 공백을 포함할 수 없다.

### 대괄호 표기법 (Bracket Notation)

대괄호 내에 들어가는 프로퍼티 이름은 반드시 문자열이어야 한다. 문자는 공백을 포함할 수 있다.
문자열을 참조하는 변수라면 변수 또한 쓸 수 있다.

```javascript
let person = {
  'first-name': 'Hannah',
  last_name : 'Lee',
  gender: 'female',
  'nick name': 'hannahbanana',
  foo: 'hahaha'
}
let foo = 'nick name';

console.log(person.first-name); // NaN: undefined-undefined
console.log(person[first-name]); // 'Hannah'

console.log(person['nick name']); // 'hannahbanana'

console.log(person.foo); // 'hahaha' - foo 프로퍼티 Key를 찾는다
console.log(person[foo]); // 'hannahbanana' - foo 변수를 찾는다 > foo 변수는 'nick name' 문자열이다 > person["nick name"]을 찾는다
```

dot notation 으로는 변수에 접근할 수 없음에 주의!

|                  **Dot notation**                  |                 **Bracket notation**                 |
| :------------------------------------------------: | :--------------------------------------------------: |
| 프로퍼티 식별자는 오직 알파벳만 가능 ( _ & $ 포함) | 프로퍼티 식별자는 문자열 혹은 문자열을 참조하는 변수 |
|               숫자로 시작할 수 없음                |                숫자로 시작할 수 있음                 |
|               변수를 포함할 수 없음                |                 변수, 공백 사용 가능                 |
|            OK ㅡ obj.prop_1, obj.prop$             |         OK ㅡ obj["1prop"], obj["prop name"]         |
|         NOT OK ㅡ obj.1prop, obj.prop name         |                                                      |

 [표 출처](https://youngban.tistory.com/46)

## 3.3 프로퍼티 삭제

`delete` 연산자를 사용해 객체의 프로퍼티를 삭제할 수 있다.

```js
let person = {
  'first-name': 'Hannah',
  last_name : 'Lee',
  gender: 'female',
  foo: 'hahaha'
}

delete person.foo;
console.log(person.foo); // undefined
```

## 3.4 프로퍼티 순회

### for-in

for-in 문은 **객체의 문자열 키(key)를 순회**하기 위한 문법이다. 객체에 포함된 모든 프로퍼티에 대해 루프를 수행할 수 있다.

```js
let person = {
  'first-name': 'hannah',
  'last-name': 'Lee',
  gender: 'female'
};

for (let prop in person) {
  console.log(`${prop} : ${person[prop]}`)
};

/*
first-name: 'hannah',
last-name: 'Lee',
gender: 'female'
*/
```

for-in 을 배열에 사용하면, 객체의 문자열 키 대신 index (0,1,2...) 를 순회한다.

```js
let arr = ['a','b','c'];
for (let index in arr) {
  console.log(`${index} : ${arr[index]}`)
}
/*
0 : a
1 : b
2 : c
*/
```

다만, for-in 문의 경우 배열에는 사용하지 않는 것이 좋다. 이유는 아래와 같다.

1. 배열은 순서를 보장하는 데이터 구조이지만, 객체의 프로퍼티에는 순서가 없기 때문에 배열에서 for-in을 쓴다고 해도 순서를 보장하지 않는다.
2. 배열 요소들만을 순회하지 않는다.

```js
let arr = ['a','b','c'];
arr.name = 'myArray';
for (let index in arr){
  console.log(`${index} : ${arr[index]}`)
}
/*
0 : a
1 : b
2 : c
name : myArray
*/
```

### for-of

위와 같은 for-in 의 배열에서의 사용 불편함을 극복하기 위해 ES6에서 추가된 것이 for-of 문이다.
for-of 문은 배열의 요소를 순회하기 위해 사용한다.

```js
let arr = ['a','b','c'];
arr.name = 'myArray';

for (let value of arr){
  console.log(value)
}

/*
a
b
c
*/

for (const [index, value] of arr.entries()) {
  console.log(index, value)
}
/*
0 "a"
1 "b"
2 "c"
*/
Object.entries(arr1)
```

### 💡arr.entries() 란?

[MDN 공식문서 - Array.prototype.entries()](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/entries)

`entries()` 메서드는 배열의 각 인덱스에 대한 키/값 쌍을 가지는 새로운 Array Iterator 객체를 반환한다. `[index, value] 형태의 Array Iterator 객체` 

```js
const arr1 = ['a','b','c']
const iterator1 = arr1.entries();
console.log(iterator1.next().value); // Array [0,'a']
console.log(iterator1.next().value); // Array [1,'b']
console.log(iterator1.next().value); // Array [2,'c']
```

