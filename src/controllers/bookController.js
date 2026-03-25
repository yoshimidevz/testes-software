const {createBook} = require('../services/bookService');

const create = (req, res) => {
    const {title, author} = req.body;

    if (!title || !author) {
        return res.status(400).json({error: 'Title and author are required'});
    }
    const newBook = createBook(title, author);
    res.status(201).json(newBook);
}

const get = (req, res) => {
    res.status(200).json({message: 'Get all books - not implemented yet'});
}

const getById = async (req, res) => {
    try {
        const {id} = req.params;
        res.status(200).json({message: `Get book with id ${id}`});
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

const update = async (req, res)=> {
    try{
        const {id} = req.params;
        res.status(200).json({message: `U book with id ${id}`});
    } catch (error){
        res.status(500).json({error: error.message});
    }
}

const deletar = async (req, res) => {
    const {id} = req.params;

    if(!id){
        return res.status(400).json({erro: 'id é obrigatório'});
    }

    await deleteBook(id);
    res.status(204).send();
}

module.exports = { create, get, getById };