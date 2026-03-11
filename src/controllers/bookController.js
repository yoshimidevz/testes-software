const {createBook} = require('../services/bookService');

const create = (req, res) => {
    const {title, author} = req.body;

    if (!title || !author) {
        return res.status(400).json({error: 'Title and author are required'});
    }
    const newBook = createBook(title, author);
    res.status(201).json(newBook);
}