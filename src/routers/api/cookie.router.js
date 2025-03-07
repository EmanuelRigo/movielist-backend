import { Router } from "express";

const cookiesRouter = Router();

cookiesRouter.post("/create", (req, res, next) => {
  try {
    const { mode, rolDeUsuario } = req.body;
    const message = "COOKIE CREADA!";
    return res
      .status(200)
      .cookie("mode", mode || "light")
      .cookie("rolDeUsuario", rolDeUsuario || "admin", { maxAge: 5000 })
      .json({ message });
  } catch (error) {
    return next(error);
  }
});

cookiesRouter.get("/read", (req, res, next) => {
  try {
    const mode = req.cookies.modo 
    const rolDeUsuario = req.cookies.rolDeUsuario 
    const message = "COOKIE LEÍDA";
    return res.status(200).json({ mode, rolDeUsuario, message });
  } catch (error) {
    return next(error);
  }
});

cookiesRouter.delete("/destroy/:cookieABorrar", (req, res, next) => {
  try {
    const { cookieABorrar } = req.params;
    const message = "COOKIE DESTROYED";
    return res.status(200).clearCookie(cookieABorrar).json({ message });
  } catch (error) {
    return next(error);
  }
});

cookiesRouter.get("/signed", (req, res, next) => {
  try {
    const message = "COOKIE FIRMADA CREADA";
    return res
      .status(201)
      .cookie("nombre", "igna", { signed: true })
      .json({ message });
  } catch (error) {
    return next(error);
  }
});

cookiesRouter.get("/read-signed", (req, res, next) => {
  try {
    const cookies = req.cookies;
    const signedCookies = req.signedCookies;
    console.log(cookies);
    console.log(signedCookies);
    return res.status(200).json({ cookies, signedCookies });
  } catch (error) {
    return next(error);
  }
});

export default cookiesRouter;