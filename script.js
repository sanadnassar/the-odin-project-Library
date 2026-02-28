let myLibrary = [];

function Book(title, author, pages) {
    this.bookID = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
}

function addBookToLibrary(name, creator, length) {
    const book = new Book(name, creator, length);
    myLibrary.push(book);
}

function removeBookFromLibrary(id) {
    let newLibrary = myLibrary.filter(book => book.bookID !== id)
    myLibrary = newLibrary;

    displayBooks();
}



const dialog = document.getElementById("book-dialog");
const addButton = document.getElementById("add");
const closeDialogBtn = document.getElementById("close-dialog");
const bookForm = document.getElementById("book-form");

addButton.addEventListener("click", ()=>{
    dialog.showModal();
})

closeDialogBtn.addEventListener("click", ()=>{
    dialog.close();
})

bookForm.addEventListener("submit", (event)=>{
    event.preventDefault();
    const newTitle = document.getElementById("title").value;
    const newAuthor = document.getElementById("author").value;
    const newPages = document.getElementById("pages").value;

    const newBook = new Book(newTitle, newAuthor, newPages);
    myLibrary.push(newBook);

    displayBooks();
    bookForm.reset();
    dialog.close();
})

const cards = document.getElementById("card");

function displayBooks() {
    cards.innerHTML = "";

    for (let j = 0; j < myLibrary.length; j++) {
        const currentBook = myLibrary[j];
        
        const bookElement = document.createElement("div");
        bookElement.classList.add("book-card");
        
        bookElement.innerText = `ID: ${currentBook.bookID}\nTitle: ${currentBook.title}\nAuthor: ${currentBook.author}\nPages: ${currentBook.pages}\n\n`;

        const removeBtn = document.createElement("button");
        removeBtn.innerText = "Remove Book";
        
        removeBtn.addEventListener("click", () => {
            removeBookFromLibrary(currentBook.bookID);
        });

        bookElement.appendChild(removeBtn);
        cards.appendChild(bookElement);
    }
}