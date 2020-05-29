let data = {
    Fish: {
        trout: {},
        salmon: {},
    },

    Tree: {
        Huge: {
            sequoia: {},
            oak: {},
        },
        Flowering: {
            "apple tree": {},
            magnolia: {},
        },
    },
};

function createTree(container, obj) {
    container.append(createTreeDom(obj));
}

// 재귀적으로 object를 탐색하기
function createTreeDom(obj) {
    // children이 없다면 return하고 ul은 만들어지지 않음
    if (!Object.keys(obj).length) return;
    // children이 있다면 일단 ul을 하나 만들고
    let ul = document.createElement("ul");
    // obj의 자식들에 대해
    for (let key in obj) {
        // li를 만들어주고 key를 세팅해준 뒤
        let li = document.createElement("li");
        li.innerHTML = key;
        // children이 있든 없든 (없으면 알아서 리턴될 것임) obj의 자식들에 대해 createTreeDom 재귀적으로
        let childrenUl = createTreeDom(obj[key]);
        // childrenUl 함수에서 리턴된 ul 객체가 있다면 걔를 지금 만든 li 객체에 append 해주기
        if (childrenUl) {
            li.append(childrenUl);
        }
        ul.append(li);
    }
    return ul;
}
createTree(data);
