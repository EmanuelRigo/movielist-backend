import userMoviesServices from "../services/userMovies.services.js";
import moviesServices from "../services/movies.services.js";
import jwt from "jsonwebtoken";
import envsUtils from "../utils/envs.utils.js";

class UserMoviesController {
  async getAll(req, res) {
    const response = await userMoviesServices.getAll();
    const message = "movies read";
    return res.json201(response, message);
  }

  async getById(req, res) {
    const id = req.params.id;
    const response = await userMoviesServices.getById(id);
    const message = "userMovie read";
    if (response) {
      return res.json201(response, message);
    } else {
      return res.json404();
    }
  }

  async addMovie(req, res) {
    const { id, formats, checked, _id } = req.body;

    try {
      // Verificar si la cookie `token` está presente
      const token = req.cookies.token;
      console.log("🚀 ~ UserMoviesController ~ addMovie ~ token:", token)
      if (!token) {
        return res.json401("No token provided");
      }

      // Decodificar el token para obtener el `user_id`
      const decoded = jwt.verify(token, envsUtils.SECRET_KEY);
      const user_id = decoded.user_id;
      console.log("🚀 ~ UserMoviesController ~ addMovie ~ user_id:", user_id)

      // Verificar si la película ya existe
      const existingMovie = await moviesServices.getByIdAPI(id);

      console.log("🚀 ~ UserMoviesController ~ addMovie ~ existingMovie:", existingMovie.title)
      if (existingMovie) {
        console.log("🚀 ~ UserMoviesController ~ addMovie ~ existingMovie SI EXISTE:", existingMovie.title)
        
        // Si la película ya existe, agregarla al array `movies` del usuario
        const updatedUserMovies = await userMoviesServices.addMovie(user_id, {
          _id: existingMovie._id, // Usar el `_id` generado por MongoDB
          checked: false,
          formats,
        });

        return res.json200(
          updatedUserMovies,
          "Movie already exists, added to userMovies"
        );
      }

      // Si la película no existe, crearla
      const newMovie = await moviesServices.create({
        id,
        formats,
        checked,
      });

      // Agregar la nueva película al array `movies` del usuario
      const updatedUserMovies = await userMoviesServices.addMovie(user_id, {
        _id: newMovie._id, // Usar el `_id` generado por MongoDB
        checked,
        formats,
      });

      return res.json201(
        updatedUserMovies,
        "Movie created and added to userMovies"
      );
    } catch (error) {
      console.error("Error in addMovie:", error);
      return res.json500("Internal Server Error");
    }
  }
}

export const userMoviesController = new UserMoviesController();
