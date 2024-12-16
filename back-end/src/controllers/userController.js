import { httpStatusCode } from '../enums/httpStatusCode.js';
import * as userService from "../services/userService.js";

export const updateUserByIDController = userService.updateUserByID;
export const deleteUserByIDController = userService.deleteUserByID;
export const deleteAllUsersController = userService.deleteAllUsers;

export const createUser = async (request, response) => {
    const userData = request.body;
    const user = await userService.createUserService(userData);
    console.log('Usuário criado com sucesso!');
    return response.status(httpStatusCode.CREATED).json({ message: 'Usuário criado com sucesso!', user });
};

export const loginUser = async (request, response) => {
    try {
        const { login, password } = request.body;
        const token = await userService.loginUser({ login, password });
        return response.status(httpStatusCode.OK).json({ token });
    } catch (error) {
        if (error.message === 'Usuário não encontrado' || error.message === 'Senha inválida') {
            return response.status(httpStatusCode.UNAUTHORIZED).json({ message: 'Credenciais inválidas' });
        }

        return response.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({ message: 'Erro ao realizar login', error: error.message });
    }
};

export const getAllUsers = async (request, response) => {
    const users = await userService.getAllUsersService();
    return response.status(httpStatusCode.OK).json(users);
};

export const getUserByID = async (request, response) => {
    const user = await userService.getUserByIDService(request.params.id);
    return response.status(httpStatusCode.OK).json(user);
};

export const getUserByName = async (request, response) => {
    const user = await userService.getUserByNameService(request.params.name);
    return response.status(httpStatusCode.OK).json(user);
};

export const updateUserByID = async (request, response) => {

    const { name, age, cpf, email, login, password, role, registerDate } = request.body;
    const id = request.params.id;
    const userUpdated = await userService.updateUserByIDService(id, { name, age, cpf, email, login, password, role, registerDate });
    console.log('Usuário atualizado com sucesso!');
    return response.status(httpStatusCode.OK).json({ message: 'Usuário atualizado com sucesso!', userUpdated });
};

export const deleteUserByID = async (request, response, next) => {

    await userService.deleteUserByIDService(request.params.id);
    console.log('Usuário deletado com sucesso!');
    return response.status(httpStatusCode.NO_CONTENT).json();
};

export const deleteAllUsers = async (request, response) => {

    await userService.deleteAllUsersService();
    console.log('Todos os usuários foram deletados com sucesso!');
    return response.status(httpStatusCode.NO_CONTENT).json();
};

