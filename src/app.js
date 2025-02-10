import express from "express";
import http from "http";
import logger from "morgan";
import cookieParser from "cookie-parser";
import session from "express-session";

import indexRouter from "./routers/api/index.js";
import connectDB from "./config/mongoDB.config.js";
import { initializePassport } from "./config/passport.config.js";

import envsUtils from "./utils/envs.utils.js";
//server
const app = express();
const port = envsUtils.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger("dev"));
app.use(cookieParser("codercookieCAMBIARENV"));
app.use(
  session({
    secret: "coderSECRETCAMBIARENV",
    resave: true, // mantiene la session
    saveUninitialized: true, // guarda la session
  })
);

initializePassport()

//middleware it can be deleted
app.use((req, res, next) => {
  console.log("Time:", Date.now());
  next();
});
//another middleware it can be deleted
app.use((req, res, next) => {
  console.log("Request Type:", req.method);
  next();
});

// const auth = (req, res, next) => {
//     if (!req.user) {
//        return res.send('Not allowed');
//     } else {
//         res.status(401).send("Allowed");
//     }
// };

connectDB();
// //HTTP server
// const server = http.createServer(app);

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/api/", indexRouter);

//start server
app.listen(port, () => {
  console.log("Server started on port " + port);
});

// //routers
// app.use(indexRouter);
