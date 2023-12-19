import express from 'express';
import { getPosts, addPost, deletePost, getuserpost, editpost } from '../controllers/post.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: POST
 *   description: Operations related to POST
 */

/**
 * @swagger
 * /api/posts:
 *   get:
 *     summary: Get all posts
 *     description: Retrieve a list of all posts.
 *     tags: [POST]
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               message: Posts retrieved successfully
 *               posts:
 *                 - post_id: 1
 *                   user_id: 123
 *                   Username: USERJohnDoe
 *                   content: Lorem ipsum
 *                   photo: 'post.jpg'
 *                   environmental_data: 'Data'
 *                   sources: 'Sources'
 *                   time: '2023-12-04T12:34:56Z'
 *                   location: 'New York'
 *                   commentCount: 5
 *                   likeCount: 10
 */
router.get("/", getPosts);

/**
 * @swagger
 * /api/posts:
 *   post:
 *     summary: Add a new post
 *     description: Add a new post to the system.
 *     tags: [POST]
 *     parameters:
 *       - in: formData
 *         name: content
 *         type: string
 *         description: The content of the new post.
 *         required: true
 *       - in: formData
 *         name: photo
 *         type: string
 *         description: The photo URL of the new post.
 *       - in: formData
 *         name: environmental_data
 *         type: string
 *         description: The environmental data of the new post.
 *       - in: formData
 *         name: sources
 *         type: string
 *         description: The sources of the new post.
 *       - in: formData
 *         name: location
 *         type: string
 *         description: The location of the new post.
 *     responses:
 *       200:
 *         description: Post added successfully
 *         content:
 *           application/json:
 *             example:
 *               message: Post added successfully
 *               post:
 *                 post_id: 1
 *                 user_id: 123
 *                 content: Lorem ipsum
 *                 photo: 'post.jpg'
 *                 environmental_data: 'Data'
 *                 sources: 'Sources'
 *                 time: '2023-12-04T12:34:56Z'
 *                 location: 'New York'
 *                 commentCount: 0
 *                 likeCount: 0
 */
router.post("/", addPost);

/**
 * @swagger
 * /api/posts/{post_id}:
 *   put:
 *     summary: Update a post by ID
 *     description: Update a post in the system by providing the post ID.
 *     tags: [POST]
 *     parameters:
 *       - in: path
 *         name: post_id
 *         required: true
 *         description: ID of the post to update
 *         schema:
 *           type: integer
 *       - in: formData
 *         name: content
 *         type: string
 *         description: The new content of the post.
 *       - in: formData
 *         name: photo
 *         type: string
 *         description: The new photo URL of the post.
 *       - in: formData
 *         name: location
 *         type: string
 *         description: The new location of the post.
 *     responses:
 *       200:
 *         description: Post updated successfully
 *       404:
 *         description: Post not found
 */
router.put("/:post_id", editpost);

/**
 * @swagger
 * /api/posts/{user_id}/{post_id}:
 *   get:
 *     summary: Get posts by user ID
 *     description: Retrieve posts from the system by providing the user ID.
 *     tags: [POST]
 *     parameters:
 *       - in: path
 *         name: user_id
 *         required: true
 *         description: ID of the user to retrieve posts
 *         schema:
 *           type: integer
 *       - in: path
 *         name: post_id
 *         required: true
 *         description: ID of the post to retrieve
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               post_id: 1
 *               user_id: 123
 *               Username: USERJohnDoe
 *               content: Lorem ipsum
 *               photo: 'post.jpg'
 *               environmental_data: 'Data'
 *               sources: 'Sources'
 *               time: '2023-12-04T12:34:56Z'
 *               location: 'New York'
 *               commentCount: 5
 *               likeCount: 10
 *       404:
 *         description: Post not found
 */
router.get('/:user_id/:post_id', getuserpost);

/**
 * @swagger
 * /api/posts/{post_id}:
 *   delete:
 *     summary: Delete a post by ID
 *     description: Delete a post from the system by providing the post ID.
 *     tags: [POST]
 *     parameters:
 *       - in: path
 *         name: post_id
 *         required: true
 *         description: ID of the post to delete
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Post deleted successfully
 *       404:
 *         description: Post not found
 */
router.delete("/:post_id", deletePost);

export default router;
