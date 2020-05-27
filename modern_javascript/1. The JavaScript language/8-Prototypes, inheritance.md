# [Prototypes, inheritance](https://javascript.info/prototypes)

## 8.1) [Prototypal inheritance](https://javascript.info/prototype-inheritance)

자바스크립트의 고유 기능인 프로토타입 상속 (prototypal inheritance) 을 이용하면 상속을 실현할 수 있다.

### [[Prototype]]

자바스크립트의 객체는 `[[Prototype]]` 이라는 숨김 프로퍼티를 갖는다. 이 숨김 프로퍼티 값은 `null` 이거나 다른 객체를 참조하는데, 다른 객체를 참조하는 경우 참조 대상을 프로토타입(prototype)이라고 부른다.

<img src="8-Prototypes, inheritance.assets/image-20200526220645317.png" alt="image-20200526220645317" style="zoom:50%;" />

어떤 객체에서 프로퍼티를 읽으려고 하는데, 해당 프로퍼티가 없으면 자바스크립트는 자동으로 프로토타입에서 프로퍼티를 찾는다. 이런 동작 방식을 프로토타입 상속이라고 부른다.

`[[Prototype]]` 프로퍼티는 숨김 프로퍼티이지만, 다양한 방법을 통해 개발자가 값을 설정할 수 있다. `__proto__` 를 통해 `[[Prototype]]` 프로퍼티를 읽어오고, 설정해올 수 있다. (getter 이자 setter)

```js
let animal = {
  eats: true
}

let rabbit = {
  jumps: true
}

rabbit.__proto__ = animal
```

**정리하자면, `__proto__` 는 `[[Prototype]]` 용 getter, setter 이다.**

최근에는 `__proto__` 대신  `Object.getPrototypeOf`나 `Object.setPrototypeOf`을 써서 프로토타입을 획득(get)하거나 설정(set) 한다고 한다. 그 이유는 다음 챕터에서 알아볼 것!

```js
let animal = {
  eats: true
  walk() {
    alert("걷는댜")
  }
};

let rabbit = {
  jumps: true
  __proto__: animal
};

let longEar = {
  earLength: 10,
  __proto__: rabbit
};


// 이제 animal의 프로퍼티인 eats를 rabbit에서도 사용 가능
alert( rabbit.eats ); // true
longEar.walk(); // 걷는댜
```

- rabbit의 prototype은 animal이다.
- rabbit은 animal을 상속받는다.

라고 말할 수 있음!

<img src="8-Prototypes, inheritance.assets/image-20200526223504226.png" alt="image-20200526223504226" style="zoom:50%;" />

프로토타입 체인은 위처럼 길어질 수 있다.

#### 프로토타입 체이닝의 제약사항

1. 순환참조는 허용되지 않는다. `__proto__` 를 이용해 닫힌 형태로 다른 객체를 참조하면 에러가 발생한다.
2. `__proto__` 의 값은 언제나 객체나 null만 가능하다. 다른 자료형은 무시된다.
3. 객체엔 오직 하나의 [[Prototype]] 만 있을 수 있다. 하나 이상의 객체는 상속받지 못한다.

### 값을 쓸 때는 프로토타입을 사용하지 않는다.

프로토타입은 **프로퍼티를 읽을 때만 사용**한다. 프로퍼티를 추가, 수정, 삭제하는 연산은 객체에 직접 해야 한다.

```js
let animal = {
  eats: true,
  walk() {
    /* rabbit은 이제 이 메서드를 사용하지 않습니다. */
  }
};

let rabbit = {
  __proto__: animal
};

rabbit.walk = function() {
  alert("토끼가 깡충깡충 뜁니다.");
};

rabbit.walk(); // 토끼가 깡충깡충 뜁니다.
```

rabbit.walk() 를 호출하면 프로토타입 (animal) 에 있는 메서드가 실행되는 것이 아니라, 객체 rabbit에 추가한 메서드가 실행된다.

단, 접근자 프로퍼티(get, set 으로 표현되는 프로퍼티)는 이 규칙이 적용되지 않는다. 접근자 프로퍼티는 setter 함수를 호출해서 프로퍼티에 값을 할당하기 때문이다.

접근자 프로퍼티에 값을 할당하는 것은 함수를 호출하는 것과 같으므로, 자식 객체에서 접근자 프로퍼티에 값을 할당하면, 자식 객체에 프로퍼티가 추가되는 것이 아니라 프로토타입의 setter 함수를 호출한다.

