const books = [];

const createBook = (title, author) => {
    const book = { id: books.length + 1, title, author};
    books.push(book)
    return book;
}

const getBookById = async (id) => {
    return await Book.findByPk(id);
}



module.exports = { createBook, getBookById };