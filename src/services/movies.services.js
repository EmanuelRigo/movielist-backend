import movieDao from "../dao/mongo/movie.dao.js";

class MoviesServices {
    async getAll(filter, options) {
        return await movieDao.getAll();
    }

    async getById(id) {
        return await movieDao.getById(id);
    }

    async create(data) {
        return await movieDao.create(data);
    }

    async deleteOne(id) {
        return await movieDao.deleteOne(id);
    }

    async update(id, data) {
        return await movieDao.update(id, data);
    }
}

const moviesServices = new MoviesServices();
export default moviesServices;