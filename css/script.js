let library;

const DEFAULT_DATA  = [
    { name: "The Lord of the Rings", author: "Tolkien", read: true },
    { name: "Alice in Wonderland", author: "Lewis Caroll", read: false },
    { name: "Naruto", author: "Masashi Kishimoto", read: true },
    { name: "Harry Potter and the Sorcerer's Stone", author: "J.K. Rowling", read: false },
    { name: "To Kill a Mockingbird", author: "Harper Lee", read: true }
  ];

  window.onload = function() {
    let localStorageData = getLocalData();
    if(localStorageData) {
        library = JSON.parse(localStorageData);
    } else {
        library = DEFAULT_DATA;
    }

    
  } 

  function getLocalData() {
    return localStorage.getItem('localLibrary');
  }