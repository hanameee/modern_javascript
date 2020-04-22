// this는 객체가 어떻게 선언되었는지를 보지 않음. 그저 호출되는 순간이 중요할 뿐임.
function makeUser_error() {
    return {
        name: "John",
        ref: this, // 이 this는 그냥 이 makeUser_error 함수의 this (= undefined)를 가져온다. 메서드로 호출된 것이 아니라 그냥 함수로 호출된 것임.
    };
}

let user = makeUser_error();

alert(user.ref.name); // Error: Cannot read property 'name' of undefined
// makeUser_error이 객체 리터럴을 반환하건 뭣이건 상관 없이 this는 그냥 함수 자체의 this를 가져온다. (메서드로 호출된게 아니니까)

// 위 예제는 눈속임같은 것이고 사실상 아래 코드와 별 다른 차이가 없는 것
function makeUser_error2() {
    return this; // this time there's no object literal
}

alert(makeUser_error2().name); // Error: Cannot read property 'name' of undefined

// 우리가 원하는 동작처럼 되게 하려면 아래처럼 ref를 메서드로 작성해야 한다.
function makeUser() {
    return {
        name: "John",
        ref() {
            return this;
        },
    };
}

let user = makeUser();

alert(user.ref().name); // John
// 이제 user.ref()는 메서드이기 때문에 . 앞의 객체인 user에 대한 정보를 가져와 this로 설정한다.
