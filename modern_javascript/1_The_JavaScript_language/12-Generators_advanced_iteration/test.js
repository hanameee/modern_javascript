let repo = "javascript-tutorial/en.javascript.info"; // 커밋 정보를 얻어올 GitHub 레포

async function* fetchCommits(repo) {
    let url = `https://api.github.com/repos/${repo}/commits`;
    while (url) {
        const response = await fetch(url, {
            headers: { "User-Agent": "Our script" }, // Github은 모든 요청에 user-agent 헤더를 강제함
        });
        const body = await response.json(); // 응답은 json 형태로 옴
        console.log(response.headers);
        let nextPage = response.headers
            .get("Link")
            .match(/<(.*?)>; rel="next"/);
        nextPage = nextPage?.[1];
        url = nextPage;
        for (let commit of body) {
            yield commit;
        }
    }
}

(async () => {
    let count = 0;
    for await (const commit of fetchCommits(repo)) {
        console.log(commit.author.login);
        if (++count == 100) {
            break;
        }
    }
})();
