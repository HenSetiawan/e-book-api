import express from "express";
const languageRoute = express.Router();
import isAuth from "../middleware/isAuth.js";
import {
  getLanguageById,
  getAllLanguage,
  createNewLanguage,
  deleteLanguageById,
  updateLanguageById,
} from "../controllers/languageController.js";

/**
 * @swagger
 * /api/v1/language/{languageId}:
 *   get:
 *     summary: Retrieve language data by id
 *     description: Retrieve the data language from database by id
 *     tags:
 *       - Language
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: languageId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The unique identifier of the language.
 *     responses:
 *       200:
 *         description: OK
 *       404:
 *         description: Not Found
 *       500:
 *         description: Server error
 */
languageRoute.get("/language/:id", isAuth(["admin", "user"]), getLanguageById);

/**
 * @swagger
 * /api/v1/languages:
 *   get:
 *     summary: Retrieve all language data
 *     description: Retrieve all the data language from database
 *     tags:
 *       - Language
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
languageRoute.get("/languages", isAuth(["admin", "user"]), getAllLanguage);

/**
 * @swagger
 * /api/v1/language:
 *   post:
 *     summary: create new language
 *     description: create new language data
 *     tags:
 *       - Language
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
 *                 description: language name
 *                 example: Arab
 *     responses:
 *       201:
 *         description: Created
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Server error
 */

languageRoute.post("/language", isAuth(["admin"]), createNewLanguage);

/**
 * @swagger
 * /api/v1/language/{languageId}:
 *   delete:
 *     summary: Delete language
 *     description: Delete a language by the id
 *     tags:
 *       - Language
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: languageId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the language to delete
 *     responses:
 *       200:
 *         description: OK
 *       404:
 *         description: Not Found
 *       500:
 *         description: Server error
 */
languageRoute.delete("/language/:id", isAuth(["admin"]), deleteLanguageById);

/**
 * @swagger
 * /api/v1/language/{languageId} :
 *   patch:
 *     summary: update user language
 *     description: update specific data language by id
 *     tags:
 *       - Language
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: languageId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the language
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: language name
 *                 example: French
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Server error
 */

languageRoute.patch("/language/:id", isAuth(["admin"]), updateLanguageById);

export default languageRoute;
