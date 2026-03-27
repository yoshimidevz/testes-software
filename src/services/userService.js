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

const updateUser = async (id, nome, email, senha, tipo) => {
    const user = await getUserById(id);
    if (!user) {
        throw new Error('User not found');
    }
    user.nome = nome;
    user.email = email;
    user.senha = senha;
    user.tipo = tipo;
    await user.save();
    return user;
}

module.exports = { createUser, getUserById, getAllUsers, deleteUser, updateUser };