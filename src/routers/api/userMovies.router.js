import {userMoviesController} from "../../controllers/userMovies.controller.js";
import CustomRouter from "../../utils/CustomRouter.util.js";

class UserMoviesRouter extends CustomRouter {
  constructor() {
    super()
    this.init()
  }
  init =()=> {
    this.read("/", ["ADMIN"], userMoviesController.getAll)
    this.read("/:id", ["PUBLIC"], userMoviesController.getById)
  }
}

const userMoviesRouter = new UserMoviesRouter()
export default userMoviesRouter.getRouter()