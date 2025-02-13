import { Router } from "express";
import movieModel from "../../dao/mongo/models/movies.model.js";
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


/////DELETE THIS
// router.get("/session", async (req, res) => {
//   if (req.session.counter) {
//     req.session.counter++;
//     res.send({ status: "success", message: `Counter: ${req.session.counter}` });
//   } else {
//     req.session.counter = 1;
//     res.send({
//       status: "success",
//       message: `Bienvenidos: ${req.session.counter}`,
//     });
//   }
// });

// router.get("/login", (req, res) => {
//   const { username, password } = req.query;
//   if (username !== "coder" || password !== "1234") {
//     return res.send("LOGIN FAILED");
//   }
//   req.session.user = {
//     username,
//     admin: true,
//   };
//   res.send("login");
// });

// router.get("/logout", (req, res) => {
//   req.session.destroy((error) => {
//     if (error) {
//       return res.send({
//         status: "failed",
//         message: "Error destroying session",
//       });
//     }
//     res.send({ status: "success", message: "Session destroyed" });
//   });
// });
///////


//// router.get("/", movieController.getAll);
//// router.get("/:mid", movieController.getById);
//// router.post("/", movieController.create);
//// router.put("/:mid", movieController.update);

// router.delete("/:mid", movieController.deleteOne);

// export default router;
