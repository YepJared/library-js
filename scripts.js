const newBookButton = document.querySelector("#add-book");
const container = document.querySelector(".container");

function Book(title, author, pages, isbn) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isbn = isbn;
}

function addCardDetail(key, content) {
    const item = document.createElement("div");
    item.classList.add("item");

    const key_ele = document.createElement("p");
    key_ele.classList.add("key");
    key_ele.textContent = key;

    const content_ele = document.createElement("p");
    content_ele.classList.add("content");
    content_ele.textContent = content;

    item.appendChild(key_ele);
    item.appendChild(content_ele);
    return item
}

function createNewCard(book) {
    const card = document.createElement("div");
    card.classList.add("card");
    card.appendChild(addCardDetail("Title:", book.title));
    card.appendChild(addCardDetail("Author:", book.author));
    card.appendChild(addCardDetail("Pages:", book.pages));
    card.appendChild(addCardDetail("ISBN:", book.isbn));
    return card;
}

function addBookToLibrary(book) {
    const card = createNewCard(book);
    container.appendChild(card);
}

const book = new Book(
    "The Big Bad Book of Botany",
    "Michael Largo",
    398,
    "978-0-06-228275-0"
);

newBookButton.addEventListener("click", () => {
    addBookToLibrary(book);
});

