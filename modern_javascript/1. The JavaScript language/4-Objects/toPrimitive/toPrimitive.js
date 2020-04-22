// 자바스크립트의 Symbol.toPrimitive 내장 심볼을 사용해 목표로 하는 자료형을 명명할 수 있다
// 직접 user 객체에 객체-원시형 변환 메서드를 구현해보자
let user = {
    name: "John",
    money: 1000,

    [Symbol.toPrimitive](hint) {
        alert(`hint: ${hint}`);
        return hint == "string" ? `{name: "${this.name}"}` : this.money;
    },
};

// 메서드 하나로 모든 종류의 형 변환을 다룰 수 있음
alert(user); // hint: string -> {name: "John"}
alert(+user); // hint: number -> 1000
alert(user + 500); // hint: default -> 1500
