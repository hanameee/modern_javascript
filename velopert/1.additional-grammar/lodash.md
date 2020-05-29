# lodash [공식API](https://lodash.com/docs/4.17.15#groupBy)

## lodash란?

lodash는 JS 유틸리티 라이브러리이다. Array, Date, Number, Object, Collection ( = 배열, 객체) 관련 함수들이 있으며, 데이터를 쉽게 다룰 수 있도록 도와준다. 특히, JS 배열 안의 객체들의 값을 핸들링할 때 유용하다.



## Array 관련 자주 사용하는 함수

### \_.findIndex

함수형식: *.findIndex(array, [predicate=*.identity], [thisArg])
입력: object의 배열
출력: index의 number
관련함수: _.findLastIndex - 뒤에서 부터 일치하는 index를 반환한다.

```js
var users = [
  { 'user': 'barney',  'active': false },
  { 'user': 'fred',    'active': false },
  { 'user': 'pebbles', 'active': true },
  { 'user': 'barney',  'active': false }
];

// 두번째 파라미터가 콜백함수: 콜백함수를 실행해 처음 true가 나오는 index 값을 반환
_.findIndex(users, function(chr){
  return chr.user === "barney";
});
// 0

// 두번째 파라미터가 객체: 객체와 처음 일치하는 object의 index 값을 반환
_.findIndex(users, { 'user': 'fred', 'active': false });
// 1

// 두번째 파라미터가 key, value: 처음으로 해당 key와 value를 가진 index 값을 반환
_.findIndex(users, 'active', false);
// → 0

// 두번째 파라미터가 key : 해당 key를 가지고 value가 true인 index 값을 반환
_.findIndex(users, 'active');
// → 2
```



## Collection 관련 자주 사용하는 함수

### \_.reduce

함수형식: *.reduce(collection, [iteratee=*.identity], [accumulator], [thisArg])
입력: collection
출력: 계산한 결과 값
관련함수: _.reduceRight - 순서를 반대로 실행시키는 함수

```js
// 객체의 경우
// reduce는 콜백함수의 첫번째 인자로 전의 함수가 실행시킨 결과를 받는다.
// 그리고 함수가 모두 실행된 뒤에 결과를 반환한다.
_.reduce([1, 2], function(total, n) {
  return total + n;
});
// → 3

// 배열의 경우
_.reduce({ 'a': 1, 'b': 2 }, function(result, n, key) {
  result[key] = n * 3;
  return result;
}, {});
// → { 'a': 3, 'b': 6 }
```



### \_.Filter 
함수형식: .filter(collection, [predicate=.identity], [thisArg])
입력: collection
출력: 일치하는 값들의 배열

```js
// 두번째 파라미터가 콜백함수: 콜백함수를 실행하여 true를 반환하는 값들의 배열을 반환
_.filter([4, 5, 6], function(n) {
  return n % 2 == 0;
});
// → [4, 6]

var users = [
  { 'user': 'barney', 'age': 36, 'active': true },
  { 'user': 'fred',   'age': 40, 'active': false }
];

// 두번째 파라미터가 객체: 입력한 object의 key와 value들을 모두 포함하는 객체들을 배열로 반환
_.filter(users, { 'age': 36, 'active': true });
// → [{ 'user': 'barney', 'age': 36, 'active': true }]

// 두번째 파라미터와 key, value: 입력한 key와 value가 있는 객체들을 배열로 반환
_.filter(users, 'active', false);
// → [{ 'user': 'barney', 'age': 36, 'active': true }]

// 두번째 파라미터가 key: 입력한 key값이 true인 객체들을 배열로 반환
_.filter(users, 'active');
// → [{ 'user': 'barney', 'age': 36, 'active': true }]
```



## Reference

[Lodash 활용법]([https://gracefullight.dev/2016/12/25/Lodash-%ED%99%9C%EC%9A%A9%EB%B2%95/](https://gracefullight.dev/2016/12/25/Lodash-활용법/))
[lodash에 대해서 자주 사용하는 함수들](https://ithub.tistory.com/189)
[lodash 정리](http://kbs0327.github.io/blog/technology/lodash/)

