import express from "express";
const loanRoute = express.Router();
import isAuth from "../middleware/isAuth.js";
import {
  getLoanById,
  getAllLoan,
  getLoanByUserloggedIn,
  deleteLoanById,
  createNewLoan,
  returnLoanedBook
} from "../controllers/loanController.js";

/**
 * @swagger
 * /api/v1/loan/{loanId}:
 *   get:
 *     summary: Retrieve loan data by id
 *     description: Retrieve the data loan from database by id
 *     tags:
 *       - Loan
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: loanId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The unique identifier of the loan.
 *     responses:
 *       200:
 *         description: OK
 *       404:
 *         description: Not Found
 *       500:
 *         description: Server error
 */
loanRoute.get("/loan/:id", isAuth(["admin", "user"]), getLoanById);

/**
 * @swagger
 * /api/v1/loans:
 *   get:
 *     summary: Retrieve all loan data
 *     description: Retrieve all the data loan from database
 *     tags:
 *       - Loan
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
loanRoute.get("/loans", isAuth(["admin"]), getAllLoan);

/**
 * @swagger
 * /api/v1/loan:
 *   get:
 *     summary: Retrieve all loan data by user
 *     description: Retrieve all the data loan from database
 *     tags:
 *       - Loan
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
loanRoute.get("/loan", isAuth(["user"]), getLoanByUserloggedIn);

/**
 * @swagger
 * /api/v1/loan/{loanId}:
 *   delete:
 *     summary: Delete loan
 *     description: Delete a loan by the id
 *     tags:
 *       - Loan
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: loanId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the loan to delete
 *     responses:
 *       200:
 *         description: OK
 *       404:
 *         description: Not Found
 *       500:
 *         description: Server error
 */
loanRoute.delete("/loan/:id", isAuth(["admin"]), deleteLoanById);

/**
 * @swagger
 * /api/v1/loan:
 *   post:
 *     summary: create new loan
 *     description: create new loan data
 *     tags:
 *       - Loan
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               bookId:
 *                 type: integer
 *                 description: the book id
 *                 example: 9786022912828
 *     responses:
 *       201:
 *         description: Created
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Server error
 */
loanRoute.post("/loan", isAuth(["user"]), createNewLoan);

/**
 * @swagger
 * /api/v1/return/{bookId}:
 *   post:
 *     summary: return book
 *     description: return book by book id and user id
 *     tags:
 *       - Loan
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: loanId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the loan to delete
 *     responses:
 *       200:
 *         description: OK
 *       404:
 *         description: Not Found
 *       500:
 *         description: Server error
 */
loanRoute.delete("/return/:bookId", isAuth(["user",'admin']), returnLoanedBook);

export default loanRoute;
