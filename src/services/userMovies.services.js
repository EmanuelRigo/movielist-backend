import { userMoviesDao } from "../dao/mongo/userMovies.dao.js";

class UserMoviesServices {
  async getAll() {
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

  async removeMovie(uid, mid) {
    try {
      const userMovies = await userMoviesDao.getByUserId(uid);
      if (!userMovies) {
        throw new Error("User movies not found");
      }
      const movieIndex = userMovies.movies.findIndex(
        (movie) => movie._id._id.toString() === mid
      );
      if (movieIndex === -1) {
        throw new Error("Movie not found in user's movies");
      }
      userMovies.movies.splice(movieIndex, 1);
      await userMovies.save();
      return userMovies;
    } catch (error) {
      console.error("Error in removeMovie service:", error);    
      throw error;
    }}

  async update(id, data) {
    return await userMoviesDao.update(id, data);
  }

  async addMovie(user_id, movie) {
    return await userMoviesDao.addMovie(user_id, movie);
  }

  async getByUserId(user_id) {
    // Método adicional para obtener el documento `userMovies` por `user_id`
    return await userMoviesDao.getByUserId(user_id);
  }

  async getByUserIdAndMovieId(user_id, movie_id) {
    // Método adicional para obtener el documento `userMovies` por `user_id` y `movie_id`
    try {
      const userMovies = await userMoviesDao.getById(user_id)
      console.log("🚀 ~ UserMoviesServices ~ getByUserIdAndMovieId ~ userMovies:", userMovies)
      const userMovie = userMovies.movies.find(_id == movie_id)
      console.log("🚀 ~ UserMoviesServices ~ getByUserIdAndMovieId ~ movie:", userMovie)
      return userMovie
    } catch (error){
      console.error("Error in getUserMovie", error)
      throw error
    }
  }

  async updateMovie(user_id, movie_id, data) {
    try {
      const userMovies = await userMoviesDao.getByUserId(user_id);
      if (!userMovies) {
        throw new Error("User movies not found");
      }
  
      const movie = userMovies.movies.find(
        (m) => m._id._id.toString() === movie_id
      );
      if (!movie) {
        throw new Error("Movie not found in user's movies");
      }
  
      // Actualizar los campos de la película
      Object.assign(movie, data);
  
      // Guardar los cambios
      await userMovies.save();
  
      // Retornar solo la película actualizada
      return movie;
    } catch (error) {
      console.error("Error in updateMovie service:", error);
      throw error;
    }
  }


}

const userMoviesServices = new UserMoviesServices();
export default userMoviesServices;
