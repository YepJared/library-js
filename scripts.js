const addBookButton = document.querySelector("#add-book");
const container = document.querySelector(".container");
const dialog = document.querySelector(".new-book");
const form = document.querySelector("form");
const formCloseButton = document.querySelector("#close");
const myLibrary = [];

function Book(title, author, pages, isbn, status) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isbn = isbn;
    this.readStatus = status;
}

function displayLibrary() {
    container.replaceChildren();
    myLibrary.forEach((book, index) => {
        const card = createNewCard(book);
        card.id = index;
        container.appendChild(card);
    });
}

function findParentCard(node) {
    while (node.parentNode) {
        node = node.parentNode;
        if (node.classList.contains("card")) {
            return node;
        }
    }
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
        const parentCard = findParentCard(event.target);
        removeBookFromLibrary(parentCard.id);
    });
    return removeBookButton;
}

function createItem() {
    const item = document.createElement("div");
    item.classList.add("item");
    return item;
}

function createKey(key) {
    const keyEle = document.createElement("p");
    keyEle.classList.add("key");
    keyEle.textContent = key;
    return keyEle;
}

function addCardDetail(key, content) {
    const item = createItem();

    const keyEle = createKey(key);

    const contentEle = document.createElement("p");
    contentEle.classList.add("content");
    contentEle.textContent = content;

    item.append(keyEle, contentEle);
    return item;
}

function createStatusToggle(status) {
    const label = document.createElement("label");
    label.classList.add("switch");

    const input = document.createElement("input");
    input.setAttribute("type", "checkbox");
    input.checked = status;
    input.addEventListener("change", (event) => {
        const parent = findParentCard(event.target);
        const book = myLibrary[parent.id];
        book.readStatus = !book.readStatus;
    });

    const slider = document.createElement("span");
    slider.classList.add("slider");

    label.append(input, slider);
    return label;
}

function addReadStatus(status) {
    const item = createItem();
    const keyEle = createKey("Read:");
    const readStatusToggle = createStatusToggle(status);

    item.append(keyEle, readStatusToggle);
    return item;
}

function createNewCard(book) {
    const card = document.createElement("div");
    card.classList.add("card");
    card.append(
        addCardDetail("Title:", book.title),
        addCardDetail("Author:", book.author),
        addCardDetail("Pages:", book.pages),
        addCardDetail("ISBN:", book.isbn),
        addReadStatus(book.readStatus),
        addRemoveButton()
    )
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
    "978-0-9847828-5-7",
    true
);

const book2 = new Book(
    "The Big Bad Book of Botany",
    "Michael Largo",
    398,
    "978-0-06-228275-0",
    false
);

addBookToLibrary(book1);
addBookToLibrary(book2);

form.onsubmit = function(event) {
    const bookForm = new FormData(form);
    const newBook = new Book(
        bookForm.get("title"),
        bookForm.get("author"),
        bookForm.get("pages"),
        bookForm.get("isbn"),
        bookForm.get("read") === "yes" ? true: false
    );
    addBookToLibrary(newBook);
    dialog.close();
    form.reset();
    event.preventDefault();
};

formCloseButton.addEventListener("click", () => {
    dialog.close();
    form.reset();
});

addBookButton.addEventListener("click", () => {
    dialog.showModal();
});

