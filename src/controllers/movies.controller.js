import { response } from "express";
import moviesServices from "../services/movies.services.js";

class MovieController {

  async getAll(req, res) {
      const response = await moviesServices.getAll();
      const message = "movies read"
      return res.json201(response,  message)
  }

  async getById(req, res) {
    const mid = req.params.mid
    const response = await moviesServices.getById(mid)
    const message = "movie read"
    if (response) {
      return res.json201(response, message)
    } else {
      return res.json404()
    }
  }

  async create(req, res) {
  const message = "movie created";
  const data = req.body;
  const response = await moviesServices.create(data)
  return res.json201(response, message);
  }

  async update(req, res) {
    try {
        const { mid } = req.params;
        const { title, director, year } = req.body;
        if (!title || !director || !year) {
          return res
            .status(400)
            .send({ status: "failed", message: "Missing required fields" });
        }
        const movie = await moviesServices.update(
          { _id: mid },
          { title, director, year },
          { new: true }
        );
        res.send({ status: "success", payload: movie });
      } catch (error) {
        console.log(error);
      }
  }

  async deleteOne(req, res) {
    try {
        const { mid } = req.params;
        const movie = await moviesServices.deleteOne(mid)
        res.send({ status: "success", payload: movie });
      } catch (error) {
        console.log(error);
      }
  }
}

export const movieController = new MovieController();
