// Модальне вікно
const openBtn = document.getElementById("openModal") as HTMLButtonElement;
const closeBtn = document.getElementById("closeModal") as HTMLButtonElement;
const modal = document.getElementById("modal") as HTMLDivElement;

openBtn.addEventListener("click", () => {
    modal.style.display = "block";
});

closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
});

// Фетч даних з API
const postsContainer = document.getElementById("posts") as HTMLDivElement;

async function loadPosts(): Promise<void> {
    const res = await fetch("https://jsonplaceholder.typicode.com/posts?_limit=5");
    const posts: Array<{ title: string; body: string }> = await res.json();

    postsContainer.innerHTML = posts
        .map(
            (post) => `
        <div class="post">
            <h3>${post.title}</h3>
            <p>${post.body}</p>
        </div>`
        )
        .join("");
}

loadPosts();
