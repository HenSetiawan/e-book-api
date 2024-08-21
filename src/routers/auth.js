import express from "express";
const authRoute = express.Router();
import { login } from "../controllers/authController.js";

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login a user
 *     description: Authenticate a user and return a JWT token
 *     tags:
 *          - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: The user's email
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 description: The user's password
 *                 example: Password123
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Server error
 */
authRoute.post("/login", login);

export default authRoute;
