import { db } from "../connect.js";
import jwt from "jsonwebtoken";
import moment from "moment";

export const getPosts = (req, res) => {

  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");
  jwt.verify(token, "secretkey", (err, userInfo) => {


  if (err) return res.status(403).json("Token is not valid!");


  const q = `
    SELECT p.*, u.UserID, u.Username, u.user_photo
    FROM post AS p
    JOIN user AS u ON (u.UserID = p.user_id )
    ORDER BY p.time DESC
  `;

  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);

    if (!data) {
      return res.status(404).json({
        message: "No posts found",
      });
    }

    if (!Array.isArray(data)) {
      return res.status(400).json({
        message: "Invalid data returned from database",
      });
    }

    data.forEach((post) => {
      if (
        !post.hasOwnProperty("post_id") ||
        !post.hasOwnProperty("photo") ||
        !post.hasOwnProperty("content") ||
        !post.hasOwnProperty("time") ||
        !post.hasOwnProperty("location") ||
        !post.hasOwnProperty("sources") ||
        !post.hasOwnProperty("environmental_data") ||
        !post.hasOwnProperty("Username") ||
        !post.hasOwnProperty("user_photo") 



      ) {
        return res.status(400).json({
          message: "Invalid post object returned from database",
        });
      }
    });

    return res.status(200).json(data);
  });  });
};


export const addPost = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    if (!userInfo.userID) {
      return res.status(400).json("user id is required");
    }

    const q =
      "INSERT INTO post(`user_id`, `content`, `photo`, `time`, `location`, `sources`, `environmental_data`) VALUES (?)";
    const values = [
      userInfo.userID,
      req.body.content,
      req.body.photo,
      moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
      req.body.location,
      req.body.sources,
      req.body.environmental_data,
    ];

    db.query(q, [values], (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json(err);
      }

      const post_id = result.insertId;

      // Update user's score
      const updateScoreQuery = "UPDATE user SET score = score + 10 WHERE UserID = ?";
      db.query(updateScoreQuery, [userInfo.userID], (scoreUpdateErr) => {
        if (scoreUpdateErr) {
          console.log(scoreUpdateErr);
          return res.status(500).json(scoreUpdateErr);
        }

        // Retrieve user IDs with the same location
        const getUsersQuery =
          "SELECT UserID FROM user WHERE location = ?";
        db.query(getUsersQuery, [req.body.location], (getUsersErr, userRows) => {
          if (getUsersErr) {
            console.log(getUsersErr);
            return res.status(500).json(getUsersErr);
          }

          const userIDs = userRows.map((user) => user.UserID);

          // Insert alerts for matching users
          const insertAlertsQuery =
            "INSERT INTO alerts(`UserID`, `post_id`) VALUES ?";
          const alertValues = userIDs.map((userID) => [userID, post_id]);

          if (alertValues.length > 0) {
            db.query(insertAlertsQuery, [alertValues], (alertInsertErr) => {
              if (alertInsertErr) {
                console.log(alertInsertErr);
                return res.status(500).json(alertInsertErr);
              }

              const newPost = {
                post_id: post_id,
                user_id: userInfo.userID, // Use user_id from JWT
                content: req.body.content,
                photo: req.body.photo,
                time: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
                location: req.body.location,
                sources: req.body.sources,
                environmental_data: req.body.environmental_data,
              };

              return res.status(200).json(newPost);
            });
          } else {
            // Handle the case where alertValues is empty
            return res.status(200).json("Post added successfully, but no matching users for alerts");
          }
        });
      });
    });
  });
};



export const editpost = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    console.log("UserInfo from JWT:", userInfo);

    if (err) return res.status(403).json("Token is not valid!");

    const user_id_from_jwt = userInfo.userID; // Corrected
    const post_id = req.params.post_id;

    if (!user_id_from_jwt || !post_id) {
      console.log(user_id_from_jwt, post_id);
      return res
        .status(400)
        .json("user id (from JWT) and post id are required");
    }

    let ownershipRows; // Declare ownershipRows here

    const checkPostOwnershipQuery = "SELECT user_id FROM post WHERE post_id = ?";
    db.query(checkPostOwnershipQuery, [post_id], (checkOwnershipErr, rows) => {
      if (checkOwnershipErr) {
        console.log(checkOwnershipErr);
        return res.status(500).json(checkOwnershipErr);
      }

      ownershipRows = rows; // Assign the value here

      if (ownershipRows.length === 0 || ownershipRows[0].user_id !== user_id_from_jwt) {
        return res.status(403).json("You don't have permission to edit this post");
      }

      // Retrieve user_id_from_post based on post_id
      const getUserIDQuery = "SELECT user_id FROM post WHERE post_id = ?";
      db.query(getUserIDQuery, [post_id], (getUserIDErr, userRows) => {
        if (getUserIDErr) {
          console.log(getUserIDErr);
          return res.status(500).json(getUserIDErr);
        }

        if (userRows.length === 0) {
          return res.status(404).json("Post not found");
        }

        const user_id_from_post = userRows[0].user_id;

        // Update the post or perform other actions with user_id_from_post
        const updatePostQuery = "UPDATE post SET `location` = ?, `content` = ?, `photo` = ? WHERE `post_id` = ?";
        const updateValues = [req.body.location, req.body.content, req.body.photo, post_id];

        db.query(updatePostQuery, updateValues, (updatePostErr) => {
          if (updatePostErr) {
            console.log(updatePostErr);
            return res.status(500).json(updatePostErr);
          }

          // Delete existing alerts for the post with the previous location
          const deleteAlertsQuery = "DELETE FROM alerts WHERE `post_id` = ?";
          db.query(deleteAlertsQuery, [post_id], (deleteAlertsErr) => {
            if (deleteAlertsErr) {
              console.log(deleteAlertsErr);
              return res.status(500).json(deleteAlertsErr);
            }

            // Check if there are matching users for the new location
            const getMatchingUsersQuery = "SELECT UserID FROM user WHERE location = ?";
          
            db.query(getMatchingUsersQuery, [req.body.location], (getMatchingUsersErr, userRows) => {
              if (getMatchingUsersErr) {
                console.log(getMatchingUsersErr);
                return res.status(500).json(getMatchingUsersErr);
              }

              const userIDs = userRows.map((user) => user.UserID);

              if (userIDs.length > 0) {
                // Insert new alerts for the updated post
                const insertAlertsQuery = "INSERT INTO alerts(`UserID`, `post_id`) VALUES ?";
                const alertValues = userIDs.map((userID) => [userID, post_id]);

                db.query(insertAlertsQuery, [alertValues], (insertAlertsErr) => {
                  if (insertAlertsErr) {
                    console.log(insertAlertsErr);
                    return res.status(500).json(insertAlertsErr);
                  }

                  return res.status(200).json("Post and alerts updated successfully");
                });
              } else {
                return res.status(200).json("Post updated, but no matching users for new location");
              }
            });
          });
        });
      });
    });
  });
};









