import express from "express";
import {
  createChat,
  getChats,
  deleteChat,
} from "../controllers/chatController.js";
import { protect } from "../middlewares/auth.js";

const chatRouter = express.Router();

chatRouter.post("/", protect, createChat);
chatRouter.get("/", protect, getChats);
chatRouter.delete("/", protect, deleteChat);
// chatRouter.post("/", loginUser);

export default chatRouter;
