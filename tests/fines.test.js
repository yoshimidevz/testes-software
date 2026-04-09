const axios = require('axios');
require('dotenv').config();
const api = `http://localhost:${process.env.PORT || 3000}`;

let dynamicLoanId;

describe("Fines", () => {
    
    beforeAll(async () => {
        try {
            const loans = await axios.get(`${api}/loans`);
            if (loans.data.length > 0) {
                dynamicLoanId = loans.data[0].id;
            } else {
                const newLoan = await axios.post(`${api}/loans`, {
                    book_id: 1, 
                    user_id: 1,
                    return_date: "2025-12-31"
                });
                dynamicLoanId = newLoan.data.id;
            }
        } catch (err) {
            console.error("Aviso: Não foi possível obter ou criar um Loan. Os testes de Fine podem falhar devido à FK.");
            dynamicLoanId = 1; 
        }
    });

    test("POST / should register a new fine", async () => {
        const res = await axios.post(`${api}/fines`, {
            loan_id: dynamicLoanId,
            fineType: "Late Return",
            amount: 10.00
        });
        expect(res.status).toBe(201);
        
        await axios.delete(`${api}/fines/${res.data.id}`);
    });

    test("GET / should return a list of fines", async () => {
        const res = await axios.get(`${api}/fines`);
        expect(res.status).toBe(200);
        expect(Array.isArray(res.data)).toBe(true);
    });

    test("DELETE /:id should delete a fine", async () => {
        // Criamos uma multa com o ID dinâmico
        const res = await axios.post(`${api}/fines`, {
            loan_id: dynamicLoanId,
            fineType: "Deletion Test",
            amount: 15.00
        });
        const fineId = res.data.id;

        const deleteRes = await axios.delete(`${api}/fines/${fineId}`);
        expect(deleteRes.status).toBe(200);
        expect(deleteRes.data.message).toBe('Fine deleted successfully');
    });

    test("GET /:id should return a fine by their id", async () => {
        const newFine = await axios.post(`${api}/fines`, {
            loan_id: dynamicLoanId,
            fineType: "Detail Test",
            amount: 5.00
        });
        
        const fineId = newFine.data.id;

        try {
            const res = await axios.get(`${api}/fines/${fineId}`);
            expect(res.status).toBe(200);
            expect(res.data.id).toBe(fineId);
        } finally {
            await axios.delete(`${api}/fines/${fineId}`);
        }
    });

    test("DELETE /:id should return 404 when deleting a non-existent fine", async () => {
        try {
            await axios.delete(`${api}/fines/999999`);
        } catch (err) {
            expect(err.response.status).toBe(404);
        }
    });
});