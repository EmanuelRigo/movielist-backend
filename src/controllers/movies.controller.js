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
    console.log("🚀 ~ MovieController ~ create ~ data:", data)
    
    const response = await moviesServices.create(data);
    return res.json201(response, message);
  }

  // async create(req, res) {
  //   const { id, formats, checked } = req.body; // Asegúrate de que `id` sea el identificador único de la película
  //   const message = "movie created";
  //   console.log("🚀 ~ MovieController ~ create ~ body:", req.body.id)
  
  //   try {
  //     // Verificar si la película ya existe
  //     console.log("🚀 ~ MovieController ~ create ~ id", id)
  //     const existingMovie = await moviesServices.getByIdAPI(id);

  //     const token = req.cookies.token;
  //     console.log("🚀 ~ MovieController ~ create ~ token:", token)
  //     if (!token) {
  //       return res.json401("No token provided");
  //     }
  
  //     // Decodificar el token para obtener el user_id
  //     const decoded = jwt.verify(token, envsUtils.SECRET_KEY);
  //     const user_id = decoded.user_id;
  //     console.log("🚀 ~ MovieController ~ create ~ user_id:", user_id)
  
  //     if (existingMovie) {
  //       console.log("🚀 ~ hola")
  //       // Si la película ya existe, agregarla al array `movies` del usuario
  //       const updatedUserMovies = await userMoviesServices.addMovie(user_id, {
  //         _id: existingMovie._id, // Usar el `_id` generado por MongoDB
  //         checked,
  //         formats,
  //       });
  
  //       return res.json200(updatedUserMovies, "Movie already exists, added to userMovies");
  //     }
  
  //     // Si la película no existe, crearla
  //     const newMovie = await moviesServices.create(req.body);
  
  //     // Agregar la nueva película al array `movies` del usuario
  //     const updatedUserMovies = await userMoviesServices.addMovie(user_id, {
  //       _id: newMovie._id, // Usar el `_id` generado por MongoDB
  //       checked,
  //       formats,
  //     });
  
  //     return res.json201(updatedUserMovies, "Movie created and added to userMovies");
  //   } catch (error) {
  //     console.error("Error creating or adding movie:", error);
  //     return res.json500("Internal Server Error");
  //   }
  // }

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


}

export const movieController = new MovieController();