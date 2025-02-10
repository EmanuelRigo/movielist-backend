import moviesServices from "../services/movies.services.js";

class MovieController {
  async getAll(req, res) {
    try {
      const movies = await moviesServices.getAll();
      res
        .cookie("CoderCookie", "esta es una cookie firmada", {
          maxAge: 10000000,
          signed: true,
        })
        .send({ status: "success", payload: movies });
    } catch (error) {
      console.log(error);
    }
  }

  async getById(req, res) {
    try {
      const mid = req.params.mid;
      const movie = await moviesServices.getById(mid);
      res.send({ status: "success", payload: movie });
    } catch (error) {
      console.log(error);
    }
  }

  async create(req, res) {
    try {
      const { title, director, year } = req.body;
      if (!title || !director || !year) {
        return res
          .status(400)
          .send({ status: "failed", message: "Missing required fields" });
      }
      const movie = await moviesServices.create({ title, director, year });
      res.send({ status: "success", payload: movie });
    } catch (error) {
      console.log(error);
    }
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
