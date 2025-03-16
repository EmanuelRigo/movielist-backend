import userMoviesServices from "../services/userMovies.services.js";
import moviesServices from "../services/movies.services.js";
import jwt from "jsonwebtoken";
import envsUtils from "../utils/envs.utils.js";

class UserMoviesController {
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
}

export const userMoviesController = new UserMoviesController()