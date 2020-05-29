var name = "zero"; // (1)변수 선언 (6)변수 대입
function wow(word) {
    // (2)변수 선언 (3)변수 대입
    console.log(word + " " + name); // (11)
}
function say() {
    // (4)변수 선언 (5)변수 대입
    var name = "nero"; // (8)
    console.log(name); // (9)
    wow("hello"); // (10)
}
say(); // (7)
