import express from "express";
const genreRoute = express.Router();
import { getGenreById } from "../controllers/genreController.js";
import isAuth from "../middleware/isAuth.js";


/**
 * @swagger
 * /api/v1/genre/{genreId}:
 *   get:
 *     summary: Retrieve genre data by id
 *     description: Retrieve the data genre from database by id
 *     tags:
 *       - Genre
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: genreId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The unique identifier of the genre.
 *     responses:
 *       200:
 *         description: OK
 *       404:
 *         description: Not Found
 *       500:
 *         description: Server error
 */
genreRoute.get("/genre/:id", isAuth(["admin", "user"]), getGenreById);

export default genreRoute;
