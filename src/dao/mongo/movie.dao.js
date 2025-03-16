import movieModel from "./models/movies.model.js";

class MovieDao {

    async getAll() {
        const movies = await movieModel.find();
        return movies;
    }

    async getById(id) {
        const movie = await movieModel.findById(id);
        return movie;
    }

    async getByIdAPI(id) {
        const movie = await movieModel.findOne({id});
        return movie;
    }

    async create(data) {
        const movie = await movieModel.create(data)
        return movie;
    }

    async update(id, data) {
        const movie = await movieModel.findByIdAndUpdate(id, data, {new: true});
        return movie;
    }

    async deleteOne(id) {
        const movie = await movieModel.findByIdAndDelete(id);
        return movie;
    }

}

const movieDao = new MovieDao()
export default movieDao