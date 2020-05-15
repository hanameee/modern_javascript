# [Data types](https://javascript.info/data-types)

## 5.1) [Methods of primitives](https://javascript.info/primitives-methods)

JS의 원시형엔 총 7가지 값이 있다.

- 문자 (string)
- 숫자 (number)
- bigint
- boolean
- 심볼
- null
- Undefined

원시값을 메서드로 손 쉽게 다루면서도 원시값을 가볍게 유지하기 위해 JS는 원시 래퍼 객체 (Object wrapper) 를 사용한다.



## 5.2) [Numbers](https://javascript.info/number)

### 어림수 구하기 (rounding)

```
Math.floor
```

**Floor** - 첫째 자리에서 내림(버림). `3.1`은 `3`, `-1.1`은 `-2`

```
Math.ceil
```

**Ceil** -  첫째 자리에서 올림. `3.1`은 `4`, `-1.1`은 `-1`

```
Math.round
```

**Round**  - 첫째 자리에서 반올림. `3.1`은 `3`, `3.6`은 `4`, `-1.1`은 `-1`

`Math.trunc` (Internet Explorer에서는 지원하지 않음)

**Trunc**  - 소수부를 무시. `3.1`은 `3`이 되고 `-1.1`은 `-1`

소수점 n째 자리수까지의 어림수(반올림)를 구한 후 이를 문자형으로 반환해주는 `toFixed(n)` 도 있다.

```js
let num = 12.34
console.log(num.toFixed(1)); // "12.3"
```

문자열로 반환되기 때문에 숫자로 변환하려면 `+ ` 처럼 단항 덧셈 연산자를 앞에 붙이거나 `Number()` 을 호출해 숫자형으로 변환할 수 있다.

### 숫자 읽어들이기

`parseInt`, `parseFloat` 는 **불가능할때까지 숫자를 읽고**, 도중에 오류가 발생하면 이미 수집된 숫자를 반환한다.

```js
alert( parseInt('100px') ); // 100
alert( parseFloat('12.5em') ); // 12.5

alert( parseInt('12.3') ); // 12, 정수 부분만 반환됩니다.
alert( parseFloat('12.3.4') ); // 12.3, 두 번째 점에서 숫자 읽기를 멈춥니다.
```

읽을 수 있는 숫자가 없다면 NaN을 반환한다.



## 5.3) [Strings](https://javascript.info/string)

### 문자열 순회하기 - for ... of 사용

```js
for (let char of "HELLO"){
  console.log(char) // H E L L O
}
```

### 문자열의 불변성

문자열은 수정할 수 없다. index로 문자열에 접근하는 것은 가능하지만 (str[1]) 등, 인덱스로 접근해 중간 문자열을 수정하려고 하려면 에러가 난다.

문자열을 변경하기 위해서는 완전히 **새로운 문자열을 만든 다음 새로운 변수에 할당**해야한다.

### 부분 문자열(substring) 찾기

1) 부분 문자열의 index 찾기 :  `str.indexOf(substr,pos)`

문자열의 pos 인덱스에서부터 시작해 substr이 어디있는지 찾아줌. **없으면 -1**을 반환.

2) 부분 문자열의 존재 여부 찾기 : `str.includes(substr,pos)`

포함 여부만을 알고 싶을때 적절하다. **true, false** 를 반환함.

그 외에도 `str.startsWith`,  `str.endsWith` 등이 있다.

### 부분 문자열 추출하기

1) **str.slice(start, [, end])**⭐️ - 주로 사용

문자열의 `start`부터 `end`까지(`end`는 미포함)를 반환.
`end` 가 생략된 경우, `start` 부터 끝까지를 반환. 음수 인수도 가능하다.

2) **str.substring(start, [, end])**

slice와 아주 유사하지만, start가 end보다 커도 괜찮고, 음수 인수를 허용하지 않는다는 (0으로 처리됨) 점이 다름.

3) **str.substr(start, [, length])** - deprecated

start에서 시작해 length개의 문자열을 반환함. 첫번째 인수가 음수면 뒤에서부터 개수를 셈.

### 문자열을 배열로 변환하기

1. str.split("") 사용
   문자열을 빈 문자열 기준으로 분할한다.
2. 스프레드 연산자 사용

```js
strArr = [..."hello"]
// ["h", "e", "l", "l", "o"]
```



## 5.4) [Arrays](https://javascript.info/array)

Object는 순서를 고려하지 않게 만들어진 자료구조. 순서가 있는 컬렉션을 저장할 때는 배열 자료구조를 사용한다.

### 배열 선언

```js
// 두 가지 방법으로 가능하지만, Array는 까다로워 잘 사용하지 않는다. (요소는 모두 undefined지만 길이는 같아지기때문에)
let arr = new Array();
let arr = []
```

### 배열으로 구현하는 queue 와 stack

JS의 array는 deque로, queue와 stack을 모두 구현할 수 있음. 양쪽 끝에서 삽입과 연산이 모두 가능하기 때문.

- unshift : 제일 앞에 요소 추가
- shift : 제일 앞 요소를 꺼내 제거한 후, 남아있는 요소들을 앞으로 밀어줌
- push : 맨 마지막에 요소 추가
- pop : 제일 마지막 요소를 제거

push와 pop은 빠르지만, shift와 unshift는 느리다. 배열의 맨 앞에 어떤 연산을 한다는 것은 Index를 모두 다 변경해야하는것이므로.

### 배열을 순회하기

1) for 반복문에서 index로 순회하기

```js
let arr = ["a","b","c"]
for (let i = 0; i < arr.length; i++){
  console.log(arr[i])
}
```

