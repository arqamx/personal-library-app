let library;

const DEFAULT_DATA = [
    { name: "The Lord of the Rings", author: "Tolkien", read: true },
    { name: "Alice in Wonderland", author: "Lewis Caroll", read: false },
    { name: "Naruto", author: "Masashi Kishimoto", read: true },
    { name: "Harry Potter and the Sorcerer's Stone", author: "J.K. Rowling", read: false },
    { name: "To Kill a Mockingbird", author: "Harper Lee", read: true }
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
    col3Div.appendChild(checkbox);
    rowDiv.appendChild(col3Div);

    // Create and append the fourth child div
    const col4Div = document.createElement('div');
    col4Div.classList.add('three', 'columns');
    const button = document.createElement('button');
    button.type = 'button';
    button.textContent = 'Delete';
    col4Div.appendChild(button);
    rowDiv.appendChild(col4Div);

    // Append the rowDiv to the #container element as the first child
    const $booksContainerDiv = document.getElementById('booksContainer');
    $booksContainerDiv.insertBefore(rowDiv, $booksContainerDiv.firstChild);
}