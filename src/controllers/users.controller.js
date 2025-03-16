import mongoose from "mongoose";
import userServices from "../services/users.services.js";
import userMoviesServices from "../services/userMovies.services.js";

class UserController {
  async create(req, res) {
    const message = "USER CREATED";
    const data = req.body;

    try {
      // Crear el usuario
      const user = await userServices.create(data);
      console.log("user", user);
      // Crear automáticamente una entrada en userMovies para el usuario recién creado
      const usermoviess = await userMoviesServices.create({
        user_id: user._id,
        movies: [],
      });
      console.log("🚀 ~ UserController ~ create ~ usermoviess:", usermoviess)


      return res.json201(user, message);
    } catch (error) {
      console.error("Error creating user and userMovies:", error);
      return res.json500("Internal Server Error");
    }
  }

  async getAll(req, res) {
    const message = "users found";
    const response = await userServices.getAll();
    return res.json200(response, message);
  }

  async getByEmail(req, res) {
    console.log("body", req);
    const { email } = req.body;
    const message = "user found";

    const response = await userServices.getByEmail(email);
    if (response) {
      return res.json200(response, message);
    } else {
      return res.json404();
    }
  }

  async update(req, res) {
    const { id } = req.params;
    const data = req.body;
    const message = "user updated";

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.json404();
    }

    const response = await userServices.update(id, data);
    if (response) {
      return res.json200(response, message);
    } else {
      return res.json404();
    }
  }

  async getById(req, res) {
    const { id } = req.params;
    const message = "user found";

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.json404();
    }

    const response = await userServices.getById(id);
    if (response) {
      return res.json200(response, message);
    } else {
      return res.json404();
    }
  }

  async deleteOne(req, res) {
    const { id } = req.params;
    const message = "user deleted";

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.json404();
    }

    const response = await userServices.deleteOne(id);
    if (response) {
      return res.json200(response, message);
    } else {
      return res.json404();
    }
  }
}

export const userController = new UserController();