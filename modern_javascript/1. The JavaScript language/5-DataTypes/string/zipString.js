function truncate(str, maxLen) {
    if (str.length > maxLen) {
        str = str.slice(0, 19) + "…";
    }
    return str;
}

console.log(truncate("What I'd like to tell on this topic is:", 20));
