import express from "express";
const nationalityRoute = express.Router();
import isAuth from "../middleware/isAuth.js";
import { getAllNationality, createNewNationallity } from "../controllers/nationalityController.js";

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


/**
 * @swagger
 * /api/v1/nationality:
 *   post:
 *     summary: create new nationality
 *     description: create new nationality data
 *     tags:
 *       - Nationality
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
 *                 description: nationality name
 *                 example: Indonesia
 *     responses:
 *       201:
 *         description: Created
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Server error
 */
nationalityRoute.post("/nationality",isAuth(["admin"]), createNewNationallity);

export default nationalityRoute;
