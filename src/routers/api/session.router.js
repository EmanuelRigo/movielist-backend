import { Router } from "express";
import {userDao } from "../../dao/mongo/user.dao.js";


const router = Router();

router.post("/register", async (req, res) => {
    try {
        const userData = req.body;
        const user = await userDao.create(userData);

        res.status(201).json({ status: "success", payload: user });
    } catch (error) {
        console.log(error);
        res.status(500).send({ status: "failed", message: "Internal Server Error" });
    }
});

export default router;