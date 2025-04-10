import { userModel } from "./models/userModel.js";

export class UsersManager {

    static async create (user) {
        const newUser = await userModel.create(user)
        return newUser.toObject()
    }

    static async getBy (filter) {
        const findUser = await userModel.findOne(filter).lean()
        return findUser
    }
}