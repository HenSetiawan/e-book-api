import express from "express";
const bookRoute = express.Router();
import isAuth from "../middleware/isAuth.js";
import { getBookById } from "../controllers/bookController.js";


/**
 * @swagger
 * /api/v1/book/{bookId}:
 *   get:
 *     summary: Retrieve book data by id
 *     description: Retrieve the data book from database by id
 *     tags:
 *       - Book
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: bookId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The unique identifier of the book.
 *     responses:
 *       200:
 *         description: OK
 *       404:
 *         description: Not Found
 *       500:
 *         description: Server error
 */
bookRoute.get("/book/:id", isAuth(["admin", "user"]), getBookById);

export default bookRoute;
