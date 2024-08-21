import express from "express";
const nationalityRoute = express.Router();
import isAuth from "../middleware/isAuth.js";
import { getAllNationality, createNewNationallity, deleteNationalityById, getNationalityById } from "../controllers/nationalityController.js";
/**
 * @swagger
 * /api/v1/nationality/{nationalityId}:
 *   get:
 *     summary: Retrieve nationality data by id
 *     description: Retrieve the data nationality from database by id
 *     tags:
 *       - Nationality
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: nationalityId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The unique identifier of the nationality.
 *     responses:
 *       200:
 *         description: OK
 *       404:
 *         description: Not Found
 *       500:
 *         description: Server error
 */
nationalityRoute.get("/nationality/:id",isAuth(["admin"]), getNationalityById);

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

/**
 * @swagger
 * /api/v1/nationality/{nationalityId}:
 *   delete:
 *     summary: Delete nationality
 *     description: Delete a nationality by the id
 *     tags:
 *       - Nationality
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: nationalityId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the nationality to delete
 *     responses:
 *       200:
 *         description: OK
 *       404:
 *         description: Not Found
 *       500:
 *         description: Server error
 */
nationalityRoute.delete("/nationality/:id",isAuth(["admin"]), deleteNationalityById)

export default nationalityRoute;
