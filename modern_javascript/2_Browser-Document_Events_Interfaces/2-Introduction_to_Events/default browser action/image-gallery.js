const Container = document.querySelector(".container");
Container.addEventListener("click", (e) => {
    if (e.target.className === "thumbnail") {
        const target = e.target;
        const mainImage = document.querySelector(".main-image");
        mainImage.src = target.src;
    }
});
