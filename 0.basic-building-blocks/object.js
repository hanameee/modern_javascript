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
