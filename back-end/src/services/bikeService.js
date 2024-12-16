import { Bike } from "../models/bike.js"
import { Rent } from "../models/rent.js";

export const createBikeService = async ({ landlord, brand, model, weight, description, observations, price, accessories, registerDate, images, region }) => {    
    
    const bike = await Bike.create({
        landlord,
        brand,
        model,
        weight,
        description,
        observations,
        price,
        accessories,
        registerDate,
        images,
        region
    });
    return bike;
};

export const getAllBikesService = async () => {

    const bikes = await Bike.find();
    return bikes;
};

export const getBikeByIDService = async (id) => {

    const bikeById = await Bike.find({ _id: id });
    return bikeById;
};

export const getBikeByLandlordService = async (landlord) => {

    const bikes = await Bike.find({ landlord: landlord });
    return bikes;
};

export const getBikeByBrandService = async (brand) => {

    const bikeByBrand = await Bike.find({ brand: brand });
    return bikeByBrand;
};

export const getBikeByModelService = async (model) => {

    const bikeByModel = await Bike.find({ model: model });
    return bikeByModel;
};
export const updateBikeByIDService = async (id, { landlord, brand, model, weight, description, observations, price, accessories, registerDate }) => {

    const bikeUpdated = await Bike.findByIdAndUpdate({ _id: id }, { landlord, brand, model, weight, description, observations, price, accessories, registerDate }, { new: true });
    return bikeUpdated;
};

export const deleteBikeByIDService = async (id) => {

    await Bike.deleteOne({ _id: id });
    await Rent.deleteMany ({ bike: id });
    return;
};

export const deleteAllBikesByLandlordIDService = async (id) => {

    await Bike.deleteMany({ landlord: id });
    return;
};

export const deleteAllBikesService = async () => {
    await Bike.deleteMany({});
    return;
};

export const deleteAllBikesFromAllUsersService = async () => {
    await Bike.deleteMany({});
    return;
};