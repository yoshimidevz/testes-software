const axios = require('axios');
require('dotenv').config();
const api = `http://localhost:${process.env.PORT || 3000}`;

const BOOK_ID = 1;
const USER_ID = 1;

describe("Loans", () => {
    test("POST / should register a new loan", async () => {
        const res = await axios.post(`${api}/loans`, {
            book_id: BOOK_ID,
            user_id: USER_ID,
            return_date: "2025-05-01",
        });
        expect(res.status).toBe(201);
        expect(res.data).toHaveProperty("id");

        await axios.delete(`${api}/loans/${res.data.id}`);
    });

    test("GET / should return a list of loans", async () => {
        const res = await axios.get(`${api}/loans`);
        expect(res.status).toBe(200);
        expect(Array.isArray(res.data)).toBe(true);
    });

    test("DELETE /:id should delete a loan", async () =>{
        const res = await axios.post(`${api}/loans`, {
            book_id: BOOK_ID,
            user_id: USER_ID,
            return_date: "2025-05-01",
        });
        const loanId = res.data.id;

        const deleteRes = await axios.delete(`${api}/loans/${loanId}`);
        expect(deleteRes.status).toBe(200);

        try {
            await axios.get(`${api}/loans/${loanId}`);
        } catch (err) {
            expect(err.response.status).toBe(404);
        }
    });

    test("DELETE /:id should return 404 when deleting a non-existent loan", async () => {
        try{
            await axios.delete(`${api}/loans/9999`);
        }
        catch(err){
            expect(err.response.status).toBe(404);
        }
    });

    test("GET /:id should return a loan by their id", async () => {
       try{
        const res = await axios.get(`${api}/loans/1`);
        expect(res.status).toBe(200);
        expect(res.data).toHaveProperty("id");
        expect(res.data).toHaveProperty("book_id");
        expect(res.data).toHaveProperty("user_id");
       }catch(err){
            expect(err.response.status).toBe(404);
        }
    });
    
    test("GET /:id should return 404 for non-existent loan", async () => {
        try{
            const res = await axios.get(`${api}/loans/9999`);
        }
        catch(err){
            expect(err.response.status).toBe(404);
        }
    });

    test("POST / should return 400 when registering a loan without book_id", async () => {
        try {
            await axios.post(`${api}/loans`, {
                user_id: USER_ID,
                date_: "2025-05-01",
            });
        } catch (err) {
            expect(err.response.status).toBe(400);
        }
    });

    test("POST / should return 400 when registering a loan without user_id", async () => {
        try {
            await axios.post(`${api}/loans`, {
                book_id: BOOK_ID,
                date_: "2025-05-01",
            });
        } catch (err) {
            expect(err.response.status).toBe(400);
        }
    });

    test("POST / should return 400 when registering a loan without return_date", async () => {
        try {
            await axios.post(`${api}/loans`, {
                book_id: BOOK_ID,
                user_id: USER_ID,
            });
        } catch (err) {
            expect(err.response.status).toBe(400);
        }
    });

    test("PUT /:id should register the return of a loan", async () => {
       try{
        const res = await axios.put(`${api}/loans/1`, {
            actual_return_date: "2025-04-30",
        });
        expect(res.status).toBe(200);
        expect(res.data).toHaveProperty("id");
        expect(res.data).toHaveProperty("actual_return_date");
       } catch(err){
        expect(err.response.status).toBe(404);
       }
    });

    test("PUT /:id should return 404 when returning a non-existent loan", async () => {
        try {
            await axios.put(`${api}/loans/9999`, {
                actual_return_date: "2025-04-30",
            });
        } catch (err) {
            expect(err.response.status).toBe(404);
        }
    });

    test("GET / should list loans for a specific user", async () => {
        try{
            const res = await axios.get(`${api}/loans?user_id=${USER_ID}`);
            expect(res.status).toBe(200);
            expect(Array.isArray(res.data)).toBe(true);
        } catch (err) {
            expect(err.response.status).toBe(404);
        }
    });

    test("POST / should return 400 when trying to loan an already borrowed book", async () => {
        try{
            const res1 = await axios.post(`${api}/loans`, {
                book_id: BOOK_ID,
                user_id: USER_ID,
                return_date: "2025-05-01",
            });

            const res2 = await axios.post(`${api}/loans`, {
                book_id: BOOK_ID,
                user_id: USER_ID,
                return_date: "2025-05-01",
            });
        } catch (err) {
            expect(err.response.status).toBe(400);
        }
    });
});