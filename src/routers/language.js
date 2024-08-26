import express from "express";
const languageRoute = express.Router();
import isAuth from "../middleware/isAuth.js";
import { getLanguageById } from "../controllers/LanguageController.js";

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
languageRoute.get('/language/:id', isAuth(['admin','user']), getLanguageById)

export default languageRoute