```js
let user = {
  name: "John",
  surname: "Smith",

  set fullName(value) {
    [this.name, this.surname] = value.split(" ");
  },

  get fullName() {
    return `${this.name} ${this.surname}`;
  }
};

let admin = {
  __proto__: user,
  isAdmin: true
};

alert(admin.fullName); // John Smith (*)

// 프로토타입의 setter 함수가 실행된다.
admin.fullName = "Alice Cooper"; // (**)
```

### this 가 나타내는 것

```js
set fullName(value) {
  [this.name, this.surname] = value.split(" ");
},
  
// ...

admin.fullName = "Alice Cooper"; // (**)
```

위 코드에서 setter의 this엔 어떤 값이 들어갈까? 바로 admin이다.

왜냐면 this는 프로토타입에 영향을 받지 않기 때문이다! **메서드를 객체에서 호출했든, 프로토타입에서 호출했든 상관없이 this는 언제나 `.` 앞에 있는 객체가 된다.**

즉, **상속받은 메서드를 사용하더라도 객체는 프로토타입이 아닌 자신의 상태를 수정한다.**

```js
let animal = {
  walk() {
    if (!this.isSleeping) {
      alert(`동물이 걸어갑니다.`);
    }
  },
  sleep() {
    this.isSleeping = true;
  }
};

let rabbit = {
  name: "하얀 토끼",
  __proto__: animal
};

// rabbit의 프로퍼티 isSleeping을 true로 변경합니다.
rabbit.sleep();

alert(rabbit.isSleeping); // true
alert(animal.isSleeping); // undefined (프로토타입에는 isSleeping이라는 프로퍼티가 없음)
```

rabbit이 아닌 다른 어떤 객체가 animal로부터 메소드를 상속받더라도, this에는 프로토타입(animal)이 아닌 해당 객체의 상태가 들어가 변화한다.

**즉, 메서드는 공유되지만 객체의 상태는 공유되지 않는다.**

### for...in 반복문

객체에 직접 구현된 키만 반환하는 Object.keys와는 달리, for...in 반복문은 상속 프로퍼티도 순회대상에 포함시킨다.

```js
let animal = {
  eats: true
};

let rabbit = {
  jumps: true,
  __proto__: animal
};

// Object.keys는 객체 자신의 키만 반환함
alert(Object.keys(rabbit)); // jumps

// for..in은 객체 자신의 키와 상속 프로퍼티의 키 모두를 순회함
for(let prop in rabbit) alert(prop); // jumps, eats
```

또, obj.hasOwnProperty(key) 는 상속 프로퍼티가 아니라 obj에 직접 구현되어 있는 프로퍼티일 때 true를 반환한다.

+) 정리하자면,  `Object.keys`를 비롯하여 객체의 프로퍼티를 반환하는 메서드들은 객체가 ‘직접 소유한’ 프로퍼티만 반환한다. 상속 프로퍼티는 `for..in`을 사용해 얻을 수 있다.

#### obj.hasOwnProperty(key) 응용

```js
let animal = {
  eats: true
};

let rabbit = {
  jumps: true,
  __proto__: animal
};

for(let prop in rabbit) {
  let isOwn = rabbit.hasOwnProperty(prop);

  if (isOwn) {
    alert(`객체 자신의 프로퍼티: ${prop}`); // 객체 자신의 프로퍼티: jumps
  } else {
    alert(`상속 프로퍼티: ${prop}`); // 상속 프로퍼티: eats
  }
}
```

위 예시의 상속 관계는 아래와 같다.

rabbit은 animal을, animal은 Object.prototype을, Object.prototype은 null을 상속받고 있다. (Object.prototype은 프로토타입 체인의 끝)

<img src="8-Prototypes, inheritance.assets/image-20200526232243171.png" alt="image-20200526232243171" style="zoom:50%;" />

animal이 Object.prototype을 상속 받는 이유는 객체 리터럴 방식으로 선언했기 때문이다. **객체 리터럴**을 사용해 객체를 생성한 경우, 그 객체의 프로토타입 객체는 **Object.prototype**이다. (객체 리터럴 방식은 결국 Object() 생성자 함수를 사용해서 객체를 만드는 방법의 축약 표현이므로)

+) **생성자 함수**를 통해 객체를 생성한 경우, 그 객체의 프로토타입 객체는 **생성자함수이름.prototype**이다.

