import userMoviesServices from "../services/userMovies.services.js";

class MovieController {
  async getAll(req, res) {
    const response = await moviesServices.getAll();
    const message = "movies read";
    return res.json201(response, message);
  }

  async getById(req, res) {
    const mid = req.params.mid;
    const response = await moviesServices.getById(mid);
    const message = "movie read";
    if (response) {
      return res.json201(response, message);
    } else {
      return res.json404();
    }
  }

  async create(req, res) {
    const message = "movie created";
    const data = req.body;
    const response = await moviesServices.create(data);
    return res.json201(response, message);
  }

  async update(req, res) {
    const { mid } = req.params;
    const { formats, checked } = req.body;

    if (!formats) {
      const message = "Missing required fields";
      return res.json400(message);
    }

    if (!mongoose.Types.ObjectId.isValid(mid)) {
      return res.json404();
    }

    const message = "PRODUCT UPDATED";
    const response = await moviesServices.update(mid, { formats, checked });

    if (response) {
      return res.json201(response, message);
    } else {
      return res.json404();
    }
  }

  async deleteOne(req, res) {
    const { mid } = req.params;

    if (!mongoose.Types.ObjectId.isValid(mid)) {
      return res.json404();
    }

    const message = "movie deleted";
    const response = await moviesServices.deleteOne(mid);
    if (response) {
      return res.json201(response, message);
    } else {
      return res.json404();
    }
  }

  async addUserMovie(req, res) {
    const { user_id, movie_id, formats, checked } = req.body;

    try {
      // Verificar si ya existe una entrada en userMovies para este usuario
      let userMovies = await userMoviesServices.getByUserId(user_id);

      if (!userMovies) {
        // Si no existe, crear una nueva entrada
        userMovies = await userMoviesServices.create({
          user_id,
          movies: [],
        });
      }

      // Agregar la película a la lista del usuario
      const updatedUserMovies = await userMoviesServices.addMovie(user_id, {
        _id: movie_id,
        checked,
        formats,
      });

      return res.json201(updatedUserMovies, "Movie added to userMovies");
    } catch (error) {
      console.error("Error adding movie to userMovies:", error);
      return res.json500("Internal Server Error");
    }
  }
}

export const movieController = new MovieController();