import { Router } from "express";
import { userDao } from "../../dao/mongo/user.dao.js";
import { createHash, isValidPassword } from "../../utils/hashPassword.js";
import passport from "passport";
import { createToken, verifyToken } from "../../utils/jwt.js"
import { passportCall } from "../../middlewares/passportCall.middleware.js";
import { authorization } from "../../middlewares/authorization.middleware.js";


const router = Router();

router.get("/current" , passportCall("jwt"), authorization('user'), async (req, res) => {
  // console.log("hola")
  // // const token = req.headers.authorization.split(" ")[1]
  // const token = req.cookies.token
  // const validToken = verifyToken(token)
  // if (!validToken) return res.send("not token")
  // const user = await userDao.getByEmail(validToken.email)

  res.json({status: "ok", user: req.user})

})

router.post(
  "/register",
  passportCall("register"),
  async (req, res) => {
    try {
      res
        .status(201)
        .json({ status: "success", payload: "Usuario Registrado" });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .send({ status: "failed", message: "Internal Server Error" });
    }
  }
);

router.post("/login", passportCall("login"), async (req, res) => {
  try {
    req.session.user = {
      username: req.user.username,
      name: req.user.name,
      email: req.user.email,
      role: req.user.role,
    };
    const token = createToken(req.user)
    res.cookie("token", token, {httpOnly: true})
    res.status(200).json({ status: "success", payload: req.session.user, token });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ status: "failed", message: "Internal Server Error" });
  }
});

router.get("/profile", async (req, res) => {
  try {
    console.log("req:", req.session);
    console.log(req.session.user);
    if (!req.session.user) {
      return res
        .status(401)
        .json({ status: "failed", message: "Unauthorized" });
    }
    if (req.session.user.role !== "user") {
      return res.status(200).json({ status: "error", message: "Not allowed" });
    }
    res.status(200).json({ status: "success", payload: req.session.user });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ status: "failed", message: "Internal Ser ver Error" });
  }
});

router.get("/logout", async (req, res) => {
  try {
    req.session.destroy();
    res.status(200).json({ status: "success", message: "Logged out" });
  } catch (error) {
    console.log(error);
  }
});

router.put("/restore-password", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userDao.getByEmail(email);

    await userDao.update(user._id, { password: createHash(password) });

    res.status(200).json({ status: "success", payload: "Password changed" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "Error", message: "Internal Server Error" });
  }

  router.get(
    "/google",
    passport.authenticate("google", {
      scope: [
          "https://www.googleapis.com/auth/userinfo.email",
        "https://www.googleapis.com/auth/userinfo.profile",
      ], session: false
    }),
    (req, res) => {
      res.status(200).json({ status: "success", session: req.user });
    }
  );


  




});

export default router;
