const User = require('../models/user');

const createUser = async (nome, email, senha, tipo) => {
    const user = await User.create({ nome, email, senha, tipo });
    return {
        id: user.id,
        nome: user.nome,
        email: user.email,
        tipo: user.tipo,
    };
}

const getUserById = async (id) => {
    return await User.findByPk(id);
}

const getAllUsers = async () => {
    return await User.findAll();
}

const deleteUser = async (id) => {
    const user = await getUserById(id);
    if (!user) {
        throw new Error('User not found');
    }
    await user.destroy();
}

const updateUser = async (id, dados) => {
    const user = await getUserById(id);
    if (!user) {
        throw new Error('User not found');
    }
    Object.assign(user, dados);
    await user.save();
    return user;
}

module.exports = { createUser, getUserById, getAllUsers, deleteUser, updateUser };