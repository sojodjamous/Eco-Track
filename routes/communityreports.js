import express from "express";
import { getcommunityreports, getcommunityreport, addcommunityreport, editcommunityreport, deletecommunityreport, search } from "../controllers/communityreports.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: CommunityReports
 *   description: Community Reports API
 */

/**
 * @swagger
 * /api/communityreports:
 *   get:
 *     summary: Get all community reports
 *     tags: [CommunityReports]
 *     responses:
 *       200:
 *         description: List of community reports
 *       500:
 *         description: Internal Server Error
 */
router.get("/", getcommunityreports);

/**
 * @swagger
 * /api/communityreports:
 *   post:
 *     summary: Add a new community report
 *     tags: [CommunityReports]
 *     parameters:
 *       - in: query
 *         name: UserID
 *         required: true
 *         description: The ID of the user associated with the report.
 *         schema:
 *           type: integer
 *       - in: query
 *         name: ReportType
 *         required: true
 *         description: The type of the report.
 *         schema:
 *           type: string
 *       - in: query
 *         name: Description
 *         required: true
 *         description: The description of the report.
 *         schema:
 *           type: string
 *       - in: query
 *         name: Timestamp
 *         required: true
 *         description: The timestamp of the report.
 *         schema:
 *           type: string
 *       - in: query
 *         name: LocationID
 *         required: true
 *         description: The ID of the location associated with the report.
 *         schema:
 *           type: integer
 *       - in: query
 *         name: photo
 *         required: true
 *         description: The photo associated with the report.
 *         schema:
 *           type: string
 *       - in: query
 *         name: reference
 *         required: true
 *         description: The reference associated with the report.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               UserID:
 *                 type: integer
 *               ReportType:
 *                 type: string
 *               Description:
 *                 type: string
 *               Timestamp:
 *                 type: string
 *               LocationID:
 *                 type: integer
 *               photo:
 *                 type: string
 *               reference:
 *                 type: string
 *     responses:
 *       201:
 *         description: Community report added successfully
 *       400:
 *         description: Bad request, check the request body
 *       500:
 *         description: Internal Server Error
 */
router.post("/", addcommunityreport);


/**
 * @swagger
 * /api/communityreports/{id}:
 *   delete:
 *     summary: Delete a community report by ID
 *     tags: [CommunityReports]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the community report to delete.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Community report deleted successfully
 *       404:
 *         description: Community report not found
 *       500:
 *         description: Internal Server Error
 */
router.delete("/:id", deletecommunityreport);

/**
 * @swagger
 * /api/communityreports/{id}:
 *   get:
 *     summary: Get a community report by ID
 *     tags: [CommunityReports]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the community report to retrieve.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Community report retrieved successfully
 *       404:
 *         description: Community report not found
 *       500:
 *         description: Internal Server Error
 */
router.get("/:id", getcommunityreport);

/**
 * @swagger
 * /api/communityreports:
 *   put:
 *     summary: Edit a community report by ID
 *     tags: [CommunityReports]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the community report to edit.
 *         schema:
 *           type: integer
 *       - in: query
 *         name: UserID
 *         required: true
 *         description: The ID of the user associated with the report.
 *         schema:
 *           type: integer
 *       - in: query
 *         name: ReportType
 *         required: true
 *         description: The type of the report.
 *         schema:
 *           type: string
 *       - in: query
 *         name: Description
 *         required: true
 *         description: The description of the report.
 *         schema:
 *           type: string
 *       - in: query
 *         name: LocationID
 *         required: true
 *         description: The ID of the location associated with the report.
 *         schema:
 *           type: integer
 *       - in: query
 *         name: photo
 *         required: true
 *         description: The photo associated with the report.
 *         schema:
 *           type: string
 *       - in: query
 *         name: reference
 *         required: true
 *         description: The reference associated with the report.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Community report updated successfully
 *       404:
 *         description: Community report not found
 *       500:
 *         description: Internal Server Error
 */
router.put("/:id", editcommunityreport);

/**
 * @swagger
 * /api/communityreports/search/{keyword}:
 *   get:
 *     summary: Search community reports by keyword
 *     tags: [CommunityReports]
 *     parameters:
 *       - in: path
 *         name: keyword
 *         required: true
 *         description: The keyword to search for in community reports.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of community reports matching the keyword
 *       500:
 *         description: Internal Server Error
 */
router.get("/search/:keyword", search);

export default router;
