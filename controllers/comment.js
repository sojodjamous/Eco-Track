import { db } from '../connect.js';
import jwt from 'jsonwebtoken'; 
import moment from 'moment'; 
export const getusercomments = (req, res) => {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Not logged in!");

    try {
        const decodedToken = jwt.verify(token, 'secretkey');
        console.log(decodedToken); // Log the decoded token to inspect its contents
        const user_id = decodedToken.userID;

        const q = `
            SELECT 
                c.*, 
                u.Username AS username, 
                u.user_photo AS user_photo 
            FROM 
                comments AS c 
            LEFT JOIN 
                user AS u ON (c.UserID = u.UserID) 
            WHERE 
                c.UserID = ? 
            ORDER BY 
                c.CommentDate DESC`;
        db.query(q, [user_id], (err, data) => {
            if (err) return res.status(500).json(err);
            if (data.length === 0) {
                return res.status(404).json({ message: 'no comments' });
            }
            return res.json(data);
        });
    } catch (error) {
        return res.status(403).json("Token is not valid!");
    }
};

export const addcomment = (req, res) => {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Not logged in!");

    jwt.verify(token, "secretkey", (err, decodedToken) => {
        if (err) return res.status(403).json("Token is not valid!");
        
        console.log(decodedToken); // Log the decoded token to inspect its contents
    
        const userID = decodedToken.userID;

        if (!userID || !req.body.post_id || !req.body.CommentText) {
            console.log(userID);
            return res.status(400).json("UserID, post_id, and CommentText are required");
        }

        // Check if the post exists
        const checkPostQuery = 'SELECT * FROM `post` WHERE `post_id` = ? ';
        db.query(checkPostQuery, [req.body.post_id], (postErr, postResult) => {
            if (postErr) {
                console.log(postErr);
                return res.status(500).json(postErr);
            }

            if (postResult.length === 0) {
                return res.status(404).json("The specified post does not exist or you do not have permission.");
            }

            // Continue with the comment insertion
            const q = 'INSERT INTO comments (UserID, post_id, CommentText, CommentDate) VALUES (?, ?, ?, NOW())';
            const values = [
                userID,
                req.body.post_id,
                req.body.CommentText
            ];

            db.query(q, values, (err, result) => {
                if (err) {
                    console.log(err);
                    return res.status(500).json(err);
                }

                const commentId = result.insertId;
                const newComment = {
                    id: commentId,
                    UserID: userID,
                    post_id: req.body.post_id,
                    CommentText: req.body.CommentText,
                    CommentDate: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
                };

                const incrementScoreQuery = 'UPDATE `user` SET score = score + 3 WHERE UserID = ?';
                db.query(incrementScoreQuery, [userID], (scoreErr) => {
                    if (scoreErr) {
                        return res.status(500).json(scoreErr);
                    }
                    return res.status(200).json(newComment);
                });
            });
        });
    });
};



export const deletecomment=(req,res)=>{
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Not logged in!");
    const decodedToken = jwt.verify(token, 'secretkey');
      const user_id = decodedToken.userID;
    // const user_id = req.params.user_id;
    const CommentID = req.params.id;
  
    db.query(
      'DELETE FROM `comments` WHERE `UserID` = ? AND `CommentID` = ?',
      [user_id, CommentID],
      (err, result) => {
        if (err) {
          console.error(err);
          return res
            .status(500)
            .json({ error: 'An error occurred while deleting the comment.' });
        }
  
        if (result.affectedRows === 0) {
          return res.status(404).json({ error: 'comment not found.' });
        }
  
        return res.status(200).json({ message: 'comment has been deleted.' });
      }
    );
}

export const editcomment=(req,res)=>{
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Not logged in!");
    const decodedToken = jwt.verify(token, 'secretkey');
      const user_id = decodedToken.userID;
      const CommentID = req.params.id;
      console.log(CommentID)
    const {CommentText } = req.body;
    const q = 'UPDATE comments SET CommentText = ?, CommentDate = NOW() WHERE UserID = ? AND CommentID= ?';
    db.query(q, [CommentText, user_id,CommentID], (err, result) => {
        if (err) return res.status(500).json(err);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Comment not found' });
        }
        return res.json({ message: 'Comment updated successfully' });
    });
}

export const getcomment = (req, res) => {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Not logged in!");
    const postid = req.params.id;
    const q = `
        SELECT 
            c.*, 
            u.Username AS username, 
            u.user_photo AS user_photo 
        FROM 
            comments c 
        LEFT JOIN 
            user u ON c.UserID = u.UserID 
        WHERE 
            c.post_id = ? 
        ORDER BY 
            c.CommentDate DESC`;
    
    db.query(q, [postid], (err, data) => {
        if (err) return res.status(500).json(err);
        if (data.length === 0) {
            return res.status(404).json({ message: 'no comments' });
        }
        return res.json(data);
    });
};
