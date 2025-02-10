import MovieDao from "../dao/mongo/movie.dao.js";

class MoviesServices {
    async getAll(filter, options) {
        return await MovieDao.getAll();
    }

    async getById(id) {
        return await MovieDao.getById(id);
    }

    async create(data) {
        return await MovieDao.create(data);
    }

    async deleteOne(id) {
        return await MovieDao.deleteOne(id);
    }

    async update(id, data) {
        return await MovieDao.update(id, data);
    }
}

const moviesServices = new MoviesServices();
export default moviesServices;