const Book = require('../models/book');

const createBook = async (title, author) => {
    const book = await Book.create({title, author});
    return {
        id: book.id,
        title: book.title,
        author: book.author,
    };
}

const getBookById = async (id) => {
    return await Book.findByPk(id);
}

const deleteBook = async (id) => {
    const book = await getBookById(id);
    if (!book) {
        throw new Error('Book not found');
    }
    await book.destroy();
}

const updateBook = async (id, title, author) => {
    const book = await getBookById(id);
    if (!book) {
        throw new Error('Book not found');
    }
    book.title = title;
    book.author = author;
    await book.save();
    return book;
}

const getAllBooks = async () => {
    return await Book.findAll();
}



module.exports = { createBook, getBookById, deleteBook, updateBook, getAllBooks };