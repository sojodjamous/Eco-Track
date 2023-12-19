import express from 'express';
import { getusers, adduser, deleteUser, getuser, edituser, login, logout } from '../controllers/users.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: USER
 *   description: Operations related to USER
 */

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get all users
 *     description: Retrieve a list of all users.
 *     tags: [USER]
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               message: Users retrieved successfully
 *               users:
 *                 - Username: USERJohnDoe
 *                   score: 100
 *                   user_photo: 'john.jpg'
 *                   location: 'New York'
 */
router.get("/", getusers);

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Add a new user
 *     description: Add a new user to the system.
 *     tags: [USER]
 *     parameters:
 *       - in: formData
 *         name: Username
 *         type: string
 *         description: The username of the new user, prefixed with "USER".
 *         required: true
 *       - in: formData
 *         name: Password
 *         type: string
 *         description: The password of the new user.
 *         required: true
 *       - in: formData
 *         name: Email
 *         type: string
 *         description: The email of the new user.
 *         required: true
 *       - in: formData
 *         name: user_photo
 *         type: string
 *         description: The user photo URL.
 *       - in: formData
 *         name: profile_photo
 *         type: string
 *         description: The profile photo URL.
 *       - in: formData
 *         name: score
 *         type: integer
 *         description: The score of the new user, adjust as needed.
 *       - in: formData
 *         name: location
 *         type: string
 *         description: The location of the new user.
 *     responses:
 *       200:
 *         description: User added successfully
 *         content:
 *           application/json:
 *             example:
 *               message: User added successfully
 *               user:
 *                 Username: USERJohnDoe
 *                 Email: john@example.com
 *                 location: New York
 */
router.post("/", adduser);

/**
 * @swagger
 * /api/users:
 *   delete:
 *     summary: Delete a user by ID
 *     description: Delete a user from the system by providing the user ID.
 *     tags: [USER]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user to delete
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       404:
 *         description: User not found
 */
router.delete("/", deleteUser);

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Get a user by ID
 *     description: Retrieve a user from the system by providing the user ID.
 *     tags: [USER]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user to retrieve
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               Username: USERJohnDoe
 *               Email: john@example.com
 *               score: 100
 *               user_photo: 'john.jpg'
 *               location: 'New York'
 *       404:
 *         description: User not found
 */
router.get("/getuser/", getuser);

/**
 * @swagger
 * /api/users/{id}:
 *   put:
 *     summary: Update a user by ID
 *     description: Update a user in the system by providing the user ID.
 *     tags: [USER]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user to update
 *         schema:
 *           type: integer
 *       - in: formData
 *         name: Username
 *         type: string
 *         description: The new username of the user.
 *       - in: formData
 *         name: Password
 *         type: string
 *         description: The new password of the user.
 *       - in: formData
 *         name: user_photo
 *         type: string
 *         description: The new user photo URL.
 *       - in: formData
 *         name: profile_photo
 *         type: string
 *         description: The new profile photo URL.
 *       - in: formData
 *         name: location
 *         type: string
 *         description: The new location of the user.
 *     responses:
 *       200:
 *         description: User updated successfully
 *       404:
 *         description: User not found
 */
router.put("/", edituser);

/**
 * @swagger
 * /api/users/login:
 *   post:
 *     summary: User login
 *     description: Log in a user by providing email and password.
 *     tags: [USER]
 *     parameters:
 *       - in: formData
 *         name: Email
 *         type: string
 *         description: The email of the user for login.
 *         required: true
 *       - in: formData
 *         name: Password
 *         type: string
 *         description: The password of the user for login.
 *         required: true
 *     responses:
 *       200:
 *         description: User logged in successfully
 *         content:
 *           application/json:
 *             example:
 *               message: User logged in successfully
 *               user:
 *                 Username: USERJohnDoe
 *                 Email: john@example.com
 *       400:
 *         description: Wrong Password or Email
 *       404:
 *         description: User not found
 */
router.post('/login', login);

/**
 * @swagger
 * /api/users/logout:
 *   post:
 *     summary: User logout
 *     description: Log out a user and clear the access token.
 *     tags: [USER]
 *     responses:
 *       200:
 *         description: User logged out successfully
 *       500:
 *         description: Server Error
 */
router.post('/logout', logout);

export default router;
