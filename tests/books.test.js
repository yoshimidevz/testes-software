const axios = require('axios');
require('dotenv').config();
const api = `http://localhost:${process.env.PORT || 3000}`;

describe('Book API', () => {
    test('GET /books - should get a book', async () => {
        const res = await axios.get(`${api}/books`);
        expect(res.status).toBe(200);
    });
    
    test('POST /books - should create a new book', async () => {
        const res = await axios.post(`${api}/books`, {title: 'Test Book', author: 'Test Author'});
        expect(res.status).toBe(201);
        expect(res.data.title).toBe('Test Book');
        expect(res.data.author).toBe('Test Author');
    });

    test('GET /books/:id - should return 200 for existing book', async () => {
        const res = await axios.get(`${api}/books/1`);
        expect(res.status).toBe(200);

        await axios.get(`${api}/books`, {title: 'Another Book', author: 'Another Author'});
    });

    test(`PUT  /books/:id - should update a book`, async() =>{
        const res = await axios.put(`${api}/books/1`, {title: 'Updated Book', author: 'Updated Author'});
        expect(res.status).toBe(200);
    });

    test('DELETE /books/:id - should delete a book', async()=>{
        const createRes = await axios.post(`${api}/books`, {
            title: 'Livro de Teste',
            author: 'Autor Teste'
            
        });
        
        const bookId = createRes.data.id; 

        const deleteRes = await axios.delete(`${api}/books/${bookId}`);
        expect(deleteRes.status).toBe(200);

        await expect(axios.delete(`${api}/books/${bookId}`)).rejects.toMatchObject({
            response: { status: 404 }
        });
    });
});