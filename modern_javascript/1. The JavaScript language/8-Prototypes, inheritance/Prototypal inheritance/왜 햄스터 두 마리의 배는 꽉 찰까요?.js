let hamster = {
    stomach: [],

    eat(food) {
        this.stomach += [food]; // 이걸 그냥 push로 해버리면 모든 객체가 hamster의 stomach 속성을 공유하게 된다.
    },
};

let speedy = {
    __proto__: hamster,
};

let lazy = {
    __proto__: hamster,
};

speedy.eat("apple");
console.log(speedy.stomach);
console.log(lazy.stomach);
