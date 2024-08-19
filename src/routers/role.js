import express from "express";
const roleRoute = express.Router();
import { getAllRoles, createNewRole, deleteRoleById, updateRoleById } from "../controllers/roleController.js";

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

/**
 * @swagger
 * /api/v1/role:
 *   post:
 *     summary: create new role
 *     description: create new role data
 *     tags:
 *       - Roles
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: role name
 *                 example: admin
 *     responses:
 *       201:
 *         description: Created
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Server error
 */
roleRoute.post("/role", createNewRole);


/**
 * @swagger
 * /api/v1/role/{roleId}:
 *   delete:
 *     summary: Delete role
 *     description: Delete a role by the id
 *     tags:
 *       - Roles
 *     parameters:
 *       - in: path
 *         name: roleId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the role to delete
 *     responses:
 *       200:
 *         description: OK
 *       404:
 *         description: Not Found
 *       500:
 *         description: Server error
 */
roleRoute.delete("/role/:id", deleteRoleById)

/**
 * @swagger
 * /api/v1/role/{roleId} :
 *   patch:
 *     summary: update user role
 *     description: update specific data role by id
 *     tags:
 *       - Roles
 *     parameters:
 *       - in: path
 *         name: roleId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the user to delete
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: role name
 *                 example: admin
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Server error
 */
roleRoute.patch("/role/:id", updateRoleById)

export default roleRoute;
