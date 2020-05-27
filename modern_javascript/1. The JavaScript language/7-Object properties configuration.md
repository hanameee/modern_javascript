# [Object properties configuration](https://javascript.info/object-properties)

## 7.1) [Property flags and descriptors](https://javascript.info/property-descriptors)

객체의 프로퍼티에는 단순 키-값 외에도 추가적인 옵션들이 있다.

### 프로퍼티 플래그

객체 프로퍼티는 값과 함께, flag라 불리는 특별한 속성 세가지를 갖는다.

- **`writable`** – `true`면 프로퍼티의 값을 수정할 수 있다. `false`면 읽기만 가능하다.
- **`enumerable`** – `true`면 반복문을 사용해 나열할 수 있습니다. `false`면 반복문을 사용해 나열할 수 없다.
- **`configurable`** – `true`이면 **프로퍼티 삭제나 플래그 수정**이 가능하다. `false`면 프로퍼티 삭제와 플래그 수정이 불가능하다.

평범한 방식으로 프로퍼티를 만들면 해당 프로퍼티의 플래그는 **모두 true**가 된다.

### 플래그 얻기

**Object.getOwnPropertyDescriptor** 메서드로 특정 프로퍼티에 대한 정보를 모두 얻을 수 있다.

```js
let descriptor = Object.getOwnPropertyDescriptor(obj, propertyName);
```

obj : 정보를 얻고자 하는 객체
propertyName : 정보를 얻고자 하는 객체 내의 프로퍼티

getOwnPropertyDescriptor 를 호출하면 프로퍼티 설명자 (descriptor) 라고 불리는 객체가 반환되는데, 여기에는 프로퍼티 값과 세 플래그에 대한 정보가 모두 담겨있다.

```js
let user = {
  name: "John"
};

let descriptor = Object.getOwnPropertyDescriptor(user, 'name');

alert( JSON.stringify(descriptor, null, 2 ) );
/* property descriptor:
{
  "value": "John",
  "writable": true,
  "enumerable": true,
  "configurable": true
}
*/
```

### 플래그 변경하기

**Object.defineProperty** 를 사용하면 플래그를 변경할 수 있다.

```js
Object.defineProperty(obj, propertyName, descriptor)
```

obj, propertyName : 설명자를 적용하고 싶은 객체와 객체 프로퍼티
descriptor : 적용하고자 하는 프로퍼티 설명자

defineProperty 메서드는 객체에 해당 프로퍼티가 있으면 플래그를 원하는 대로 변경해주고, 프로퍼티가 없으면 인수로 넘겨받은 정보를 이용해 새로운 프로퍼티를 만든다.

플래그 정보가 없으면 플래그 값은 자동으로 `false` 가 된다.



평범한 방식으로 객체 프로퍼티를 만들었을 때와, defineProperty로 프로퍼티를 만들었을 때의 가장 큰 차이점은 **플래그**이다. 전자는 모든 플래그가 true 로 설정되고, 후자는 descriptor에 플래그 값을 명시하지 않으면 값이 자동으로 false가 됨.

### writable

writable 플래그를 사용해 프로퍼티에 값을 쓰지 못하도록 변경할 수 있다.

```js
let user = {
  name: "John"
};

Object.defineProperty(user, "name", {
  writable: false
});

user.name = "Pete"; // Error: Cannot assign to read only property 'name'
```

defineProperty를 사용해 writable 플래그를 true로 변환하지 않는 한 객체의 name 프로퍼티 값을 변경할 수 없다.

### enumerable

특정 프로퍼티의 enumerable 플래그 값을 false로 설정하면 `for...in` 반복문에 나타나지 않게 할  수 있다. enumberable 플래그가 false인 프로퍼티는  `Object.keys` 에도 배제된다.

### configurable

configurable 플래그가 false로 설정되어 있으면 해당 프로퍼티는 객체에서 지울 수 없고, 수정할 수도 없다.

configurable 플래그를 false로 설정하면 defineProperty를 써도 값을 true로 되돌릴 수 없다.

`configurable:false`로 인해 구체적으로 변화하는 사항은 아래와 같다.

1. `configurable` 플래그를 수정할 수 없음
2. `enumerable` 플래그를 수정할 수 없음.
3. `writable: false`의 값을 `true`로 바꿀 수 없음 (`true`를 `false`로 변경하는 것은 가능함).
4. 접근자 프로퍼티 `get/set`을 변경할 수 없음 (새롭게 만드는 것은 가능함).

⚠️ **주의** - non-configurable은 non-writable과 다르다.

Configurable 플래그가 false 여도, writable 플래그가 true면 프로퍼티 값은 변경할 수 있다. **configurable:false 는 플래그 값 변경이나 프로퍼티 삭제를 막기 위해** 만들어졌지, 프로퍼티 값 변경을 막기 위해 만들어진 것이 아니다.

### 한 번에 여러개의 프로퍼티를 정의하기

**Object.defineProperties** 메서드를 사용하면 프로퍼티 여러개를 한번에 정의할 수 있다.

[문법]

```js
Object.defineProperties(obj, {
  prop1: descriptor1,
  prop2: descriptor2
  // ...
});
```

[예시]

```js
Object.defineProperties(user, {
  name: { value: "John", writable: false },
  surname: { value: "Smith", writable: false },
  // ...
});
```

### 모든 프로퍼티 설명자를 가져오기

**Object.getOwnPropertyDescriptors** 메서드를 사용하면 프로퍼티 설명자를 한꺼번에 가져올 수 있다.

이 메서드를 `Object.defineProperties`와 함께 사용하면 객체 복사 시 플래그도 함께 복사할 수 있다.

```js
let clone = Object.defineProperties({}, Object.getOwnPropertyDescriptors(obj));
```

아래처럼 for in으로 프로퍼티를 복사하는 방법으로는 플래그 까지는 복사할 수 없다.

```js
for (let key in user) {
  clone[key] = user[key]
}
```

객체의 플래그 정보까지 복사하려면 위처럼 Object.defineProperties 를 사용해야 한다.



## 7.2) [Property getters and setters](https://javascript.info/property-accessors)

