import userMoviesModel from "./models/userMovies.model.js";

class UserMoviesDao {

    async getAll() {
        const movies = await userMoviesModel.find().lean();
        return movies;
    }

    async getById(id) {
        const movie = await userMoviesModel.findById(id);
        return movie;
    }

    async getByEmail(email) {
        console.log("🚀 ~ UserDao ~ getByEmail ~ email:", email)
        const user = await userMoviesModel.findOne({email: email});
        return user;}

    async create(data) {
        const movie = await userMoviesModel.create(data)
        return movie;
    }

    async update(id, data) {
        const movie = await userMoviesModel.findByIdAndUpdate(id, data, {new: true});
        return movie;
    }

    async deleteOne(id) {
        const movie = await userMoviesModel.findByIdAndDelete(id);
        return movie;
    }
}

export const userMoviesDao = new UserMoviesDao();