2) `for...of` 사용해서 값만 순회하기

```js
let arr = ["a","b","c"]
for (let key of arr){
  console.log(key)
}
```

배열 역시 객체이므로 `for...in` 을 사용할 수는 있지만, 배열에는 절대 쓰 지 마 라 !!!
그 이유는 다음과 같다.

1. for in 은 모든 프로퍼티를 대상으로 순회함. 즉, 키가 숫자가 아닌 프로퍼티도 순회 대상에 포함된다. 이런 프로퍼티들이 문제를 일으킬 가능성이 있다.
2. 최적화 문제 - for in 은 객체와 함께 사용할 때 최적화되어있다. 배열에 사용하면 객체에 사용하는 것 대비 10~100배 느림.



## 5.5) [Array methods](https://javascript.info/array-methods)

### 배열의 요소 추가와 제거

`splice` : 원본 배열을 수정하는 메서드. 배열에 요소 추가, 삭제, 교체를 할 수 있다.

`slice` : 원본 배열을 수정하지 않으면서 서브 배열을 반환한다. `arr.slice()` 처럼 인수를 하나도 넘기지 않으면 원본 배열을 복사한다.

`concat` : 배열들을 합쳐서 새로운 배열을 만들때, 기존 배열에 요소를 추가할 때

`forEach` : 주어진 콜백함수를 배열 요소 각각에 대해 실행. 반환값은 무시된다. 파라미터로 index 값을 사용할 수 있다. 

### 배열 탐색하기

#### indexOf, includes

문자열 인덱스와 하는 일이 동일하다. 다만, 아래 인덱스들은 요소를 찾을 때 완전 항등 연산자 `===` 를 사용한다.

- `arr.indexOf(item, from)` : 인덱스 `from`부터 시작해 `item(요소)`을 찾는다. 요소를 발견하면 해당 요소의 인덱스를 반환하고, 발견하지 못했으면 `-1`을 반환.

- `arr.lastIndexOf(item, from)`:  indexOf랑 동일하나, 검색을 끝에서부터 시작한다는 점만 다름.

- `arr.includes(item, from)` :  인덱스 `from`부터 시작해 `item`이 있는지를 검색하는데, 해당하는 요소를 발견하면 `true`를 반환, 없으면 `false` 를 반환. (인덱스는 중요치않고 배열에 해당 원소의 존재 유무만 중요할 때 사용)

#### find, findIndex

객체로 구성된 배열에서, 특정 조건에 부합하는 객체를 찾으려면? **find** 와 **findIndex** 메서드가 있다.

```js
let users = [
  {id: 1, name: "John"},
  {id: 2, name: "Pete"},
  {id: 3, name: "Mary"}
];

let user = users.find(item => item.id == 1); // {id: 1, name: "John"}
console.log(user.name); // John
```

findIndex는 인덱스를 반환, 조건에 맞는 요소가 없으면 `-1` 반환.

#### filter

위의 메서드들은 다 조건에 맞는 첫번째 요소를 반환하는데, 조건에 맞는 요소가 여러개라면 fiilter을 사용하면 된다. filter은 find와 문법이 유사하지만, 조건에 맞는 **요소 전체를 담은 배열**을 반환한다.

```js
let users = [
  {id: 1, name: "John"},
  {id: 2, name: "Pete"},
  {id: 3, name: "Mary"}
];

// 앞쪽 사용자 두 명을 반환
let someUsers = users.filter(item => item.id < 3);

alert(someUsers.length); // 2
```

### 배열 변형하기

#### map

배열 요소 전체를 대상으로 함수를 호출하고, 함수 호출 결과를 새로운 배열로 반환.

#### sort

무조건 사전편집 순으로 요소(숫자,문자열,객체...)를 정렬함에 주의. 원하는 대로 정렬하려면 기준을 넘겨주어야 한다.

```js
// 정렬 함수에서 첫번째 인수가 두번째 인수보다 크다면 양수반환, 아니라면 음수반환 해주면 됨.
// compareNumeric은 오름차순 정렬
function compareNumeric(a, b) {
  if (a > b) return 1;
  if (a == b) return 0;
  if (a < b) return -1;
}

function compare(a,b) {
  // a가 b보다 작으면 음수반환 (b가 먼저 옴), a가 b보다 크면 양수 반환 (a가 먼저 옴)
  // 얘도 오름차순 정렬
  return a-b;
}

let arr = [ 1, 2, 15 ];

arr.sort(compareNumeric);

alert(arr);  // 1, 2, 15
```

#### reverse

원본 배열을 역순으로 정렬해서 반환함.

#### split, join

split은 문자열을 배열로, join은 배열을 문자열로.

```js
let str = "test";
console.log(str.split('')); // t,e,s,t
let arr = ['Bilbo', 'Gandalf', 'Nazgul'];
let str = arr.join(';');
console.log(str); // Bilbo;Gandalf;Nazgul
```

#### reduce

**배열을 기반으로 값 하나를 도출할 때** 사용한다.



## 5.6) [Iterables](https://javascript.info/iterable)



## 5.7) [Map and Set](https://javascript.info/map-set)



## 5.8) [WeakMap and WeakSet](https://javascript.info/weakmap-weakset)



## 5.9) [Object.keys, values, entries](https://javascript.info/keys-values-entries)



## 5.10) [Destructuring assignment](https://javascript.info/destructuring-assignment)



## 5.11) [Date and time](https://javascript.info/date)



## 5.12) [JSON methods, toJSON](https://javascript.info/json)



