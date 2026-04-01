const Loan = require('../models/loan');

const createLoan = async (book_id, user_id, return_date) => {
    const loan = await Loan.create({ book_id, user_id, return_date });
    return {
        id: loan.id,
        book_id: loan.book_id,
        user_id: loan.user_id,
        return_date: loan.return_date,
    };
}

const getLoanById = async (id) => {
    return await Loan.findByPk(id);
}

const getAllLoans = async () => {
    return await Loan.findAll();
}

const deleteLoan = async (id) => {
    const loan = await getLoanById(id);
    if (!loan) {
        throw new Error('Loan not found');
    }
    await loan.destroy();
}

const updateLoan = async (id, dados) => {
    const loan = await getLoanById(id);
    if (!loan) {
        throw new Error('Loan not found');
    }
    Object.assign(loan, dados);
    await loan.save();
    return loan;
}

module.exports = { createLoan, getLoanById, getAllLoans, deleteLoan, updateLoan };