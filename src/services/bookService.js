const createBook = require('express');
const app = express();

const createBook = (title, author) => {
    return {id: Date.now(), title, author};
}

app.use(express.json());
app.post('/books', (req, res) => {
    const {title, author} = req.body;
    const newBook = createBook(title, author);
    res.status(201).json(newBook);
});

module.exports = {createBook};