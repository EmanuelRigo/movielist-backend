import { movieController } from "../../controllers/movies.controller.js";
import CustomRouter from "../../utils/CustomRouter.util.js";

class MovieRouter extends CustomRouter {
  constructor() {
    super()
    this.init()
  }
  init =()=> {
    this.read("/", ["PUBLIC"], movieController.getAll)
    this.read("/:mid", ["PUBLIC"], movieController.getById)
    this.create("/", ["PUBLIC"], movieController.create)
    this.update("/:mid", ["PUBLIC"], movieController.update)
    this.destroy("/:mid", ["PUBLIC"], movieController.deleteOne)
  }
}

let movieRouter = new MovieRouter()
export default movieRouter.getRouter()
