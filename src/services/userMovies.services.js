import { userMoviesDao } from "../dao/mongo/userMovies.dao.js";

class UserMoviesServices {
    async getAll(filter, options) {
        return await userMoviesDao.getAll();
    }

    async getById(id) {
        return await userMoviesDao.getById(id);
    }

    async getByEmail(email) {
        return await userMoviesDao.getByEmail(email);
    }

    async create(data) {
        return await userMoviesDao.create(data);
    }

    async deleteOne(id) {
        return await userMoviesDao.deleteOne(id);
    }

    async update(id, data) {
        return await userMoviesDao.update(id, data);
    }
}

const userMoviesServices = new UserMoviesServices()
export default userMoviesServices