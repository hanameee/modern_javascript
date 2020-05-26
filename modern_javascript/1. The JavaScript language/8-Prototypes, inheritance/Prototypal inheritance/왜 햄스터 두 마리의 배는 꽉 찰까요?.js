let hamster = {
    stomach: [],

    eat(food) {
<<<<<<< HEAD
        this.stomach += [food]; // 이걸 그냥 push로 해버리면 모든 객체가 hamster의 stomach 속성을 공유하게 된다.
=======
        this.stomach += [food];
>>>>>>> Update part 1.8 - Prototype
    },
};

let speedy = {
    __proto__: hamster,
};

let lazy = {
    __proto__: hamster,
};

<<<<<<< HEAD
speedy.eat("apple");
console.log(speedy.stomach);
console.log(lazy.stomach);
=======
// 햄스터 한 마리가 음식을 찾았습니다.
speedy.eat("apple");
console.log(speedy.stomach); // apple

// 이 햄스터도 같은 음식을 가지고 있습니다. 왜 그럴까요? 고쳐주세요.
console.log(lazy.stomach); // apple
>>>>>>> Update part 1.8 - Prototype
