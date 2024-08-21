import express from "express";
const nationalityRoute = express.Router();
import isAuth from "../middleware/isAuth.js";
import { getAllNationality } from "../controllers/nationalityController.js";

/**
 * @swagger
 * /api/v1/nationalities:
 *   get:
 *     summary: Retrieve all nationality data
 *     description: Retrieve all the data nationality from database
 *     tags:
 *       - Nationality
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
nationalityRoute.get("/nationalities", isAuth(["admin"]), getAllNationality);

export default nationalityRoute;
