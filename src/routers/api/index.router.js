import moviesRouter from "./movies.router.js";
import sessionRouter from "./session.router.js";
import CustomRouter from "../../utils/CustomRouter.util.js";
import cookiesRouter from "./cookie.router.js";
import userMoviesRouter from "./userMovies.router.js";

class IndexRouter extends CustomRouter {

    constructor(){
        super()
        this.init()
    }
    init = ()=> {
        this.use("/movies", ["PUBLIC"], moviesRouter)
        this.use("/sessions", ["PUBLIC"], sessionRouter)
        this.use("/cookies", ["PUBLIC"], cookiesRouter)
        this.use("/usermovies", ["PUBLIC"], userMoviesRouter)
    }

}

let indexRouter = new IndexRouter()
export default indexRouter.getRouter()


