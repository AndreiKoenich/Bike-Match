import mongoose from "mongoose";

const Schema = mongoose.Schema;

const BikeSchema = new Schema({
    landlord: { type: Schema.Types.ObjectId, ref: 'User' },
    brand: String,
    model: String,
    weight: Number,
    description: String,
    observations: String,
    price: Number,
    available: { type: Boolean, default: true },
    region: String,
    accessories: {
        basket: { type: Boolean, default: false },
        lights: { type: Boolean, default: false },
        fenders: { type: Boolean, default: false },
        bottleHolder: { type: Boolean, default: false },
        bell: { type: Boolean, default: false },
        lock: { type: Boolean, default: false },
        phoneHolder: { type: Boolean, default: false },
        saddleBag: { type: Boolean, default: false },
        comfortableSeat: { type: Boolean, default: false },
        mirrors: { type: Boolean, default: false },
        clipPedals: { type: Boolean, default: false },
        suspension: { type: Boolean, default: false },
        rearRack: { type: Boolean, default: false },
        chainGuard: { type: Boolean, default: false },
        onboardComputer: { type: Boolean, default: false },
        helmet: { type: Boolean, default: false },
        gloves: { type: Boolean, default: false }
    },
    registerDate: String,
    images: [String]
});

export const Bike = mongoose.model('Bike', BikeSchema);