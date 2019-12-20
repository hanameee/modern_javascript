// 출처: https://www.youtube.com/watch?v=h33Srr5J9nY
class Person {
    constructor(name) {
        this.name = name;
    }

    printNameArrowFunction() {
        setTimeout(() => {
            console.log("Arrow Function - " + this.name);
        }, 100);
    }

    printNameFunction() {
        setTimeout(function() {
            console.log("Normal Function - " + this.name);
        }, 100);
    }
}

let person = new Person("Hannah");

person.printNameArrowFunction(); // Arrow Function - Hannah
person.printNameFunction(); // Normal Function -

console.log("hi");
