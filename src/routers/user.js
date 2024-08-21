import express from "express";
import {
  getAllusers,
  deleteUserById,
  registerUser,
  getUserById,
  updateUserById,
} from "../controllers/userController.js";
import isAuth from "../middleware/isAuth.js";
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
userRoute.get("/users", isAuth(["admin"]), getAllusers);

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
userRoute.get("/user/:id", isAuth(["admin"]), getUserById);

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
userRoute.delete("/user/:id", isAuth(["admin"]), deleteUserById);

/**
 * @swagger
 * /api/v1/user:
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
userRoute.post("/user", isAuth(["admin"]), registerUser);

/**
 * @swagger
 * /api/v1/user/{userId} :
 *   patch:
 *     summary: update user data
 *     description: update specific data user by id
 *     tags:
 *       - User
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the user to delete
 *     requestBody:
 *       required: false
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
 *       200:
 *         description: Success
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Server error
 */
userRoute.patch("/user/:id", isAuth(["admin"]), updateUserById);

export default userRoute;