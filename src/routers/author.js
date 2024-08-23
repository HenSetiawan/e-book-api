import express from "express";
const authorRoute = express.Router();
import isAuth from "../middleware/isAuth.js";
import {
  getAuthorById,
  getAllAuthor,
  createNewAuthor,
  deleteAuthorById
} from "../controllers/authorController.js";

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

/**
 * @swagger
 * /api/v1/authors:
 *   get:
 *     summary: Retrieve all author data
 *     description: Retrieve all the data author from database
 *     tags:
 *       - Author
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

authorRoute.get("/authors", isAuth(["admin", "user"]), getAllAuthor);

/**
 * @swagger
 * /api/v1/author:
 *   post:
 *     summary: create new author
 *     description: create new author data
 *     tags:
 *       - Author
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
 *                 description: author name
 *                 example: Indonesia
 *               nationalityId:
 *                 type: integer
 *                 description: id nationality
 *                 example: 10
 *               biography:
 *                 type: string
 *                 description: author bio
 *                 example: good book author
 *     responses:
 *       201:
 *         description: Created
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Server error
 */
authorRoute.post("/author", isAuth(["admin"]), createNewAuthor);

/**
 * @swagger
 * /api/v1/author/{authorId}:
 *   delete:
 *     summary: Delete author
 *     description: Delete a author by the id
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
 *         description: The ID of the author to delete
 *     responses:
 *       200:
 *         description: OK
 *       404:
 *         description: Not Found
 *       500:
 *         description: Server error
 */

authorRoute.delete("/author/:id", isAuth(["admin"]), deleteAuthorById);

export default authorRoute;