import express from "express";
const loanRoute = express.Router();
import isAuth from "../middleware/isAuth.js";
import {
  getLoanById,
  getAllLoan,
  getLoanByUserloggedIn,
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

export default loanRoute;
