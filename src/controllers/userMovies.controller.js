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
    const data = req.body;
    const { id, formats, checked, _id } = req.body;

    try {
      // Verificar si la cookie `token` está presente
      const token = req.cookies.token;
      if (!token) {
        return res.json401("No token provided");
      }

      // Decodificar el token para obtener el `user_id`
      const decoded = jwt.verify(token, envsUtils.SECRET_KEY);
      const user_id = decoded.user_id;

      // Verificar si la película ya existe
      const existingMovie = await moviesServices.getByIdAPI(id);

      if (existingMovie) {       
       const existingUserMovie = await userMoviesServices.getByUserId(user_id);     
        if (existingUserMovie.movies.find((movie) => movie._id._id.toString() === existingMovie._id.toString())) {
          return res.json200(existingUserMovie, "Movie already exists in userMovies")
        }
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

  // Crear la nueva película
  const newMovie = await moviesServices.create(data);
      console.log("🚀🚀🚀🚀🚀🚀 ~ UserMoviesController ~ addMovie ~ newMovie:", newMovie._id, "title", newMovie.title)
      
  // Asegurarte de que `newMovie` se haya creado antes de continuar
  if (!newMovie || !newMovie._id) {
    throw new Error("Failed to create new movie");
  }

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

  async getByToken(req, res) {
    try {
      const token = req.cookies.token;
      console.log("🚀 ~ UserMoviesController ~ getByToken ~ token:", token)
      if (!token) {
        return res.json401("No token provided");
      }
      
      // Decodificar el token para obtener el `user_id`
      const decoded = jwt.verify(token, envsUtils.SECRET_KEY);
      console.log("🚀 ~ UserMoviesController ~ getByToken ~ decoded:", decoded)
      const user_id = decoded.user_id;
      console.log("🚀 ~ UserMoviesController ~ getByToken ~ user_id:", user_id)

      // Obtener las películas del usuario
      const userMovies = await userMoviesServices.getByUserId(user_id);
      return res.json201(userMovies, "User movies read");
    } catch (error) {
      console.error("Error in getByToken:", error);
      return res.json500("Internal Server Error");
    }
  }

  async getByTokenAndMovie(req, res) {
    try {
      const token = req.cookies.token;
      if (!token) {
        return res.json401("No token provided");
      }

      const decoded = jwt.verify(token, envsUtils.SECRET_KEY);
      const user_id = decoded.user_id;

      const mid = req.params.mid;
      const userMovies = await userMoviesServices.getByUserIdAndMovieId(
        user_id,
        mid
      );
      return res.json201(userMovies, "User movies read");
    } catch (error) {
      console.error("Error in getByTokenAndMovie:", error);
      return res.json500("Internal Server Error");
    }
  }
}

export const userMoviesController = new UserMoviesController();
