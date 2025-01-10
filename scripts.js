const addBookButton = document.querySelector("#add-book");
const container = document.querySelector(".container");
const myLibrary = [];

function Book(title, author, pages, isbn) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isbn = isbn;
}

function displayLibrary() {
    container.replaceChildren();
    myLibrary.forEach((book, index) => {
        const card = createNewCard(book);
        card.id = index;
        container.appendChild(card);
    });
}

function removeBookFromLibrary(index) {
    myLibrary.splice(index, 1);
    displayLibrary();
}

function addRemoveButton() {
    const removeBookButton = document.createElement("button");
    removeBookButton.id = "remove-book";
    removeBookButton.textContent = "Remove";
    removeBookButton.addEventListener("click", (event) => {
        const parentCard = event.target.parentNode;
        removeBookFromLibrary(parentCard.id);
    });
    return removeBookButton;
}

function addCardDetail(key, content) {
    const item = document.createElement("div");
    item.classList.add("item");

    const keyEle = document.createElement("p");
    keyEle.classList.add("key");
    keyEle.textContent = key;

    const contentEle = document.createElement("p");
    contentEle.classList.add("content");
    contentEle.textContent = content;

    item.appendChild(keyEle);
    item.appendChild(contentEle);
    return item
}

function createNewCard(book) {
    const card = document.createElement("div");
    card.classList.add("card");
    card.appendChild(addCardDetail("Title:", book.title));
    card.appendChild(addCardDetail("Author:", book.author));
    card.appendChild(addCardDetail("Pages:", book.pages));
    card.appendChild(addCardDetail("ISBN:", book.isbn));
    card.appendChild(addRemoveButton());
    return card;
}

function addBookToLibrary(book) {
    myLibrary.push(book);
    displayLibrary();
}

const book1 = new Book(
    "Cracking the Coding Interview",
    "Gayle Laakmann McDowell",
    696,
    "978-0-9847828-5-7"
);

addBookToLibrary(book1);

const book2 = new Book(
    "The Big Bad Book of Botany",
    "Michael Largo",
    398,
    "978-0-06-228275-0"
);

addBookButton.addEventListener("click", () => {
    addBookToLibrary(structuredClone(book2));
});

