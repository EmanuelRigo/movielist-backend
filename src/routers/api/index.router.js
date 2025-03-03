import moviesRouter from "./movies.router.js";
import sessionRouter from "./session.router.js";
import CustomRouter from "../../utils/CustomRouter.util.js";
import cookiesRouter from "./cookie.router.js";

class IndexRouter extends CustomRouter {

    constructor(){
        super()
        this.init()
    }
    init = ()=> {
        this.use("/movies", ["PUBLIC"], moviesRouter)
        this.use("/sessions", ["PUBLIC"], sessionRouter)
        this.use("/cookies", ["PUBLIC"], cookiesRouter)
    }

}

let indexRouter = new IndexRouter()
export default indexRouter.getRouter()



///////////////////////

