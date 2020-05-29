// 메서드 체이닝을 가능하게 하려면 메서드를 호출할 때마다 객체 자신을 반환하게 하면 된다
let ladder = {
    step: 0,
    up() {
        this.step++;
        return this;
    },
    down() {
        this.step--;
        return this;
    },
    showStep: function () {
        alert(this.step);
    },
};
