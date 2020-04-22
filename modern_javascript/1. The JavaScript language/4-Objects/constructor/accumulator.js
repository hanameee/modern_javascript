function Accumulator(startingValue) {
    this.value = startingValue;
    this.read = function () {
        num = +prompt("number?", 0);
        this.value += num;
    };
}

let accumulator = new Accumulator(1);
accumulator.read();
accumulator.read();
alert(accumulator.value);
