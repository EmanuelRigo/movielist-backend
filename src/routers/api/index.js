import { Router } from "express";
import moviesRouter from "./movies.router.js";
import sessionRouter from "./session.router.js";

const router = Router(); 

router.use('/movies', moviesRouter);
router.use('/sessions', sessionRouter);

export default router;