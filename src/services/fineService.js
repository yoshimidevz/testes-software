const Fine = require('../models/fine');

const createFine = async (idLoan, fineType, amount) => {
    const fine = await Fine.create({ loan_id: idLoan, fineType, amount });
    return {
        id: fine.id,
        loan_id: fine.loan_id,
        amount: fine.amount,
        fineType: fine.fineType,
        paid: fine.paid,
    };
}

const getFineById = async (id) => {
    return await Fine.findByPk(id);
}

const getAllFines = async () => {
    return await Fine.findAll();
}

const deleteFine = async (id) => {
    const fine = await getFineById(id);
    if (!fine) {
        throw new Error('Fine not found');
    }
    await fine.destroy();
}

const updateFine = async (id, dados) => {
    const fine = await getFineById(id);
    if (!fine) {
        throw new Error('Fine not found');
    }
    Object.assign(fine, dados);
    await fine.save();
    return fine;
}

module.exports = { createFine, getFineById, getAllFines, deleteFine, updateFine };