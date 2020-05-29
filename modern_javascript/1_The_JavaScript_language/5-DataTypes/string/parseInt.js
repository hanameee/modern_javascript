function extractCurrencyValue(str) {
    for (char of str) {
        if (!isNaN(Number(char))) {
            idx = str.indexOf(char);
            return parseInt(str.slice(idx));
        }
    }
    return null;
}

console.log(extractCurrencyValue("$120"));
