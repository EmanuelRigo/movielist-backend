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

  async getByUserId(user_id) {
    const userMovies = await userMoviesModel
    .findOne({ user_id: user_id })
    .populate("movies._id"); 
    return userMovies
  }// Realizar el populate para obtener los detalles de las películas}


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

async addMovie(user_id, movie) {
  const updatedUserMovies = await userMoviesModel.findOneAndUpdate(
    { user_id: user_id },
    { $push: { movies: movie } },
    { new: true}
  );

  return updatedUserMovies;
}


}

export const userMoviesDao = new UserMoviesDao();