import { Rent } from '../models/rent.js';
import { User } from '../models/user.js';
import { Bike } from '../models/bike.js';

export const getAllRentsService = async (request, response) => {
    const rents = await Rent.find();
    return rents;
}

export const createRentService = async ({ landlord, renter, bike, startDate, endDate, rentPrice }) => {

    const userLandlord = await User.findById(landlord);
    if (!userLandlord) {
        throw new Error('Usuário locador não encontrado!');
    }

    if (userLandlord.role != "Locador") {
        throw new Error('Usuário dono da bicicleta não está registrado como locador!');
    }

    const userRenter = await User.findById(renter);
    if (!userRenter) {
        throw new Error('Usuário locatário não encontrado!');
    }

    if (userRenter.role != "Locatario") {
        throw new Error('Usuário que deseja alugar a bicicleta não está registrado como locatário!');
    }

    const bikeExists = await Bike.findById(bike);
    if (!bikeExists) {
        throw new Error('Bicicleta não encontrada!');
    }

    if (endDate <= startDate)
        throw new Error('Datas incorretas!');

    await Bike.findByIdAndUpdate(bike, { available: false });

    const rent = await Rent.create({
        landlord,
        renter,
        bike,
        active: true,
        startDate,
        endDate,
        rentPrice
    });

    return rent;
};

export const devolutionRentService = async (rentId) => {
    const rentExists = await Rent.findById(rentId);
    if (!rentExists) {
        throw new Error('Aluguel não encontrado!');
    }
    const bikeId = rentExists.bike;
    await Bike.findByIdAndUpdate(bikeId, { available: true });
    await Rent.findByIdAndUpdate(rentId, { active: false});

    return { message: 'Bicicleta devolvida e aluguel concluído!' };
};

export const getRentsByLandlordIdService = async (userId) => {
    const user = await User.findById(userId);
    if (!user) {
        throw new Error('Usuário locador não encontrado!');
    }

    const rents = await Rent.find({ landlord: userId }).populate('bike');
    return rents;
};

export const getRentsByRenterIdService = async (userId) => {
    const user = await User.findById(userId);
    if (!user) {
        throw new Error('Usuário locatário não encontrado!');
    }

    const rents = await Rent.find({ renter: userId }).populate('bike');
    return rents;
};

export const deleteRentByIDService = async (rentId) => {
    const rentExists = await Rent.findById(rentId);
    if (!rentExists) {
        throw new Error('Aluguel não encontrado!');
    }
    const bikeId = rentExists.bike;
    await Bike.findByIdAndUpdate(bikeId, { available: true });
    await Rent.deleteOne({ _id: rentId });
    return;
};

export const deleteAllRentsFromAllUsersService = async (id) => {
    await Rent.deleteMany({});
    return;
};

export const deleteAllRentsByUserIDService = async (id) => {

    await Rent.deleteMany({$or: [{ landlord: id }, { renter: id }]});
    return;
};