import CustomRouter from "../../utils/CustomRouter.util.js";
import { verifyTokenUtil } from "../../utils/token.util.js";
import passportCb from "../../middlewares/passportCb.middleware.js";
import { userController } from "../../controllers/users.controller.js";
import userMoviesServices from "../../services/userMovies.services.js";

class SessionRouter extends CustomRouter {
  constructor() {
    super();
    this.init();
  }
  init = () => {
    //REGISTER
    this.create(
      "/register",
      ["PUBLIC"],
      passportCb("register", { session: false }),
      register
    );

    //LOGIN
    this.create(
      "/login",
      ["PUBLIC"],
      passportCb("login", { session: false }),
      login
    );

    //SIGNOUT
    this.create(
      "/signout",
      ["PUBLIC"],
      passportCb("signout", { session: false }),
      signout
    );

    //ONLINE
    this.create(
      "/online",
      ["PUBLIC"],
      passportCb("online", { session: false }),
      onlineToken
    );

    // GOOGLE
    this.read(
      "/google",
      ["PUBLIC"],
      passportCb("google", { scope: ["email", "profile"] })
    );

    this.read(
      "/google/cb",
      ["PUBLIC"],
      passportCb("google", { session: false }),
      google
    );
  };
}

async function register(req, res) {
  try {
    const { _id } = req.user;
    const message = "User Registered";
    await userMoviesServices.create({
      user_id: _id,
      movies: [],
    });

    return res.json201(_id, message);
  } catch (error) {
    console.error("Error during registration:", error);
    return res.json500("Internal Server Error");
  }
}

async function login(req, res) {
  try {
    const token = req.token;
    const name = req.user.username; o
    const optsToken = { maxAge: 60 * 60 * 24 * 7 * 1000, httpOnly: true }; 
    const optsName = { maxAge: 60 * 60 * 24 * 7 * 1000 }; 
    const message = "USER LOGGED IN";
    const response = "ok";

    return res
      .cookie("token", token, optsToken) 
      .cookie("name", name, optsName) 
      .json200(response, message);
  } catch (error) {
    console.error("Error during login:", error);
    return res.json500("Internal Server Error");
  }
}

function signout(req, res) {
  const response = "OK";
  const message = "SIGN OUT";
  return res.clearCookie("token").json200(response, message);
}

// async function online(req, res, next) {
//   const { token } = req.headers;
//   const data = verifyTokenUtil(token);
//   const one = await userController.getById(data.user_id);
//   if (one) {
//     return res.status(200).json({
//       message: one.email.toUpperCase() + " IS ONLINE",
//       online: true,
//     });
//   } else {
//     return res
//       .status(400)
//       .json({ message: "USER IS NOT ONLINE", online: false });
//   }
// }

async function onlineToken(req, res, next) {
  const message = req.user.email.toUpperCase() + " IS ONLINE";
  const response = true;
  return res.json200(response, message);
}

async function google(req, res, next) {
  return res.status(200).json({ message: "USER LOGGED IN", token: req.token });
}

const sessionsRouter = new SessionRouter();
export default sessionsRouter.getRouter();