단, Object.prototype에 있는 모든 메서드의 `enumerable` (열거 가능) flag는 false이기에, for..in으로 순회했을 때 모든 객체가 Object.prototype을 상속받음에도 불구하고 Object.prototype의 메서드는 순회 대상에 포함되지 않는다.

### 요약

- 자바스크립트의 모든 객체엔 `[[Prototype]] ` 숨김 프로퍼티가 있는데, 이 프로퍼티는 객체나 `null` 을 가리킨다. 이 `[[Prototype]] ` 이 참조하는 객체를 **프로토타입**이라고 한다.
- `obj.__proto__` 를 쓰면 프로토타입에 접근할 수 있으며 `obj.__proto__` 는 `[[Prototype]] ` 의 getter, setter 으로 사용되나 요즘엔 잘 쓰지 않는다.
- obj에서 프로퍼티를 읽거나 메서드를 호출하려는데 해당 프로퍼티/메서드가 없으면 자바스크립트는 프로토타입 체인을 거슬러 올라가며 해당 프로퍼티/메서드를 찾는다.
- 접근자 프로퍼티가 아닌 데이터 프로퍼티를 다루고 있다면, 읽기를 제외한 연산 (추가, 수정, 삭제) 은 프로토타입을 통하지 않고 객체에 직접 적용된다.
- 프로토타입에서 상속받은 메서드라도 obj.method() 를 호출하면 method 안의 this는 호출 대상 객체인 obj를 가리킨다.



## 8.2) [F.prototype](https://javascript.info/function-prototype)

객체 리터럴로 객체를 생성하지 않고, 생성자 함수로 (`new F()`) 객체를 생성할 경우, **F.prototype**이 객체면 new 연산자는 **F.prototype**을 사용해 새롭게 생성된 객체의 [[Prototype]] 을 설정한다.

F.prototype에서 prototype은 F에 정의된 일반 프로퍼티이며, new F를 호출할 때만 사용된다.

```js
let animal = {
  eats: true
};

function Rabbit(name) {
  this.name = name;
}

Rabbit.prototype = animal;

let rabbit = new Rabbit("White Rabbit"); //  rabbit.__proto__ == animal

alert( rabbit.eats ); // true
```



<img src="8-Prototypes, inheritance.assets/image-20200527115754008.png" alt="image-20200527115754008" style="zoom:50%;" />

새로운 객체가 만들어진 후 F.prototype이 바뀌면, new F 로 만들어지는 새로운 객체는 변경된 객체를 [[Prototype]] 으로 갖게 된다. 다만, 기존에 만들어진 객체의 [[Prototype]] 은 그대로 유지된다.

### 함수의 prototype 프로퍼티와 constructor 프로퍼티

모든 함수는 prototype 프로퍼티를 갖는다.

prototype의 기본값은 constructor 프로퍼티 하나만 있는 객체를 가리키는데, 이 constructor 프로퍼티의 값은 함수 자신이다.

```js
function Rabbit(){}

/* 기본 prototype
Rabbit.prototype = { constructor: Rabbit };
*/

alert( Rabbit.prototype.constructor == Rabbit ); // true
```

<img src="8-Prototypes, inheritance.assets/image-20200527120916459.png" alt="image-20200527120916459" style="zoom:50%;" />

따라서 prototype을 변경하지 않았다면, new Rabbit 으로 만들어진 객체 모두에서 constructor 프로퍼티를 사용할 수 있다.

new Rabbit 으로 만들어진 객체는 자동으로 [[Prototype]] 으로 Rabbit.prototype 을 가르키게 되고, Rabbit.prototype은 기본으로 constructor 값으로 Rabbit 을 가르키기 때문이다.

```js
function Rabbit(){}

let rabbit = new Rabbit(); // {constructor: Rabbit}을 상속받음

alert(rabbit.constructor == Rabbit); // true (프로토타입을 거쳐 접근함)
```

<img src="8-Prototypes, inheritance.assets/image-20200527121130744.png" alt="image-20200527121130744" style="zoom:50%;" />

이 constructor 프로퍼티를 사용하면 기존 객체의 생성자를 모르더라도, constructor 을 사용해 새로운 객체를 만들 수 있다.

```js
function Rabbit(name) {
  this.name = name;
  alert(name);
}

let rabbit = new Rabbit("White Rabbit");

let rabbit2 = new rabbit.constructor("Black Rabbit");
```

