import { Router } from "express";

const cookiesRouter = Router();

cookiesRouter.post("/create", (req, res, next) => {
  try {
    const { mode } = req.body;
    const message = "cookie created";
    return res
      .status(200)
      .cookie("mode", mode || "light", {
        secure: true, // Solo se envía en conexiones HTTPS
        sameSite: "None", // Permitir solicitudes entre diferentes orígenes
        httpOnly: false, // Opcional: si no necesitas que sea accesible solo desde el servidor
      })
      .json({ message });
  } catch (error) {
    return next(error);
  }
});
cookiesRouter.get("/read", (req, res, next) => {
  try {
    const mode = req.cookies.mode
    const username = req.cookies.name
    const rolDeUsuario = req.cookies.rolDeUsuario 
    const message = "cookie read";
    return res.status(200).json({ mode, username, rolDeUsuario, message });
  } catch (error) {
    return next(error);
  }
});

cookiesRouter.delete("/destroy/:cookieABorrar", (req, res, next) => {
  try {
    const { cookieABorrar } = req.params;
    const message = "cookie destroyed";
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
    return res.status(200).json({ cookies, signedCookies });
  } catch (error) {
    return next(error);
  }
});

export default cookiesRouter;