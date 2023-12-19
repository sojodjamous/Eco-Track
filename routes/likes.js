import express from "express";
import { getLikes, addLike, deleteLike } from "../controllers/likes.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: LIKES
 *   description: Operations related to LIKES
 */

/**
 * @swagger
 * /api/likes/{postid}:
 *   get:
 *     summary: Get likes count for a post
 *     description: Retrieve the number of likes for a specific post.
 *     tags: [LIKES]
 *     parameters:
 *       - in: path
 *         name: postid
 *         required: true
 *         description: ID of the post to retrieve likes count
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               likeCount: 5
 */
router.get("/:postid", getLikes);

/**
 * @swagger
 * /api/likes:
 *   post:
 *     summary: Add like to a post
 *     description: Add a like to a specific post.
 *     tags: [LIKES]
 *     parameters:
 *       - in: formData
 *         name: post_id
 *         type: integer
 *         description: ID of the post to add like
 *         required: true
 *     responses:
 *       200:
 *         description: Like added successfully
 *       400:
 *         description: User has already liked the post
 *       401:
 *         description: Not logged in
 *       403:
 *         description: Token is not valid
 *       500:
 *         description: Failed to add like
 */
router.post("/", addLike);

/**
 * @swagger
 * /api/likes/{postid}:
 *   delete:
 *     summary: Delete like from a post
 *     description: Delete a like from a specific post.
 *     tags: [LIKES]
 *     parameters:
 *       - in: path
 *         name: postid
 *         required: true
 *         description: ID of the post to delete like
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Like deleted successfully
 *       401:
 *         description: Not logged in
 *       500:
 *         description: An error occurred while deleting the like
 */
router.delete("/:postid", deleteLike);

export default router;
