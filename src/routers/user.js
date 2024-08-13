import express from "express";
import { getAllusers, deleteUserById } from "../controllers/userController.js";
const userRoute = express.Router();

userRoute.get("/users", getAllusers);
userRoute.delete("/users/:id", deleteUserById);

export default userRoute;