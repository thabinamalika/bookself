// Ambil buku dari fungsi local storage
function loadBooks() {
    return JSON.parse(localStorage.getItem("books")) || [];
}

// Simpan buku ke fungsi local storage
function saveBooks(books) {
    localStorage.setItem("books", JSON.stringify(books));
}