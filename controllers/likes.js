import { db } from "../connect.js";
import jwt from "jsonwebtoken";

export const getLikes = (req, res) => {
  const q = "SELECT COUNT(user_id) AS likeCount FROM `likes` WHERE post_id = ?";
  db.query(q, [req.params.postid], (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json(err);
    }
    const likeCount = data.length > 0 ? data[0].likeCount : 0;
    return res.status(200).json({ likeCount });
  });
};




export const addLike = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const user_id = userInfo.userID;
    const post_id = req.body.post_id;

    if (!post_id) {
      return res.status(400).json("Post ID is required.");
    }

    // Check if the user has already liked the post
    const checkQuery = "SELECT * FROM `likes` WHERE `user_id` = ? AND `post_id` = ?";
    db.query(checkQuery, [user_id, post_id], (checkErr, checkData) => {
      if (checkErr) {
        console.error(checkErr);
        return res.status(500).json("Failed to check existing likes.");
      }

      if (checkData.length > 0) {
        // The user has already liked the post
        return res.status(400).json("You have already liked this post.");
      }

      // If not, proceed to add the like
      const insertQuery = "INSERT INTO `likes` (`user_id`, `post_id`) VALUES (?, ?)";
      const values = [user_id, post_id];

      db.query(insertQuery, values, (insertErr, insertData) => {
        if (insertErr) {
          console.error(insertErr);
          return res.status(500).json("Failed to add like.");
        }
        return res.status(200).json("Post has been liked.");
      });
    });
  });
};




export const deleteLike = (req, res) => {
    const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");
  const decodedToken = jwt.verify(token, 'secretkey');
    const user_id = decodedToken.userID;
//   const user_id = req.params.user_id;
  const postId = req.params.postid;

  db.query('DELETE FROM `likes` WHERE `user_id` = ? AND `post_id` = ?', [user_id, postId], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'An error occurred while deleting the like.' });
    }

    // Check if any rows were affected
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Like not found.' });
    }

    // Like successfully deleted
    return res.status(200).json({ message: 'Like has been deleted.' });
  });
}










