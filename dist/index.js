// Модальне вікно
const openBtn = document.getElementById("openModal");
const closeBtn = document.getElementById("closeModal");
const modal = document.getElementById("modal");
openBtn.addEventListener("click", () => {
    modal.style.display = "block";
});
closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
});
// Фетч даних з API
const postsContainer = document.getElementById("posts");
async function loadPosts() {
    const res = await fetch("https://jsonplaceholder.typicode.com/posts?_limit=5");
    const posts = await res.json();
    postsContainer.innerHTML = posts
        .map((post) => `
        <div class="post">
            <h3>${post.title}</h3>
            <p>${post.body}</p>
        </div>`)
        .join("");
}
loadPosts();
export {};
//# sourceMappingURL=index.js.map