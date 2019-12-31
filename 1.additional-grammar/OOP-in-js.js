// 객체 리터럴
var obj1 = {};
obj1.name = "Lee";

// Object() 생성자 함수
var obj2 = new Object();
obj2.name = "Lee";

// 생성자 함수
function F() {}
var obj3 = new F();
obj3.name = "Lee";

function Person(name) {
    this.name = name;
}

var foo = new Person("Lee");

console.dir(Person); // prototype 프로퍼티가 있다.
console.dir(foo); // prototype 프로퍼티가 없다.
