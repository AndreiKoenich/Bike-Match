import { User } from "../models/user.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

export const loginUser = async ({ login, password }) => {
    const user = await User.findOne({ login });

    if (!user) {
        throw new Error('Usuário não encontrado');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        throw new Error('Senha inválida');
    }

    const token = jwt.sign(
        { id: user._id, login: user.login, role: user.role },
        'secretKey',
        { expiresIn: '1h' }
    );

    console.log('Usuário logado com sucesso!')
    return token;
};


export const createUserService = async (userData) => {
    const { password } = userData;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({ ...userData, password: hashedPassword });
    return user;
};

export const getAllUsersService = async (request, response) => {

    const users = await User.find();
    return users;
};

export const getUserByIDService = async (id) => {

    const userById = await User.findOne({ _id: id });
    return userById;
};

export const getUserByNameService = async (name) => {

    const userByName = await User.find({ name: name });
    return userByName;
};

export const updateUserByIDService = async (id, { name, age, cpf, email, login, password, role }) => {
    const hashedPassword = await bcrypt.hash(password, 10);

    const userUpdated = await User.findByIdAndUpdate({ _id: id }, { name, age, cpf, email, login, password: hashedPassword, role }, { new: true });
    return userUpdated;
};

export const deleteUserByIDService = async (id) => {

    await User.deleteOne({ _id: id });
    return;
};

export const deleteAllUsersService = async (request, response) => {
    await User.deleteMany({});
    return;
}
