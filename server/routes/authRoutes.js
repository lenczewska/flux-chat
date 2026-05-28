import express from "express";
import { loginUser, registerUser, deleteUser } from "../controllers/authController.js";

const authRouter = express.Router();

authRouter.post("/login", loginUser);
authRouter.delete("/delete", deleteUser);
authRouter.post("/register", registerUser);

export default authRouter;
