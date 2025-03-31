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
    const { id, formats } = req.body;
  
    try {
      const token = req.cookies.token;
      if (!token) {
        return res.json401("No token provided");
      }
  
      const decoded = jwt.verify(token, envsUtils.SECRET_KEY);
      const user_id = decoded.user_id;
  
      async function checkExistsInUserMovies(movieToAdd) {
        console.log("🚀 ~ UserMoviesController ~ checkExistsInUserMovies ~ movieToAdd:", movieToAdd);
  
        const existingUserMovie = await userMoviesServices.getByUserId(user_id);
        if (
          existingUserMovie.movies.find(
            (movie) => movie._id._id.toString() === movieToAdd._id.toString()
          )
        ) {
          console.log("::::: YA EXISTE::::::::");
          return res.json200(
            existingUserMovie,
            "Movie already exists in userMovies"
          );
        } else {
          const updatedUserMovies = await userMoviesServices.addMovie(user_id, {
            _id: movieToAdd._id,
            checked: false,
            formats,
          });
          return res.json200(updatedUserMovies, "Added to userMovies");
        }
      }
  
      // Verificar si la película ya existe en la colección `movies`
      const existingMovie = await moviesServices.getByIdAPI(id);
      if (existingMovie) {
        return checkExistsInUserMovies(existingMovie); // Agregar `return` para detener la ejecución
      }
  
      // Crear la película si no existe y luego verificar
      console.log("dataaa:::!!", data)
      const newMovie = await moviesServices.create(data);
      return checkExistsInUserMovies(newMovie); // Agregar `return` para detener la ejecución
    } catch (error) {
      console.error("Error in addMovie:", error);
      return res.json500("Internal Server Error");
    }
  }

  async getByToken(req, res) {
    try {
      const token = req.cookies.token;
      if (!token) {
        return res.json401("No token provided");
      }

      //Decode token for user id
      const decoded = jwt.verify(token, envsUtils.SECRET_KEY);
      const user_id = decoded.user_id;

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
  
      const mid = req.params.mid; // ID de la película
      const userMovies = await userMoviesServices.getByUserId(user_id);
      console.log("🚀 ~ UserMoviesController ~ getByTokenAndMovie ~ userMovies:", userMovies.movies);
  
      // Buscar la película específica en el array `movies`
      const userMovie = userMovies.movies.find((movie) => movie._id._id.toString() === mid);
      console.log("🚀 ~ UserMoviesController ~ getByTokenAndMovie ~ userMovie:", userMovie)
  
      if (!userMovie) {
        return res.json404("Movie not found in user's movies");
      }
      
      return res.json201(userMovie, "User movie read");
    } catch (error) {
      console.error("Error in getByTokenAndMovie:", error);
      return res.json500("Internal Server Error");
    }
  }

  async updateMovie(req, res) {
    try {
      const token = req.cookies.token;
      const decoded = jwt.verify(token, envsUtils.SECRET_KEY);
      const user_id = decoded.user_id;

      if (!user_id) {
        return res.json401("Invalid token");
      }

      const mid = req.params.mid;
      const data = req.body;
      const userMovies = await userMoviesServices.updateMovie(
        user_id,
        mid,
        data
      );
      return res.json200(userMovies, "ok");
    } catch (error) {
      console.error("Error in updateMovie:", error);
      return res.json500("Internal Server Error");
    }
  }

  async removeMovie(req, res) {
    try {
      const token = req.cookies.token;
      if (!token) {
        return res.json401("No token provided");
      }
      const decoded = jwt.verify(token, envsUtils.SECRET_KEY);
      const uid = decoded.user_id;
      const mid = req.params.mid;
      const userMovies = await userMoviesServices.removeMovie(uid, mid);
      return res.json200(userMovies, "Movie removed");
    } catch (error) {
      console.error("Error in removeMovie:", error);
      return res.json500("Internal Server Error");
    }
  }
}

export const userMoviesController = new UserMoviesController();
