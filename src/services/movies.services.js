import MovieDao from "../dao/mongo/movie.dao"

export class MoviesServices {

    async getAll(filter, options) {
        return await MovieDao.getAll()
    }

    async getById(id) {
        return await MovieDao.getById(id)
    }

    async create(data) {
        return await productDao.create(data)
    }

    async deleteOne(id) {
        return await MovieDao.deleteOne(id)
    }

    async update(id, data) {
        return await MovieDao.update(id, data)
    }

   

}

export const moviesServices = new MoviesServices()