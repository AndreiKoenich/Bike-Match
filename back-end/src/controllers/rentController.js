import { httpStatusCode } from '../enums/httpStatusCode.js';
import * as rentService from '../services/rentService.js';

export const getAllRents = async (request, response) => {

    const rents = await rentService.getAllRentsService();
    return response.status(httpStatusCode.OK).json(rents);
};

export const createRent = async (request, response) => {
    const { landlord, renter, bike, active, startDate, endDate, rentPrice } = request.body;
    const rent = rentService.createRentService({ landlord, renter, bike, active, startDate, endDate, rentPrice });
    console.log('Aluguel criado com sucesso!');
    return response.status(httpStatusCode.CREATED).json(rent);
};

export const devolutionRent = async (request, response) => {
    const { rent_id } = request.body;

    const devolution = rentService.devolutionRentService(rent_id);
    console.log('Devolução da bicicleta realizada com sucesso!');
    return response.status(httpStatusCode.OK).json(devolution);
};

export const getRentsByLandlordId = async (request, response) => {
    const { userId } = request.params;
    const rents = await rentService.getRentsByLandlordIdService(userId);
    
    return response.status(httpStatusCode.OK).json(rents);
};

export const getRentsByRenterId = async (request, response) => {
    const { userId } = request.params;
    const rents = await rentService.getRentsByRenterIdService(userId);
    
    return response.status(httpStatusCode.OK).json(rents);
};

export const deleteAllRentsByUserID = async (request, response, next) => {

    await rentService.deleteAllRentsByUserIDService(request.params.id);
    console.log('Todos os aluguéis do usuário foram deletados com sucesso!');
    next();
    return;
};

export const deleteRentByID = async (request, response, next) => {

    await rentService.deleteRentByIDService(request.params.id);
    console.log('Aluguel deletado com sucesso!');
    return;
};

export const deleteAllRentsFromAllUsers = async (request, response, next) => {

    await rentService.deleteAllRentsFromAllUsersService(request.params.id);
    console.log('Todos os aluguéis foram deletados com sucesso!');
    next();
    return;
};