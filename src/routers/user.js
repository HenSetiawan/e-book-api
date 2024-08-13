import express from "express";
import { getAllusers } from "../controllers/userController.js";
const userRoute = express.Router();

userRoute.get('/users',getAllusers);

export default userRoute;