const {createFine, getFineById, getAllFines: fetchAllFines, updateFine: serviceUpdateFine, deleteFine: serviceDeleteFine} = require('../services/fineService');

const create = async (req, res) => {
    const {loan_id, fineType, amount} = req.body;

    if (!loan_id || !fineType || !amount) {
        return res.status(400).json({error: 'All fields are required'});
    }

    try {
        const newFine = await createFine(loan_id, fineType, amount);
        res.status(201).json(newFine);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

const getAllFines = async (req, res) => {
    const fines = await fetchAllFines();
    return res.status(200).json(fines);
}

const getbyId = async (req, res) => {
    try {
        const {id} = req.params;
        const fine = await getFineById(id);
        if (!fine) {
            return res.status(404).json({error: 'Fine not found'});
        }
        res.status(200).json(fine);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

const update = async (req, res) => {
    try {
        const {id} = req.params;
        const fine = await serviceUpdateFine(id, req.body);
        res.status(200).json(fine);
    } catch (error) {
        if (error.message === 'Fine not found') {
            return res.status(404).json({error: 'Fine not found'});
        }
        res.status(500).json({error: error.message});
    }
}

const remove = async (req, res) => {
    const {id} = req.params;

    try {
        await serviceDeleteFine(id);
        res.status(200).json({message: 'Fine deleted successfully'});
    } catch (error) {
        if (error.message === 'Fine not found') {
            return res.status(404).json({error: 'Fine not found'});
        }
        res.status(500).json({error: error.message});
    }

}

module.exports = {create, getAllFines, getbyId, update, remove};