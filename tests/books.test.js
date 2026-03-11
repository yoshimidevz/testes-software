const request = require('supertest');
const app = require('../src/app');

test('POST /books - should create a new book', async () => {
    const res = await request(app)
        .post('/books')
        .send({title: 'Test Book', author: 'Test Author'});
    expected(res.statusCode).toEqual(201);
    expected(res.body.title).toBe('Test Book');
    
});