다만, 자바스크립트는 알맞은 constructor 값을 보장하지 않는다. 함수에 기본값으로 prototype 값이 설정되긴 하지만, 기본값일 뿐 다른 객체로 prototype을 바꿀 수 있기 때문이다.

따라서 알맞은 constructor을 유지하려면 prototype을 덮어쓰는 것이 아니라 원하는 프로퍼티를 추가해야 한다. 아니면 constructor 프로퍼티를 수동으로 다시 만들어줘야 한다.

```js
function Rabbit() {}

// Rabbit.prototype 전체를 덮어쓰지 말고
// 원하는 프로퍼티를 추가하는 방법
Rabbit.prototype.jumps = true

// constructor 프로퍼티를 수동으로 만들어주는 방법
Rabbit.prototype = {
  jumps: true,
  constructor: Rabbit
};
```

### 요약

- F.prototype은 new F() 를 호출할 때 만들어지는 새로운 객체의 [[Prototype]] 을 설정한다.
- F.prototype의 값은 객체나 null만 가능하고, 다른 값은 무시된다.
- 모든 함수는 기본적으로 `F.prototype = { constructor : F }`를 가지고 있으므로 함수의 `"constructor"` 프로퍼티를 사용하면 객체의 생성자를 얻을 수 있다.



## 8.3) [Native prototypes](https://javascript.info/native-prototypes)

### Object.prototype

Object는 내장 객체 생성자 함수인데, Object.prototype은 toString을 비롯해 다양한 메서드가 구현되어 있는 거대한 객체를 참조한다.

<img src="8-Prototypes, inheritance.assets/image-20200527153555408.png" alt="image-20200527153555408" style="zoom:50%;" />

`new Object()` 또는 리터럴 문법으로 객체를 만들면, 만들어진 객체의 [[Prototype]] 은 **Object.prototype**을 참조한다.

따라서 만들어진 자식 객체(obj)들은 obj.toString() 처럼 Object.prototype의 메서드들을 가져와 활용할 수 있다.

### 다른 내장 프로토타입

Array, Date, Function 등의 내장 객체들 역시 프로토타입에 메서드를 저장해 놓는다.

예를 들어, 배열 `[1,2,3]` 을 만들면 기본 new Array() 생성자가 내부에서 사용되기에 Array.prototype이 배열 `[1,2,3]` 의 프로토타입이 된다. 따라서 배열 `[1,2,3]` 은 Array.prototype의 배열 메서드를 활용할 수 있다.

모든 내장 프로토타입들의 꼭대기에는 Object.prototype이 있다. 아래의 그림과 같다.

<img src="8-Prototypes, inheritance.assets/image-20200527124554882.png" alt="image-20200527124554882" style="zoom:50%;" />

**Object.prototype은 모든 프로토타입 체인의 끝**으로 Object.prototype의 [[Prototype]] 은 null이다.

```js
let arr = [1, 2, 3];

// arr은 Array.prototype을 상속받음
alert( arr.__proto__ === Array.prototype ); // true

// arr은 Object.prototype을 상속받음
alert( arr.__proto__.__proto__ === Object.prototype ); // true

// 체인 맨 위엔 null이 있음
alert( arr.__proto__.__proto__.__proto__ ); // null
```

체인 상의 프로토타입엔 중복 메서드가 있을 수 있는데, 이 때는 **체인 상에서 더 가까운 메서드가 사용**된다.

`console.dir` 을 사용하면 내장 객체의 상속 관계를 확인할 수 있다.

### 원시값

문자열, 숫자, 불린값 등의 원시값은 객체가 아니다. 이런 원시값들의 프로퍼티에 접근하려고 하면 내장 생성자 `String`, `Number`, `Boolean`을 사용하는 임시 래퍼 객체가 생성된다. 임시 래퍼 객체는 이런 메서드를 제공하고 난 후에 사라진다.

각 자료형에 해당하는 래퍼 객체의 메서드는  `String.prototype`, `Number.prototype`, `Boolean.prototype` 과 같이 프로토타입 안에 구현되어 있다.

### 네이티브 프로토타입 변경

 `String.prototype` 과 같은 네이티브 프로토타입에 메서드를 하나 추가하면, 모든 문자열에서 해당 메서드를 사용할 수 있다. 그러나 이렇게 네이티브 프로토타입을 직접 수정하는 것은 바람직하지 않으며, 허용되는 경우는 오직 폴리필을 직접 구현해 내장 프로토타입에 추가할 때만이다.

