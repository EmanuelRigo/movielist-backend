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

  async addMovie(user_id, movie) {
    console.log("🚀 ~ UserMoviesServices ~ addMovie ~ user_id:", user_id);
    console.log("🚀 ~ UserMoviesServices ~ addMovie ~ movie:", movie);

    // Delegar la operación al DAO
    return await userMoviesDao.addMovie(user_id, movie);
  }

  async getByUserId(user_id) {
    // Método adicional para obtener el documento `userMovies` por `user_id`
    return await userMoviesDao.getByUserId(user_id);
  }
}

const userMoviesServices = new UserMoviesServices();
export default userMoviesServices;