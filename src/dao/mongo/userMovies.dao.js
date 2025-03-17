import userMoviesModel from "./models/userMovies.model.js";

class UserMoviesDao {
  async getAll() {
    const movies = await userMoviesModel.find().lean();
    return movies;
  }

async getById(id) {
  const userMovies = await userMoviesModel
    .findById(id)
    .populate("movies._id"); // Realizar el populate para obtener los detalles de las películas

  return userMovies;
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
  console.log("🚀 ~ UserMoviesDao ~ addMovie ~ movie:", movie);
  console.log("🚀 ~ UserMoviesDao ~ addMovie ~ user_id:", user_id);

  // Agregar la película al array `movies` sin realizar verificaciones
  const updatedUserMovies = await userMoviesModel.findOneAndUpdate(
    { user_id: user_id },
    { $push: { movies: movie } },
    { new: true} // `upsert: true` asegura que se cree el documento si no existe
  );

  return updatedUserMovies;
}


}

export const userMoviesDao = new UserMoviesDao();