### 프로토타입에서 빌려오기

네이티브 프로토타입에 구현된 메서드를 빌려서 사용할 수 있다.

예를 들어, 유사 배열 객체에 Array.prototype의 메서드를 빌려서 쓸 수 있다.

```js
let obj = {
  0: "Hello",
  1: "world!",
  length: 2,
};

obj.join = Array.prototype.join;
// 배열의 내장 메서드 join의 내부 알고리즘은 제대로 된 인덱스, length 프로퍼티만 확인한다.
alert( obj.join(',') ); // Hello,world!
```

위처럼 메서드를 지정해서 빌려올 수도 있고, `obj.__proto__`를 `Array.prototype`로 설정해 모든 Array 메서드를 사용할 수도 있다.



## 8.4) [Prototype methods, objects without \__proto__](https://javascript.info/prototype-methods)

`__proto__` 는 다소 구식이다. 아래와 같은 모던한 메서드들을 사용하는 것이 좋다.

- Object.create(proto[, descriptors]) - [[Prototype]] 이 proto 를 참조하는 빈 객체를 만든다.
- Object.getPrototypeOf(obj) - obj의 [[Prototype]] 을 반환한다.
- Object.setPrototypeOf(obj, proto) - obj의 [[Prototype]] 이 proto 가 되도록 설정한다.

```js
let animal = {
  eats: true
}

// 프로토타입이 animal인 새로운 객체를 생성한다
let rabbit = Object.create(animal);

console.log(rabbit.eats); // true

console.log(Object.getPrototypeOf(rabbit) === animal); // true

Object.setPrototypeOf(rabbit, {}) // rabbit의 prototype을 {} 로 바꾼다.
```

Object.create 에는 프로퍼티 설명자를 선택적으로 전달할 수 있다.

```js
let animal = {
  eats: true
};

let rabbit = Object.create(animal, {
  jumps: {
    value: true
  }
})

console.log(rabbit.jumps) // true
```

Object.create를 호출하면, for in 을 통해 프로퍼티를 복사하는 것보다 더 효과적으로 얕은 사본을 만들어낼 수 있다.

```js
// obj와 완벽하게 동일한 얕은 사본
let clone = Object.create(Object.getPrototypeOf(obj), Object.getOwnPropertyDescriptors(obj));
```

 `obj`의 모든 프로퍼티를 포함한 완벽한 사본이 만들어진다. 사본엔 `[[Prototype]]` 을 비롯한 열거 가능한 프로퍼티와 불가능한 프로퍼티, 데이터 프로퍼티, getter, setter 등 모든 프로퍼티가 복제된다. 

⚠️ 주의할 점: 가급적 객체를 생성할 때만 `[[Prototype]]` 을 설정하고, 이후에는 프로토타입을 바꾸지 않는 것이 좋다. 프로토타입을 그때 그때 바꾸면 객체 프로퍼티 접근 관련 최적화를 망치기 때문!

### '아주 단순한' 객체

객체는 키-값 쌍을 저장할 수 있는 자료구조다. 그런데, `__proto__` 는 키로 사용할 수 없음!

해결 방법 1) 객체 대신 map을 사용한다
해결 방법 2) `Object.create(null)`을 사용해 프로토타입이 없는 빈 객체를 만든다

 `__proto__`는 객체의 프로퍼티가 아니라 `Object.prototype`의 접근자 프로퍼티이기 때문에, Object.prototype을 상속받지 않으면 된다.

`Object.create(null)`로 객체를 만들면 `__proto__` getter와 setter를 상속받지 않고, 이제 `__proto__`는 평범한 데이터 프로퍼티처럼 처리된다.

이런 객체를  ‘아주 단순한(very plain)’ 혹은 ‘순수 사전식(pure dictionary)’ 객체라고 부른다.

이런 객체는 `toString` 과 같은 내장 메서드가 없다는 단점이 있지만, 객체 관련 메서드 대부분은 Object.prototype이 아니라 Object.something(...) 에 있기 때문에 사용할 수 있다.

```js
let chineseDictionary = Object.create(null);
chineseDictionary.hello = "你好";
chineseDictionary.bye = "再见";

console.log(Object.keys(chineseDictionary)); // hello,bye
```

이처럼 아주 단순한 객체는 순수 사전처럼 사용되며, `__proto__` 를 키로 사용해도 문제를 일으키지 않는다.