import express from "express";
const authorRoute = express.Router();
import isAuth from "../middleware/isAuth.js";
import { getAuthorById } from "../controllers/authorController.js";

/**
 * @swagger
 * /api/v1/author/{authorId}:
 *   get:
 *     summary: Retrieve author data by id
 *     description: Retrieve the data author from database by id
 *     tags:
 *       - Author
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: authorId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The unique identifier of the author.
 *     responses:
 *       200:
 *         description: OK
 *       404:
 *         description: Not Found
 *       500:
 *         description: Server error
 */
authorRoute.get("/author/:id", isAuth(["admin", "user"]), getAuthorById);

export default authorRoute;
