let library;

const DEFAULT_DATA = [
    { name: "The Lord of the Rings", author: "Tolkien", read: true },
    { name: "Alice in Wonderland", author: "Lewis Caroll", read: false },
    { name: "Naruto", author: "Masashi Kishimoto", read: true },
    { name: "Harry Potter and the Sorcerer's Stone", author: "J.K. Rowling", read: false },
    { name: "To Kill a Mockingbird", author: "Harper Lee", read: true },
    { name: "The Great Gatsby", author: "F. Scott Fitzgerald", read: true },
    { name: "1984", author: "George Orwell", read: true },
    { name: "Pride and Prejudice", author: "Jane Austen", read: false },
    { name: "The Catcher in the Rye", author: "J.D. Salinger", read: false },
    { name: "Moby-Dick", author: "Herman Melville", read: true },
    { name: "Brave New World", author: "Aldous Huxley", read: true },
    { name: "The Hobbit", author: "J.R.R. Tolkien", read: true },
    { name: "The Da Vinci Code", author: "Dan Brown", read: false },
    { name: "The Chronicles of Narnia", author: "C.S. Lewis", read: true },
    { name: "One Hundred Years of Solitude", author: "Gabriel García Márquez", read: true }
];

window.onload = function () {
    let localStorageData = getLocalData();
    if (localStorageData) {
        library = JSON.parse(localStorageData);
    } else {
        library = DEFAULT_DATA;
    }

    addAllBooksToPage(library);
}

function getLocalData() {
    return localStorage.getItem('localLibrary');
}

function addAllBooksToPage(books) {
    books.reverse();
    for (const book of books) {
        addBookToPage(book);
    }
}

function addBookToPage(book) {
    // Create the main div with class 'row'
    const rowDiv = document.createElement('div');
    rowDiv.classList.add('row');

    // Create and append the first child div
    const col1Div = document.createElement('div');
    col1Div.classList.add('four', 'columns');
    col1Div.textContent = book.name;
    rowDiv.appendChild(col1Div);

    // Create and append the second child div
    const col2Div = document.createElement('div');
    col2Div.classList.add('four', 'columns');
    col2Div.textContent = book.author;
    rowDiv.appendChild(col2Div);

    // Create and append the third child div
    const col3Div = document.createElement('div');
    col3Div.classList.add('one', 'column');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = book.read;
    checkbox.addEventListener('change', function (event) {
        readStatusChange(event);
    });
    col3Div.appendChild(checkbox);
    rowDiv.appendChild(col3Div);

    // Create and append the fourth child div
    const col4Div = document.createElement('div');
    col4Div.classList.add('three', 'columns');
    const button = document.createElement('button');
    button.type = 'button';
    button.textContent = 'Delete';
    button.addEventListener("click", function (event) {
        buttonPressDelete(event);
    });
    col4Div.appendChild(button);
    rowDiv.appendChild(col4Div);

    // Append the rowDiv to the #container element as the first child
    const $booksContainerDiv = document.getElementById('booksContainer');
    $booksContainerDiv.insertBefore(rowDiv, $booksContainerDiv.firstChild);
}

function readStatusChange(e) {
    const isChecked = e.target.checked;
    const bookTitle = e.target.parentNode.parentNode.childNodes[0].innerText;
    const bookIndex = library.findIndex(book => book.name === bookTitle);
    library[bookIndex].read = isChecked;
    console.log(library[bookIndex]);
}

function buttonPressDelete(e) {
    const bookTitle = e.target.parentNode.parentNode.childNodes[0].innerText;
    deleteBookFromLibrary(bookTitle);
    deleteBookFromPage(e);
}

function deleteBookFromLibrary(bookTitle) {
    const bookIndex = library.findIndex(book => book.name === bookTitle);
    library.splice(bookIndex, 1);
    console.log(library)
}

function deleteBookFromPage(e) {
    const divToDel = e.target.parentNode.parentNode;
    divToDel.remove();
}

document.addEventListener('DOMContentLoaded', function () {
    const btnAdd = document.getElementById('btnAdd');
    btnAdd.addEventListener('click', function () {
        buttonPressAdd();
    });
});

function buttonPressAdd() {
    const bookName = document.getElementById('book').value;
    const authorName = document.getElementById('author').value;
    const isRead = document.getElementById('readStatus').checked;

    if (bookName !== '') {
        const newBook = new Book(bookName, authorName, isRead);
        library.push(newBook);
        addBookToPage(newBook);
        clearForm();
    }
}

function Book(name, author, read) {
    this.name = name;
    this.author = author;
    this.read = read;
}

function clearForm() {
    document.getElementById('book').value = '';
    document.getElementById('author').value = '';
    document.getElementById('readStatus').checked = false;
}