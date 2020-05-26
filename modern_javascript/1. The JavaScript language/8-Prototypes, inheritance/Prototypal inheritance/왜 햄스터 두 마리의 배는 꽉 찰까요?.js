let hamster = {
    stomach: [],

    eat(food) {
        this.stomach += [food];
    },
};

let speedy = {
    __proto__: hamster,
};

let lazy = {
    __proto__: hamster,
};

// 햄스터 한 마리가 음식을 찾았습니다.
speedy.eat("apple");
console.log(speedy.stomach); // apple

// 이 햄스터도 같은 음식을 가지고 있습니다. 왜 그럴까요? 고쳐주세요.
console.log(lazy.stomach); // apple
