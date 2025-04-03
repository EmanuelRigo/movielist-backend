import express from "express";
import http from "http";
import logger from "morgan";
import cookieParser from "cookie-parser";
import cors from 'cors';
import indexRouter from "./routers/api/index.router.js";
import MongoSingleton from "./utils/mongoDB.utils.js";
import pathHandler from "./middlewares/pathHandler.middleware.js";
import errorHandler from "./middlewares/errorHandler.middleware.js";
import envsUtils from "./utils/envs.utils.js";

//server
const app = express();
const port = envsUtils.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger("dev"));
app.use(cookieParser(envsUtils.SECRET_KEY));

//CORS
app.use(cors({ origin: true, credentials: true }));
// const allowedOrigins = [
//   "http://localhost:3000", // Desarrollo local
//   "https://movie-list-rvqh.vercel.app", // Producción
// ];

// app.use(
//   cors({
//     origin: (origin, callback) => {
//       if (allowedOrigins.includes(origin) || !origin) {
//         callback(null, true);
//       } else {
//         callback(new Error("No permitido por CORS"));
//       }
//     },
//     credentials: true,
//   })
// );

MongoSingleton.getInstance();

// Middleware para mostrar un mensaje al entrar en la raíz
app.get("/", (req, res) => {
  res.send("¡Bienvenido a la API de MovieList!");
});

//another middleware it can be deleted
app.use((req, res, next) => {
  console.log("Request Type:", req.method);
  next();
});

app.use("/api/", indexRouter);

//start server
app.listen(port, () => {
  console.log("Server started on port " + port);
});

app.use(errorHandler);
app.use(pathHandler);