import express from "express";
import {
  getAllusers,
  deleteUserById,
  registerUser,
} from "../controllers/userController.js";
const userRoute = express.Router();

userRoute.get("/users", getAllusers);
userRoute.delete("/users/:id", deleteUserById);
userRoute.post("/users", registerUser);

export default userRoute;