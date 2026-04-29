const {createBook, getAllBooks, deleteBook} = require('../services/bookService');

const create = async (req, res) => {
    const {title, author} = req.body;

    if (!title || !author) {
        return res.status(400).json({error: 'Title and author are required'});
    }
    const newBook = await createBook(title, author);
    res.status(201).json(newBook);
}

const get = async (req, res) => {
    const books = await getAllBooks();
    return res.status(200).json(books);
}

const getById = async (req, res) => {
    try {
        const {id} = req.params;
        res.status(200).json({message: `Get book with id ${id}`});
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

const atualizar = async (req, res)=> {
    try{
        const {id} = req.params;
        res.status(200).json({message: `Update book with id ${id}`});
    } catch (error){
        res.status(500).json({error: error.message});
    }
}

const deletar = async (req, res) => {
    const {id} = req.params;

    try {
        await deleteBook(id);
        res.status(200).json({message: 'Book deleted successfully'});
    } catch (error) {
        if (error.message === 'Book not found') {
            return res.status(404).json({error: 'Book not found'});
        }
        res.status(500).json({error: error.message});
    }
}

module.exports = { create, get, getById, atualizar, deletar };