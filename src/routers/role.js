import express from "express";
const roleRoute = express.Router();
import { getAllRoles } from "../controllers/roleController.js";

/**
 * @swagger
 * /api/v1/roles:
 *   get:
 *     summary: Retrieve all roles data
 *     description: Retrieve all the data roles from database
 *     tags:
 *       - Roles
 *     responses:
 *       200:
 *         description: OK
 *       404:
 *         description: Not Found
 *       500:
 *         description: Server error
 */
roleRoute.get("/roles", getAllRoles);

export default roleRoute;
