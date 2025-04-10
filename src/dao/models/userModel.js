import mongoose from "mongoose";

const schema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String},
    github:{type:Boolean, default:false},
    role: {type: String, default: "user"}
})

schema.set('minimize', false)

export const userModel = mongoose.model("users", schema)