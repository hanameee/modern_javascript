// includes 는 true 혹은 false를 반환한다.
function checkSpam(str) {
    let lowerStr = str.toLowerCase();
    if (lowerStr.includes("viagra") || lowerStr.includes("xxx")) {
        return true;
    }
    return false;
}

console.log(checkSpam("buy ViAgRA now"));
console.log(checkSpam("innocent rabbit"));
