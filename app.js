import express from "express";
import http from "http";
import logger from "morgan";
import cookieParser from "cookie-parser";
import cors from 'cors';
import indexRouter from "./src/routers/api/index.router.js";
import MongoSingleton from "./src/utils/mongoDB.utils.js";
import pathHandler from "./src/middlewares/pathHandler.middleware.js";
import errorHandler from "./src/middlewares/errorHandler.middleware.js";
import envsUtils from "./src/utils/envs.utils.js";

//server
const app = express();
const port = envsUtils.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger("dev"));
app.use(cookieParser(envsUtils.SECRET_KEY));

//CORS
app.use(cors({ origin: true, credentials: true }));

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