import { httpStatusCode } from '../enums/httpStatusCode.js';
import * as bikeService from "../services/bikeService.js";

export const createBike = async (request, response) => {
    const { landlord, brand, model, weight, description, observations, price, accessories, registerDate, region } = request.body;
    const parsedAccessories = typeof accessories === 'string' ? JSON.parse(accessories) : accessories;

    const images = request.files.map(file => file.filename);

    const bike = await bikeService.createBikeService({
        landlord,
        brand,
        model,
        weight,
        description,
        observations,
        price,
        accessories: parsedAccessories,
        registerDate,
        images, 
        region
    });

    console.log('Bicicleta criada com sucesso!');
    return response.status(httpStatusCode.CREATED).json({ message: 'Bicicleta criada com sucesso!', bike });
};

export const getAllBikes = async (request, response) => {
    const bikes = await bikeService.getAllBikesService();
    return response.status(httpStatusCode.OK).json(bikes);
};

export const getBikeByID = async (request, response) => {

    const bikeByID = await bikeService.getBikeByIDService(request.params.id);
    return response.status(httpStatusCode.OK).json(bikeByID);
};

export const getBikeByLandlord = async (request, response) => {

    const bikeByLandlord = await bikeService.getBikeByLandlordService(request.params.landlord);
    return response.status(httpStatusCode.OK).json(bikeByLandlord);
};

export const getBikeByBrand = async (request, response) => {

    const bikeByBrand = await bikeService.getBikeByBrandService(request.params.brand);
    return response.status(httpStatusCode.OK).json(bikeByBrand);
};

export const getBikeByModel = async (request, response) => {

    const model = request.params.model;
    const bikeByModel = await bikeService.getBikeByModelService(request.params.model);
    return response.status(httpStatusCode.OK).json(bikeByModel);
};

export const updateBikeByID = async (request, response) => {
    const { landlord, brand, model, weight, description, observations, price, accessories, registerDate } = request.body;
    const id = request.params.id;
    const bikeUpdated = await bikeService.updateBikeByIDService(id, { landlord, brand, model, weight, description, observations, price, accessories, registerDate });
    console.log('Bicicleta atualizada com sucesso!');
    return response.status(httpStatusCode.OK).json({ message: 'Bicicleta atualizada com sucesso!', bikeUpdated });
};

export const deleteBikeByID = async (request, response) => {

    await bikeService.deleteBikeByIDService(request.params.id);
    console.log('Bicicleta deletada com sucesso! Todos os aluguéis relacionados com a bicicleta também foram removidos!');
    return response.status(httpStatusCode.NO_CONTENT).json();
};

export const deleteAllBikesByLandlordID = async (request, response, next) => {

    await bikeService.deleteAllBikesByLandlordIDService(request.params.id);
    console.log('Todas as bicicletas do usuário foram deletadas com sucesso!');
    next();
    return;
};

export const deleteAllBikes = async (request, response) => {

    await bikeService.deleteAllBikesService();
    console.log('Todas as bicicletas foram deletadas com sucesso!');
    return response.status(httpStatusCode.NO_CONTENT).json();
};

export const deleteAllBikesFromAllUsers = async (request, response) => {

    await bikeService.deleteAllBikesFromAllUsersService();
    console.log('Todas as bicicletas foram deletadas com sucesso, pois todos os usuários foram deletados!');
    next();
    return;
};
