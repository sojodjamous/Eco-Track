import  express  from "express";
import {  adduserconnection, deleteuserconnections,getConversationBetweenUsers,getUserConnectionWithUserData,edituserconnection } from "../controllers/connections.js";

const router = express.Router()
/**
 * @swagger
 * tags:
 *   name: Connections
 *   description: User connections and conversations API
 */

/**
 * @swagger
 * /api/connections:
 *   post:
 *     summary: Add a new user connection
 *     tags: [Connections]
 *     parameters:
 *       - in: query
 *         name: UserID2
 *         required: true
 *         description: The ID of the user to connect with.
 *         schema:
 *           type: integer
 *       - in: query
 *         name: message
 *         required: true
 *         description: The message associated with the connection.
 *         schema:
 *           type: string
 *     responses:
 *       201:
 *         description: User connection and message added successfully
 *       400:
 *         description: Bad request, check the request parameters
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
router.post("/", adduserconnection);

/**
 * @swagger
 * /api/connections/{id}:
 *   delete:
 *     summary: Delete a user connection by ID
 *     tags: [Connections]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the user connection to delete.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: User connection deleted successfully
 *       404:
 *         description: User connection not found
 *       500:
 *         description: Internal server error
 */
router.delete("/:id", deleteuserconnections);

/**
 * @swagger
 * /api/connections:
 *   get:
 *     summary: Get user connections with user data
 *     tags: [Connections]
 *     responses:
 *       200:
 *         description: User connections retrieved successfully
 *       404:
 *         description: User connections not found
 *       500:
 *         description: Internal server error
 */
router.get("/", getUserConnectionWithUserData);

/**
 * @swagger
 * /api/connections/{id}:
 *   put:
 *     summary: Edit a user connection by ID
 *     tags: [Connections]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the user connection to edit.
 *         schema:
 *           type: integer
 *       - in: query
 *         name: message
 *         required: true
 *         description: The updated message associated with the connection.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User connection updated successfully
 *       404:
 *         description: User connection not found
 *       500:
 *         description: Internal server error
 */
router.put("/:id", edituserconnection);

/**
 * @swagger
 * /api/connections/{userId2}:
 *   get:
 *     summary: Get conversation between users
 *     tags: [Connections]
 *     parameters:
 *       - in: path
 *         name: userId2
 *         required: true
 *         description: The ID of the second user involved in the conversation.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Conversation retrieved successfully
 *       404:
 *         description: Conversation not found
 *       500:
 *         description: Internal server error
 */
router.get("/:userId2", getConversationBetweenUsers);

export default router;
