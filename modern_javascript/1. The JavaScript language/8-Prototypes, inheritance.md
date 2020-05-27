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



## 8.4) [Prototype methods, objects without \__proto__](https://javascript.info/prototype-methods)

