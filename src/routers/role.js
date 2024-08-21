import express from "express";
const roleRoute = express.Router();
import isAuth from "../middleware/isAuth.js";
import { getAllRoles, createNewRole, deleteRoleById, updateRoleById, getRoleById } from "../controllers/roleController.js";

/**
 * @swagger
 * /api/v1/role/{roleId}:
 *   get:
 *     summary: Retrieve role data by id
 *     description: Retrieve the data role from database by id
 *     tags:
 *       - Roles
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: roleId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The unique identifier of the role.
 *     responses:
 *       200:
 *         description: OK
 *       404:
 *         description: Not Found
 *       500:
 *         description: Server error
 */
roleRoute.get("/role/:id",isAuth(["admin"]), getRoleById);

/**
 * @swagger
 * /api/v1/roles:
 *   get:
 *     summary: Retrieve all roles data
 *     description: Retrieve all the data roles from database
 *     tags:
 *       - Roles
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
roleRoute.get("/roles",isAuth(["admin"]), getAllRoles);

/**
 * @swagger
 * /api/v1/role:
 *   post:
 *     summary: create new role
 *     description: create new role data
 *     tags:
 *       - Roles
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
roleRoute.post("/role",isAuth(["admin"]), createNewRole);


/**
 * @swagger
 * /api/v1/role/{roleId}:
 *   delete:
 *     summary: Delete role
 *     description: Delete a role by the id
 *     tags:
 *       - Roles
 *     security:
 *       - bearerAuth: []
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
roleRoute.delete("/role/:id",isAuth(["admin"]), deleteRoleById)

/**
 * @swagger
 * /api/v1/role/{roleId} :
 *   patch:
 *     summary: update user role
 *     description: update specific data role by id
 *     tags:
 *       - Roles
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: roleId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the user to update
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
roleRoute.patch("/role/:id",isAuth(["admin"]), updateRoleById)

export default roleRoute;
