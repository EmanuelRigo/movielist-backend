import {userMoviesController} from "../../controllers/userMovies.controller.js";
import CustomRouter from "../../utils/CustomRouter.util.js";

class UserMoviesRouter extends CustomRouter {
  constructor() {
    super()
    this.init()
  }
  init =()=> {
    // this.read("/",["PUBLIC"], userMoviesController.getAll)
    this.read("/:id", ["PUBLIC"], userMoviesController.getById)
    this.read("/", ["PUBLIC"], userMoviesController.getByToken)
    this.read("/movies/:mid", ["PUBLIC"], userMoviesController.getByTokenAndMovie)
    this.update("/", ["PUBLIC"], userMoviesController.addMovie)
    this.update("/:mid", ["PUBLIC"], userMoviesController.updateMovie)
    this.destroy("/movies/:mid", ["PUBLIC"], userMoviesController.removeMovie)
  }
}

const userMoviesRouter = new UserMoviesRouter()
export default userMoviesRouter.getRouter()