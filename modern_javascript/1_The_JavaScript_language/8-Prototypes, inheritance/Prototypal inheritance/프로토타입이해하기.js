let animal = {
    jumps: null,
};
let rabbit = {
    __proto__: animal,
    jumps: true,
};

alert(rabbit.jumps); // true - rabbit에서 가져옴

delete rabbit.jumps;

alert(rabbit.jumps); // null - animal에서 가져옴

delete animal.jumps;

alert(rabbit.jumps); // undefined - 더 이상 프로퍼티를 찾을 수 없음
