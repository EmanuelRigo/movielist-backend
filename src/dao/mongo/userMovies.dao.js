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
    console.log("🚀 ~ UserDao ~ getByEmail ~ email:", email);
    const user = await userMoviesModel.findOne({ email: email });
    return user;
  }

  async create(data) {
    const movie = await userMoviesModel.create(data);
    return movie;
  }

  async update(id, data) {
    const movie = await userMoviesModel.findByIdAndUpdate(id, data, { new: true });
    return movie;
  }

  async deleteOne(id) {
    const movie = await userMoviesModel.findByIdAndDelete(id);
    return movie;
  }

  // Nuevo método: addMovie
  async addMovie(user_id, movie) {
  console.log("🚀 ~ UserMoviesDao ~ addMovie ~ movie:", movie)
  console.log("🚀 ~ UserMoviesDao ~ addMovie ~ user_id:", user_id)

    
    const user = await userMoviesModel.findOne({ user_id });
    console.log("🚀 ~ UserMoviesDao ~ addMovie ~ user", user)
    // Verificar si la película ya existe en el array `movies`
    const userMovies = await userMoviesModel.findOne({
      user_id,
      "movies.id": movie.id,
    });

    if (userMovies) {
      // Si la película ya existe, no hacer nada o actualizar los datos existentes
      return userMovies;
    }

    // Si la película no está en el array, agregarla
    const updatedUserMovies = await userMoviesModel.findOneAndUpdate(
      { user_id },
      { $push: { movies: movie } },
      { new: true, upsert: true } // `upsert: true` asegura que se cree el documento si no existe
    );

    return updatedUserMovies;
  }


}

export const userMoviesDao = new UserMoviesDao();