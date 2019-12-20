// #1. 객체 비구조화 할당
const hannah = {
    name: "해나",
    age: 25,
    id: "hannahbanana"
};

const jeongho = {
    name: "정호",
    age: 26,
    id: "njhnjh"
};

function print(person) {
    // also called as 객체 구조 분해
    const { name, age, id } = person;
    const text = `${name} 은 ${age} 살이고, 아이디는 ${id} 입니다.`;
    console.log(text);
}

// 파라미터 단계에서도 가능 - 보다 간결!
function print2({ name, age, id }) {
    const text = `${name} 은 ${age} 살이고, 아이디는 ${id} 입니다.`;
    console.log(text);
}

print(hannah);
print2(jeongho);

// #2. 객체 안에 함수 넣기

const dog = {
    name: "멍멍이",
    sound: "멍멍!",
    // 객체 안에 함수를 넣을땐 함수명을 선언하지 않아도 되며, 함수 내 this는 자신이 속해있는 객체를 가르킴.
    // 화살표 함수로 넣을 시 this는 자신이 속해있는 객체를 가르키지 않음. arrow function은 this키워드를 redefine하기에!
    say: function say() {
        console.log(this.sound);
    }
};

dog.say(); // 멍멍!

// #3. Constructor Function - 대문자로 시작
function Dog(name, sound) {
    this.name = name;
    this.sound = sound;
    this.say = function say() {
        console.log(this.sound);
    };
}

let dog1 = new Dog("왈왈이", "왈왈!");
dog1.say();
