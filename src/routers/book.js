import express from "express";
const bookRoute = express.Router();
import isAuth from "../middleware/isAuth.js";
import {
  getBookById,
  getAllBook,
  createNewBook,
  deleteBookById,
  updateBookById
} from "../controllers/bookController.js";

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

/**
 * @swagger
 * /api/v1/books:
 *   get:
 *     summary: Retrieve all book data
 *     description: Retrieve all the data book from database
 *     tags:
 *       - Book
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
bookRoute.get("/books", isAuth(["admin", "user"]), getAllBook);

/**
 * @swagger
 * /api/v1/book:
 *   post:
 *     summary: create new book
 *     description: create new book data
 *     tags:
 *       - Book
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: book name
 *                 example: Animal Farm
 *               isbn:
 *                 type: string
 *                 description: book isbn
 *                 example: 9786022912828
 *               synopsys:
 *                 type: string
 *                 description: Animal Farm is a satirical
 *                 example: 9786022912828
 *               authorId:
 *                 type: integer
 *                 description: id of author
 *                 example: 1
 *               languageId:
 *                 type: integer
 *                 description: id of book language
 *                 example: 1
 *
 *     responses:
 *       201:
 *         description: Created
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Server error
 */

bookRoute.post("/book", isAuth(["admin"]), createNewBook);

/**
 * @swagger
 * /api/v1/book/{bookId}:
 *   delete:
 *     summary: Delete book
 *     description: Delete a book by the id
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
 *         description: The ID of the book to delete
 *     responses:
 *       200:
 *         description: OK
 *       404:
 *         description: Not Found
 *       500:
 *         description: Server error
 */

bookRoute.delete('/book/:id', isAuth(['admin', 'user']), deleteBookById)


/**
 * @swagger
 * /api/v1/book/{bookId} :
 *   patch:
 *     summary: update user book
 *     description: update specific data book by id
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
 *         description: The ID of the book
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: book name
 *                 example: Animal Farm
 *               isbn:
 *                 type: string
 *                 description: book isbn
 *                 example: 9786022912828
 *               synopsys:
 *                 type: string
 *                 description: Animal Farm is a satirical
 *                 example: 9786022912828
 *               authorId:
 *                 type: integer
 *                 description: id of author
 *                 example: 1
 *               languageId:
 *                 type: integer
 *                 description: id of book language
 *                 example: 1
 *               stock:
 *                 type: integer
 *                 description: book quantity
 *                 example: 1
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Server error
 */

bookRoute.patch('/book/:id', isAuth(['admin','user']), updateBookById)

export default bookRoute;
