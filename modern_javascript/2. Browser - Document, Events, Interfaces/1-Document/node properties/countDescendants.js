// querySelectorAll 은 유사 배열 객체인 컬렉션을 반환하기에 for of로 순회할 수 있다
for (let li of document.querySelectorAll("li")) {
    // li의 firstChild는 text 노드이고, text 노드의 data는 .data로 접근할 수 있다
    let title = li.firstChild.data;
    console.log(title);
}
