import mongoose from "mongoose";

const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

const UserSchema = new Schema({
    _id: ObjectId,
    FirstName: String,
    LastName: String,
    username: { type: String, unique: true },
    password: String,
    email: { type: String, unique: true },
})