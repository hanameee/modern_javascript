function sumInput() {
    result = 0;
    while (True) {
        num = prompt("number?", 0);
        result += +num;
        if (num != 0 && !!num == False) {
            return result;
        }
    }
}
