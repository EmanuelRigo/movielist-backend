import {userMoviesController} from "../../controllers/userMovies.controller.js";
import CustomRouter from "../../utils/CustomRouter.util.js";

class UserMoviesRouter extends CustomRouter {
  constructor() {
    super()
    this.init()
  }
  init =()=> {
    this.read("/",["PUBLIC"], userMoviesController.getAll)
    this.read("/:id", ["PUBLIC"], userMoviesController.getById)
    this.update("/", ["PUBLIC"], userMoviesController.addMovie)
  }
}

const userMoviesRouter = new UserMoviesRouter()
export default userMoviesRouter.getRouter()