let myLibrary = [];

const library = document.querySelector(".library");
const form = document.querySelector(".form");
const button = document.querySelector(".button");

function Book(title, author, genre) {
  this.title = title;
  this.author = author;
  this.genre = genre;
}

function addBookToLibrary(bookdata) {
  let [title, author, genre] = bookdata;
  let newBook = new Book(title.trim(), author.trim(), genre.trim());
  //   loop over Mylibrary and add book if the current book title, author, and genre all dont match exactly to another book.
  if (
    !myLibrary.some((book) => {
      return (
        book.title === newBook.title &&
        book.author === newBook.author &&
        book.genre === newBook.genre
      );
    })
  ) {
    myLibrary.push(newBook);
  }
}

function createBookElement(currentBook) {
  let book = document.createElement("div");
  book.classList.add("book");
  book.classList.add("w3-theme-l5");
  let header = document.createElement("div");
  header.classList.add("header");
  header.textContent = currentBook.title;
  let h2 = document.createElement("h2");
  h2.classList.add("h2");
  let details = document.createElement("div");
  details.classList.add("details");
  let p1 = document.createElement("p");
  p1.classList.add("author");
  p1.textContent = currentBook.author;
  let p2 = document.createElement("p");
  p2.classList.add("genre");
  p2.textContent = currentBook.genre;

  header.appendChild(h2);
  book.appendChild(header);

  details.appendChild(p1);
  details.appendChild(p2);
  book.appendChild(details);
  return book;
}

// let theHobbit = new Book("The Hobbit", "J.R.R Tolkien", "Fantasy");
// createBookElement(theHobbit);

//   append book to library
//   library.appendChild(book);

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);

  //  this reduces the entries from a pair of key values to just the values
  let bookdata = [...formData.entries()].reduce((accumulator, pair) => {
    accumulator.push(pair[1]);
    return accumulator;
  }, []);

  addBookToLibrary(bookdata);
  updateDisplay();
});

function updateDisplay() {
  library.innerHTML = "";
  myLibrary.forEach((book) => {
    let createdBook = createBookElement(book);
    library.appendChild(createdBook);
  });
  form.reset();
  form.classList.remove("visible");
}

button.addEventListener("click", displayForm);

function displayForm() {
  form.classList.add("visible");
}
