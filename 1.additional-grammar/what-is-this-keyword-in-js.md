참고 자료

- 1. [Poiemaweb - 함수 호출 방식에 의해 결정되는 this](https://poiemaweb.com/js-this)
- 2. [YouTube 영상](https://www.youtube.com/watch?v=h33Srr5J9nY)

---
# what is [this] keyword in js

```js
class Person {
    constructor(name) {
        this.name = name;
    }

    printNameArrowFunction() {
        setTimeout(() => {
            console.log("Arrow Function - " + this.name);
        }, 100);
    }

    printNameFunction() {
        setTimeout(function() {
            console.log("Normal Function - " + this.name);
        }, 100);
    }
}

let person = new Person("Hannah");

person.printNameArrowFunction(); // Arrow Function - Hannah
person.printNameFunction(); // Normal Function - 

console.log("hi");

```

## Normal Function

`this` is defined from where the **function is called!**

Normal JS function은 called 된 scope 로 this 를 redefine 한다. 즉, [함수 호출 방식](함수 호출 방식)에 의해 `this`에 어떤 객체를 바인딩 할 것인지가 동적으로 결정된다. 다시 말해, 함수를 선언할 때 this에 바인딩할 객체가 정적으로 결정되는 것이 아니고, **함수를 호출할 때 함수가 어떻게 호출되었는지에 따라** this에 바인딩할 객체가 동적으로 결정된다.

위의 예제의  person.printNameFunction() 실행 결과에서 this.name 이 undefined 인 이유는 함수가 called 된 global scope에서 this 를 찾았기 때문이다. 

## Arrow Function

`this` is same from where the **function is defined!**

arrow function 은 normal function 처럼 called 되는 scope에 따라 this 를 redefine 하지 않는다. 대신, 함수가 선언된 scope와 동일한 scope에서 this가 결정된다.

위의 예제의 person.printNameArrowFunction() 실행 결과에서 this.name 이 hannah 인 이유는 function이 defined 된 scope인 Person class 와 동일한 scope를 가지기 때문이다 :)