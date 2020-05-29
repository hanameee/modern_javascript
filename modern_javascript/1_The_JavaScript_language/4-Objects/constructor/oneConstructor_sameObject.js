obj = {};

// 두 생성자 함수 모두 this 대신에 객체를 명시적으로 return하게 하면 가능하다
function A() {
    return obj;
}
function B() {
    return obj;
}

let a = new A();
let b = new B();

console.log(a == b);
