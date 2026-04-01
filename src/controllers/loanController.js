const { createLoan, getAllLoans: fetchALlLoans, getLoanById, deleteLoan, updateLoan } = require('../services/loanService');

const create = async (req, res) => {
    const {book_id, user_id, return_date} = req.body;

    if (!book_id || !user_id || !return_date) {
        return res.status(400).json({error: 'All fields are required'});
    }

    try {
        const newLoan = await createLoan(book_id, user_id, return_date);
        res.status(201).json(newLoan);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

const getAllLoans = async (req, res) => {
    const loans = await fetchALlLoans();
    return res.status(200).json(loans);
}

const getById = async (req, res) => {
    try {
        const {id} = req.params;
        const loan = await getLoanById(id);
        if (!loan) {
            return res.status(404).json({error: 'Loan not found'});
        }
        res.status(200).json(loan);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

const atualizar = async (req, res) => {
    try {
        const {id} = req.params;
        const loan = await updateLoan(id, req.body);
        res.status(200).json(loan);
    } catch (error) {
        if (error.message === 'Loan not found') {
            return res.status(404).json({error: 'Loan not found'});
        }
        res.status(500).json({error: error.message});
    }
}

const deletar = async (req, res) => {
    const {id} = req.params;

    try {
        await deleteLoan(id);
        res.status(200).json({message: 'Loan deleted successfully'});
    } catch (error) {
        if (error.message === 'Loan not found') {
            return res.status(404).json({error: 'Loan not found'});
        }
        res.status(500).json({error: error.message});
    }
}

module.exports = { create, getAllLoans, getById, atualizar, deletar };