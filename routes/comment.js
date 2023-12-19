import  express  from "express";
import { getusercomments,getcomment,deletecomment,addcomment,editcomment } from "../controllers/comment.js";
const router = express.Router()
/**
 * @swagger
 * /api/comments:
 *   get:
 *     summary: Get comments for the logged-in user
 *     tags: [Comments]
 *     responses:
 *       200:
 *         description: List of comments for the logged-in user
 *       401:
 *         description: Not logged in
 *       403:
 *         description: Token is not valid
 *       500:
 *         description: Internal Server Error
 */
router.get("/", getusercomments);

/**
 * @swagger
 * /api/comments:
 *   post:
 *     summary: Add a new comment
 *     tags: [Comments]
 *     parameters:
 *       - in: query
 *         name: post_id
 *         required: true
 *         description: The ID of the post to add the comment to
 *         schema:
 *           type: integer
 *       - in: query
 *         name: CommentText
 *         required: true
 *         description: The text of the comment
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Comment added successfully
 *       400:
 *         description: Bad request, check the request body
 *       401:
 *         description: Not logged in
 *       403:
 *         description: Token is not valid
 *       404:
 *         description: The specified post does not exist or you do not have permission
 *       500:
 *         description: Internal Server Error
 */
router.post("/", addcomment);

/**
 * @swagger
 * /api/comments/{id}:
 *   delete:
 *     summary: Delete a comment by ID
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the comment to delete
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Comment deleted successfully
 *       401:
 *         description: Not logged in
 *       403:
 *         description: Token is not valid
 *       404:
 *         description: Comment not found
 *       500:
 *         description: Internal Server Error
 */
router.delete("/:id", deletecomment);

/**
 * @swagger
 * /api/comments/post/{id}:
 *   get:
 *     summary: Get comments for a specific post by ID
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the post
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: List of comments for the specified post
 *       401:
 *         description: Not logged in
 *       403:
 *         description: Token is not valid
 *       404:
 *         description: No comments found for the specified post
 *       500:
 *         description: Internal Server Error
 */
router.get("/post/:id", getcomment);

/**
 * @swagger
 * /api/comments/{id}:
 *   put:
 *     summary: Edit a comment by ID
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the comment to edit
 *         schema:
 *           type: integer
  *       - in: query
 *         name: CommentText
 *         required: true
 *         description: The text of the comment
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               CommentText:
 *                 type: string
 *     responses:
 *       200:
 *         description: Comment updated successfully
 *       401:
 *         description: Not logged in
 *       403:
 *         description: Token is not valid
 *       404:
 *         description: Comment not found
 *       500:
 *         description: Internal Server Error
 */
router.put("/:id", editcomment);

export default router;
