import express from "express";
const genreRoute = express.Router();
import {
  getGenreById,
  getAllGenre,
  createNewGenre,
  deleteGenreById,
  updateGenreById,
} from "../controllers/genreController.js";
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

/**
 * @swagger
 * /api/v1/genres:
 *   get:
 *     summary: Retrieve all genre data
 *     description: Retrieve all the data genre from database
 *     tags:
 *       - Genre
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: OK
 *       404:
 *         description: Not Found
 *       500:
 *         description: Server error
 */
genreRoute.get("/genres", isAuth(["admin", "user"]), getAllGenre);

/**
 * @swagger
 * /api/v1/genre:
 *   post:
 *     summary: create new genre
 *     description: create new genre data
 *     tags:
 *       - Genre
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: genre name
 *                 example: Action
 *               description:
 *                 type: string
 *                 description: genre details
 *                 example: action horror is horror
 *     responses:
 *       201:
 *         description: Created
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Server error
 */
genreRoute.post("/genre", isAuth(["admin", "user"]), createNewGenre);

/**
 * @swagger
 * /api/v1/genre/{genreId}:
 *   delete:
 *     summary: Delete genre
 *     description: Delete a genre by the id
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
 *         description: The ID of the genre to delete
 *     responses:
 *       200:
 *         description: OK
 *       404:
 *         description: Not Found
 *       500:
 *         description: Server error
 */
genreRoute.delete("/genre/:id", isAuth(["admin", "user"]), deleteGenreById);

/**
 * @swagger
 * /api/v1/genre/{genreId} :
 *   patch:
 *     summary: update genre
 *     description: update specific data genre by id
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
 *         description: The ID of the genre
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: genre name
 *                 example: Horor
 *               description:
 *                 type: string
 *                 description: genre details
 *                 example: horror and brutal
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Server error
 */
genreRoute.patch("/genre/:id", isAuth(["admin", "user"]), updateGenreById);

export default genreRoute;
