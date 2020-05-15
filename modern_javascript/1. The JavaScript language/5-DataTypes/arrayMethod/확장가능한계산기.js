class Calculator {
    constructor() {
        this.methods = {
            "-": (a, b) => a - b,
            "+": (a, b) => a + b,
        };
    }

    calculate(str) {
        const arr = str.split(" ");

        const a = +arr[0];
        const op = arr[1];
        const b = +arr[2];

        if (!this.methods[op] || isNaN(a) || isNaN(b)) {
            return NaN;
        }
        return this.methods[op](a, b);
    }

    addMethod(name, func) {
        this.methods.name = func;
    }
}

let calc = new Calculator();
console.log(calc.calculate("3 + 7"));
