import { userController } from "../../controllers/users.controller";
import CustomRouter from "../../utils/CustomRouter.util";

class UserRouter extends CustomRouter {
  constructor() {
    super();
    this.init();
  }
  init = () => {
    this.read("/", ["ADMIN"], userController.getAll);
    this.create("/", ["PUBLIC"], userController.create);
    this.update("/:id", ["USER", "ADMIN"], userController.update);
    this.destroy("/:id", ["USER", "ADMIN"], userController.deleteOne);
  };
}

const userRouter = new UserRouter()
export default userController.getRouter()