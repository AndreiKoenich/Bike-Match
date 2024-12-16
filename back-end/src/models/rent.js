import mongoose from "mongoose";

const Schema = mongoose.Schema;

const RentSchema = new Schema({
    landlord: { type: Schema.Types.ObjectId, ref: 'User' },
    renter: { type: Schema.Types.ObjectId, ref: 'User' },
    bike: { type: Schema.Types.ObjectId, ref: 'Bike' },
    active: Boolean,
    startDate: Date,
    endDate: Date,
    rentPrice: Number
});

export const Rent = mongoose.model('Rent', RentSchema);