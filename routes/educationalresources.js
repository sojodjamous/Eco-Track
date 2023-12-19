import express from "express";
import { geteducationalresources, addeducationalresource, geteducationalresource, deleteeducationalresource, editeducationalresource } from "../controllers/educationalresources.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: EducationalResources
 *   description: API for managing educational resources
 */

/**
 * @swagger
 * /api/educationalresources:
 *   get:
 *     summary: Get all educational resources
 *     tags: [EducationalResources]
 *     responses:
 *       200:
 *         description: Successful response with educational resources
 *       500:
 *         description: Internal server error
 */
router.get("/", geteducationalresources);

/**
 * @swagger
 * /api/educationalresources:
 *   post:
 *     summary: Add a new educational resource
 *     tags: [EducationalResources]
 *     parameters:
 *       - in: query
 *         name: Title
 *         required: true
 *         description: The title of the educational resource.
 *         schema:
 *           type: string
 *       - in: query
 *         name: Content
 *         required: true
 *         description: The content of the educational resource.
 *         schema:
 *           type: string
 *       - in: query
 *         name: ResourceType
 *         required: true
 *         description: The type of the educational resource.
 *         schema:
 *           type: string
 *       - in: query
 *         name: PublicationDate
 *         required: true
 *         description: The publication date of the educational resource.
 *         schema:
 *           type: string
 *           format: date
 *       - in: query
 *         name: photo
 *         required: true
 *         description: The filename of the photo associated with the educational resource.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Educational resource added successfully
 *       400:
 *         description: Bad request, check the request parameters
 *       500:
 *         description: Internal server error
 */
router.post("/", addeducationalresource);




/**
 * @swagger
 * /api/educationalresources/{id}:
 *   delete:
 *     summary: Delete an educational resource by ID
 *     tags: [EducationalResources]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the educational resource to delete
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Educational resource deleted successfully
 *       404:
 *         description: Educational resource not found
 *       500:
 *         description: Internal server error
 */
router.delete("/:id", deleteeducationalresource);

/**
 * @swagger
 * /api/educationalresources/{id}:
 *   get:
 *     summary: Get an educational resource by ID
 *     tags: [EducationalResources]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the educational resource to retrieve
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Successful response with the educational resource
 *       404:
 *         description: Educational resource not found
 *       500:
 *         description: Internal server error
 */
router.get("/:id", geteducationalresource);

/**
 * @swagger
 * /api/educationalresources/{id}:
 *   put:
 *     summary: Update an educational resource by ID
 *     tags: [EducationalResources]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the educational resource to update
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Title:
 *                 type: string
 *                 description: The new title of the educational resource
 *               Content:
 *                 type: string
 *                 description: The new content of the educational resource
 *               ResourceType:
 *                 type: string
 *                 description: The new type of the educational resource
 *               PublicationDate:
 *                 type: string
 *                 format: date
 *                 description: The new publication date of the educational resource
 *               photo:
 *                 type: string
 *                 description: The new filename of the photo associated with the educational resource
 *             example:
 *               Title: "Updated Math Basics"
 *               Content: "A comprehensive guide to basic mathematics concepts, updated version."
 *               ResourceType: "Guide"
 *               PublicationDate: "2023-12-31"
 *               photo: "updated_math_basics.jpg"
 *     responses:
 *       200:
 *         description: Educational resource updated successfully
 *       400:
 *         description: Bad request, check the request body
 *       404:
 *         description: Educational resource not found
 *       500:
 *         description: Internal server error
 */
router.put("/:id", editeducationalresource);

export default router;
