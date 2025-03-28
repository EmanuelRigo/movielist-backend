import express from "express";
import http from "http";
import logger from "morgan";
import cookieParser from "cookie-parser";
import cors from 'cors'
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


MongoSingleton.getInstance()


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
app.use(pathHandler)