export const deletePost = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  const postId = req.params.post_id;
  if (!postId) {
      return res.status(400).json("Post ID is required");
  }
  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");
  const userIdFromToken = userInfo.userID; 
  const checkOwnershipQuery = "SELECT `user_id` FROM `post` WHERE `post_id` = ?";

  db.query(checkOwnershipQuery, [postId], (err, data) => {
      if (err) {
          console.error('Error checking ownership:', err);
          return res.status(500).json({ error: 'An error occurred' });
      }

      if (!data || data.length === 0) {
          return res.status(404).json({ message: 'Post not found' });
      }

      const postOwnerId = data[0].user_id;

      if (userIdFromToken !== postOwnerId) {
          return res.status(403).json({ message: 'You are not authorized to delete this post' });
      }

      const deletealeartQuery = "DELETE FROM `alerts` WHERE `post_id` = ?";

      const deleteCommentsQuery = "DELETE FROM `comments` WHERE `post_id` = ?";
      
      const deleteLikesQuery = "DELETE FROM `likes` WHERE `post_id` = ?";

      const deletePostQuery = "DELETE FROM `post` WHERE `post_id` = ?";

      db.query(deletealeartQuery, [postId], (erralerts, dataalerts) => {
        if (erralerts) return res.status(500).json(erralerts);


      db.query(deleteCommentsQuery, [postId], (errComments, dataComments) => {
          if (errComments) return res.status(500).json(errComments);

          db.query(deleteLikesQuery, [postId], (errLikes, dataLikes) => {
              if (errLikes) return res.status(500).json(errLikes);

              db.query(deletePostQuery, [postId], (errPost, dataPost) => {
                  if (errPost) return res.status(500).json(errPost);

                  if (dataPost.affectedRows > 0) {
                      return res.status(200).json("Post and associated comments/likes have been deleted.");
                  } else {
                      return res.status(404).json("Post not found");
                  }
              });
          });
      });
    });
  });
});

};


export const getuserpost = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");
  const user_id = req.params.user_id;
  const q = `
    SELECT 
      p.post_id,
      p.user_id,
      u.Username, 
      p.content,
      p.photo,
      p.environmental_data,
      p.sources,
      p.time,
      p.location,
      (SELECT COUNT(*) FROM comments c WHERE c.post_id = p.post_id) AS commentCount,
      (SELECT COUNT(*) FROM likes l WHERE l.post_id = p.post_id) AS likeCount
    FROM 
      post p
    JOIN 
      user u ON p.user_id = u.UserID
    WHERE 
      p.user_id = ? 
    ORDER BY 
      p.time DESC
  `;

  db.query(q, [user_id], (err, data) => {
    if (err) {
      console.error('Error occurred:', err);
      return res.status(500).json({ error: 'An error occurred' });
    }

    if (!data || data.length === 0) {
      return res.status(404).json({ message: 'No posts found' });
    }

    const invalidPosts = data.filter(post => {
      const isValid =
        post.hasOwnProperty('post_id') &&
        post.hasOwnProperty('UserID') &&
        post.hasOwnProperty('Username') &&
        post.hasOwnProperty('content') &&
        post.hasOwnProperty('photo') &&
        post.hasOwnProperty('environmental_data') &&
        post.hasOwnProperty('sources') &&
        post.hasOwnProperty('time') &&
        post.hasOwnProperty('location') &&
        post.hasOwnProperty('commentCount') &&
        post.hasOwnProperty('likeCount');

      if (!isValid) {
        console.log('Invalid post:', post);
      }

      return !isValid;
    });

    return res.status(200).json(data);
  });
};
