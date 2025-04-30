document.addEventListener("DOMContentLoaded", function () {
    const bookForm = document.getElementById("bookForm");
    const searchForm = document.getElementById("searchBookForm");
    const incompleteBooksList = document.getElementById("incompleteBookList");
    const completeBooksList = document.getElementById("completeBookList");
    const titleInput = document.getElementById("bookFormTitleInput");
    const authorInput = document.getElementById("bookFormAuthorInput");
    const yearInput = document.getElementById("bookFormYearInput");
    const isCompleteInput = document.getElementById("bookFormIsCompleteCheckbox");
    const modal = document.getElementById("modal");
  
    let books = loadBooks();  // Load books from localStorage
  
    function generateBookId() {
      return Date.now().toString();
    }
  
    function createBookElement(book) {
      const bookDiv = document.createElement("div");
      bookDiv.setAttribute("data-bookid", book.id);
      bookDiv.setAttribute("data-testid", "bookItem");
  
      bookDiv.innerHTML = `
        <h3 data-testid="bookItemTitle">${book.title}</h3>
        <p data-testid="bookItemAuthor">Penulis: ${book.author}</p>
        <p data-testid="bookItemYear">Tahun: ${book.year}</p>
        <div>
          <button data-testid="bookItemIsCompleteButton">${book.isComplete ? "Belum selesai dibaca ✘" : "Selesai dibaca ✔"}</button>
          <button data-testid="bookItemDeleteButton">Hapus 🗑</button>
          <button data-testid="bookItemEditButton">Edit 🖊</button>
        </div>
      `;
  
      const isCompleteButton = bookDiv.querySelector("[data-testid=bookItemIsCompleteButton]");
      const deleteButton = bookDiv.querySelector("[data-testid=bookItemDeleteButton]");
      const editButton = bookDiv.querySelector("[data-testid=bookItemEditButton]");
  
      isCompleteButton.addEventListener("click", () => {
        book.isComplete = !book.isComplete;
        saveBooks(books);  // Save updated books to localStorage
        renderBooks();
      });
  
      deleteButton.addEventListener("click", () => {
        if (confirm("Apakah Anda yakin ingin menghapus buku ini?")) {
          books = books.filter((b) => b.id !== book.id);
          saveBooks(books);
          renderBooks();
        }
      });
  
      editButton.addEventListener("click", () => {
        titleInput.value = book.title;
        authorInput.value = book.author;
        yearInput.value = book.year;
        isCompleteInput.checked = book.isComplete;
  
        books = books.filter((b) => b.id !== book.id);
        saveBooks(books);
        renderBooks();
      });
  
      return bookDiv;
    }
  
    function renderBooks() {
      incompleteBooksList.innerHTML = "";
      completeBooksList.innerHTML = "";
  
      if (books.length === 0) {
        incompleteBooksList.innerHTML = "<p>Tidak ada buku!</p>";
        completeBooksList.innerHTML = "<p>Tidak ada buku!</p>";
      } else {
        books.forEach((book) => {
          const bookElement = createBookElement(book);
          if (book.isComplete) {
            completeBooksList.appendChild(bookElement);
          } else {
            incompleteBooksList.appendChild(bookElement);
          }
        });
      }
    }
  
    bookForm.addEventListener("submit", (event) => {
      event.preventDefault();
  
      const newBook = {
        id: generateBookId(),
        title: titleInput.value.trim(),
        author: authorInput.value.trim(),
        year: parseInt(yearInput.value.trim(), 10), // Mengonversi year ke number
        isComplete: isCompleteInput.checked,
      };
  
      if (newBook.title && newBook.author && !isNaN(newBook.year)) { // Validasi year harus angka
        books.push(newBook);
        saveBooks(books);  // Save new book to localStorage
        renderBooks();
        bookForm.reset();
      } else {
        alert("Masukkan data buku dengan benar, terutama tahun yang harus berupa angka.");
      }
    });
  
    searchForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const searchTerm = document.getElementById("searchBookTitle").value.toLowerCase().trim();
      const filteredBooks = books.filter((book) =>
        book.title.toLowerCase().includes(searchTerm)
      );
  
      incompleteBooksList.innerHTML = "";
      completeBooksList.innerHTML = "";
  
      if (filteredBooks.length === 0) {
        incompleteBooksList.innerHTML = "<p>Buku tidak ditemukan.</p>";
        completeBooksList.innerHTML = "<p>Buku tidak ditemukan.</p>";
      } else {
        filteredBooks.forEach((book) => {
          const bookElement = createBookElement(book);
          if (book.isComplete) {
            completeBooksList.appendChild(bookElement);
          } else {
            incompleteBooksList.appendChild(bookElement);
          }
        });
      }
    });
  
    // Modal Notification
    bookForm.addEventListener("submit", function (event) {
      event.preventDefault();
  
      modal.style.display = "block";
  
      setTimeout(() => {
        modal.classList.add("hide");
      }, 2500);
  
      setTimeout(() => {
        modal.style.display = "none";
        modal.classList.remove("hide");
      }, 3000);
    });
  
    renderBooks();
  });