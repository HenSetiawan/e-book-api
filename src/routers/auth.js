import express from "express";
const authRoute = express.Router();
import { login, refreshToken, logout } from "../controllers/authController.js";

/**
 * @swagger
 * /api/v1/login:
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

/**
 * @swagger
 * /api/v1/token:
 *   get:
 *     summary: Refresh JWT token
 *     description: Obtain a new JWT token using a refresh token
 *     tags:
 *          - Auth
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: New JWT token
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
authRoute.get("/token", refreshToken);


/**
 * @swagger
 * /api/v1/logout:
 *   post:
 *     summary: Logout a user
 *     description: remove token from cookie
 *     tags:
 *          - Auth
 *     security:
 *       - bearerAuth: []
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
authRoute.post("/logout", logout);

export default authRoute;
