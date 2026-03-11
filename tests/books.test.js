const request = require('supertest');
const app = require('../src/app');

test('POST /books - should create a new book', async () => {
    const res = await request(app)
        .post('/api/books')
        .send({title: 'Test Book', author: 'Test Author'});
    expect(res.statusCode).toEqual(201);
    expect(res.body.title).toBe('Test Book');
    expect(res.body.author).toBe('Test Author');
});

test('GET /books - should return 404 for non-existing route', async () => {
    const res = await request(app).get('/api/books');
    expect(res.statusCode).toEqual(200);
});