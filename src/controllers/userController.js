const { createUser, getAllUsers: fetchAllUsers, getUserById, deleteUser, updateUser } = require('../services/userService');

const create = async (req, res) => {
    const {nome, email, senha, tipo} = req.body;

    if (!nome || !email || !senha || !tipo) {
        return res.status(400).json({error: 'All fields are required'});
    }

    try {
        const newUser = await createUser(nome, email, senha, tipo);
        res.status(201).json(newUser);
    } catch (error) {
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(400).json({error: 'Email already in use'});
        }
        res.status(500).json({error: error.message});
    }
}

const getAllUsers = async (req, res) => {
    const users = await fetchAllUsers();
    return res.status(200).json(users);
}

const getById = async (req, res) => {
    try {
        const {id} = req.params;
        const user = await getUserById(id);
        if (!user) {
            return res.status(404).json({error: 'User not found'});
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

const atualizar = async (req, res) => {
    try {
        const {id} = req.params;
        const user = await updateUser(id, req.body);
        res.status(200).json(user);
    } catch (error) {
        if (error.message === 'User not found') {
            return res.status(404).json({error: 'User not found'});
        }
        res.status(500).json({error: error.message});
    }
}

const deletar = async (req, res) => {
    const {id} = req.params;

    try {
        await deleteUser(id);
        res.status(200).json({message: 'User deleted successfully'});
    } catch (error) {
        if (error.message === 'User not found') {
            return res.status(404).json({error: 'User not found'});
        }
        res.status(500).json({error: error.message});
    }
}

module.exports = { create, getAllUsers, getById, atualizar, deletar };