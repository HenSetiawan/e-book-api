import express from "express";
import {
  getAllusers,
  deleteUserById,
  registerUser,
  getUserById
} from "../controllers/userController.js";
const userRoute = express.Router();

/**
 * @swagger
 * /api/v1/users:
 *   get:
 *     summary: Retrieve all user data
 *     description: Retrieve all the data user from database
 *     tags:
 *       - User
 *     responses:
 *       200:
 *         description: OK
 *       404:
 *         description: Not Found
 *       500:
 *         description: Server error
 */
userRoute.get("/users", getAllusers);

/**
 * @swagger
 * /api/v1/user/{userId}:
 *   get:
 *     summary: Retrieve all user data
 *     description: Retrieve all the data user from database
 *     tags:
 *       - User
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The unique identifier of the user.
 *     responses:
 *       200:
 *         description: OK
 *       404:
 *         description: Not Found
 *       500:
 *         description: Server error
 */
userRoute.get("/user/:id", getUserById);

/**
 * @swagger
 * /api/v1/user/{userId}:
 *   delete:
 *     summary: Delete a user by ID
 *     description: Delete a user by their ID
 *     tags:
 *       - User
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the user to delete
 *     responses:
 *       200:
 *         description: OK
 *       404:
 *         description: Not Found
 *       500:
 *         description: Server error
 */
userRoute.delete("/user/:id", deleteUserById);

/**
 * @swagger
 * /api/v1/register:
 *   post:
 *     summary: Register a new user
 *     description: Register a new user with the provided details
 *     tags:
 *       - User
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fullname:
 *                 type: string
 *                 description: user full name
 *                 example: hendy
 *               email:
 *                 type: string
 *                 description: email
 *                 example: hendy@app.com
 *               nik:
 *                 type: string
 *                 description: nik user
 *                 example: 12345678912345678912
 *               address:
 *                 type: string
 *                 description: user address
 *                 example: Jl. macan hitam, jakarta barat
 *               role:
 *                 type: string
 *                 description: user role
 *                 example: admin
 *               password:
 *                 type: string
 *                 description: user password
 *                 example: secret
 *     responses:
 *       201:
 *         description: Created
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Server error
 */
userRoute.post("/user", registerUser);

export default userRoute;