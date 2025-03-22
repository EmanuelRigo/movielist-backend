import userModel from "./models/user.model.js";

class UserDao {

    async getAll() {
        const movies = await userModel.find().lean();
        return movies;
    }

    async getById(id) {
        const movie = await userModel.findById(id);
        return movie;
    }

    async getByEmail(email) {
        const user = await userModel.findOne({email: email});
        return user;}

    async create(data) {
        const movie = await userModel.create(data)
        return movie;
    }

    async update(id, data) {
        const movie = await userModel.findByIdAndUpdate(id, data, {new: true});
        return movie;
    }

    async deleteOne(id) {
        const movie = await userModel.findByIdAndDelete(id);
        return movie;
    }
}

export const userDao = new UserDao();