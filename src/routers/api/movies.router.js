import { Router } from "express";
import movieModel from "../../models/movies.model.js";
import { error } from "console";

const router = Router();

router.get("/session", async (req, res) => {
  if (req.session.counter) {
    req.session.counter++;
    res.send({ status: "success", message: `Counter: ${req.session.counter}` });
  } else {
    req.session.counter = 1;
    res.send({
      status: "success",
      message: `Bienvenidos: ${req.session.counter}`,
    });
  }
});

router.get("/login", (req, res) => {
  const { username, password } = req.query;
  if (username !== "coder" || password !== "1234") {
    return res.send("LOGIN FAILED");
  }
  req.session.user = {
    username,
    admin: true,
  };
  res.send("login");
});

router.get("/logout", (req, res) => {
  req.session.destroy((error) => {
    if (error) {
      return res.send({
        status: "failed",
        message: "Error destroying session",
      });
    }
    res.send({ status: "success", message: "Session destroyed" });
  });
});

router.get("/", async (req, res) => {
  try {
    const movies = await movieModel.find();
    res
      .cookie("CoderCookie", "esta es una cookie firmada", {
        maxAge: 10000000,
        signed: true,
      })
      .send({ status: "success", payload: movies });
  } catch (error) {
    console.log(error);
  }
});

router.post("/", async (req, res) => {
  try {
    const { title, director, year } = req.body;
    if (!title || !director || !year) {
      return res
        .status(400)
        .send({ status: "failed", message: "Missing required fields" });
    }
    const movie = await movieModel.create({ title, director, year });
    res.send({ status: "success", payload: movie });
  } catch (error) {
    console.log(error);
  }
});

router.get("/:mid", async (req, res) => {
  try {
    console.log("cookie sin firmar", req.cookies);
    console.log("cookie firmada", req.signedCookies);
    const { mid } = req.params;
    const movie = await movieModel.findById(mid);
    res.send({ status: "success", payload: movie });
  } catch (error) {
    console.log(error);
  }
});

router.put("/:mid", async (req, res) => {
  try {
    const { mid } = req.params;
    const { title, director, year } = req.body;
    if (!title || !director || !year) {
      return res
        .status(400)
        .send({ status: "failed", message: "Missing required fields" });
    }
    const movie = await movieModel.findByIdAndUpdate(
      { _id: mid },
      { title, director, year },
      { new: true }
    );
    res.send({ status: "success", payload: movie });
  } catch (error) {
    console.log(error);
  }
});

router.delete("/:mid", async (req, res) => {
  try {
    const { mid } = req.params;
    const movie = await movieModel.findByIdAndDelete(mid);
    res.send({ status: "success", payload: movie });
  } catch (error) {
    console.log(error);
  }
});

export default router;
