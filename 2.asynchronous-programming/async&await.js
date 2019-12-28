function fetchItems() {
    return new Promise(function(resolve, reject) {
        setTimeout(function() {
            var items = [1, 2, 3];
            resolve(items);
        }, 3000);
    });
}

async function logItems() {
    var resultItems = await fetchItems();
    console.log(resultItems);
}

logItems();
