import mongoose from "mongoose";

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: String,
    age: Number,
    cpf: String,
    email: String,
    login: String,
    password: String,
    role: String,
    registerDate: String
});

export const User = mongoose.model('User', UserSchema);
