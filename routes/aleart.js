import express from "express";
import { getalearts, getaleart } from "../controllers/aleart.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Alerts
 *   description: Operations related to alerts
 */

/**
 * @swagger
 * /api/alerts:
 *   get:
 *     summary: Get all alerts for the logged-in user
 *     tags: [Alerts]
 *     responses:
 *       200:
 *         description: List of alerts
 *       401:
 *         description: Not logged in
 *       500:
 *         description: Internal Server Error
 */
router.get("/", getalearts);

/**
 * @swagger
 * /api/alerts/{id}:
 *   get:
 *     summary: Get a specific alert by ID
 *     tags: [Alerts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the alert to retrieve
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Alert retrieved successfully
 *       401:
 *         description: Not logged in
 *       404:
 *         description: Alert not found
 *       500:
 *         description: Internal Server Error
 */
router.get('/:id', getaleart);

export default router;
