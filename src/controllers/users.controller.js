import mongoose from "mongoose";
import userServices from "../services/users.services.js";

class UserController {
  async create(req, res) {
    const message = "USER CREATED";
    const data = req.body;
    const response = await userServices.create(data);
    return res.json201(response, message);
  }

  async getAll(req, res) {
    const message = "users found";
    const response = await userServices.getAll();
    return res.json200(response, message);
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