import { response } from "express";
import mongoose from "mongoose";
import moviesServices from "../services/movies.services.js";

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
    const { title, director, year } = req.body;

    if (!title && !director && !year) {
      const message = "Missing required fields";
      return res.json400(message);
    }

    if (!mongoose.Types.ObjectId.isValid(mid)) {
      return res.json404();
    }

    const message = "PRODUCT UPDATED";
    const response = await moviesServices.update(mid, { title, director, year });

    if (response) {
      console.log(response);
      return res.json201(response, message);
    } else {
      console.log("response", response);
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
}

export const movieController = new MovieController();