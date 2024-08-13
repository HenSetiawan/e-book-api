import express from "express";
import {
  getAllusers,
  deleteUserById,
  registerUser,
  getUserById
} from "../controllers/userController.js";
const userRoute = express.Router();

userRoute.get("/users", getAllusers);
userRoute.get("/users/:id", getUserById);
userRoute.delete("/users/:id", deleteUserById);
userRoute.post("/users", registerUser);

export default userRoute;