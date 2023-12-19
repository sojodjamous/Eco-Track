import { db } from '../connect.js';
import jwt from 'jsonwebtoken'; 
import moment from 'moment'; 

// Get all user connections
// export const getuserconnections = (req, res) => {
//   db.query("SELECT * FROM userconnection", (err, results) => {
//     if (err) {
//       console.error(err);
//       res.status(500).json({ message: "Internal Server Error" });
//     } else {
//       res.status(200).json(results);
//     }
//   });
// };

// Add a new user connection
export const adduserconnection = (req, res) => {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Not logged in!");
    jwt.verify(token, "secretkey", (err, userInfo) => {
      if (err) return res.status(403).json("Token is not valid!");
  
      const UserID1 = userInfo.userID;
  
      const { UserID2, message } = req.body;
  
      const checkUserQuery = "SELECT * FROM user WHERE UserID = ?";
      db.query(checkUserQuery, [UserID1], (err, results) => {
        if (err) {
          console.error(err);
          res.status(500).json({ message: "Internal Server Error" });
          return;
        }
  
        if (results.length === 0) {
          res.status(404).json({ message: `User with ID ${UserID1} not found` });
          return;
        }
  
        db.query(checkUserQuery, [UserID2], (err, results) => {
          if (err) {
            console.error(err);
            res.status(500).json({ message: "Internal Server Error" });
            return;
          }
  
          if (results.length === 0) {
            res.status(404).json({ message: `User with ID ${UserID2} not found` });
            return;
          }
  
          const insertConnectionQuery =
            "INSERT INTO userconnection (UserID1, UserID2, ConnectionDate, from_flag, message) VALUES (?, ?, NOW(), ?, ?)";
          const fromflag = UserID1;
          db.query(
            insertConnectionQuery,
            [UserID1, UserID2, fromflag, message],
            (err, result) => {
              if (err) {
                console.error(err);
                res.status(500).json({ message: "Internal Server Error" });
              } else {
                res
                  .status(201)
                  .json({ message: "User connection and message added successfully", id: result.insertId });
              }
            }
          );
        });
      });
    });
  };
  



// Delete a user connection by ID
export const deleteuserconnections = (req, res) => {
  const connectionId = req.params.id;
  const sql = "DELETE FROM userconnection WHERE ConnectionID = ?";
  db.query(sql, [connectionId], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: "Internal Server Error" });
    } else {
      res.status(200).json({ message: "User connection deleted successfully" });
    }
  });
};


// Get a user connection by ID
export const getUserConnectionWithUserData = (req, res) => {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Not logged in!");
    jwt.verify(token, "secretkey", (err, userInfo) => {
      if (err) return res.status(403).json("Token is not valid!");
  
      const userId = userInfo.userID;
//   const userId = req.params.id;
  const sql = `
    SELECT uc.*, 
           u1.Username AS SenderUsername, u1.user_photo AS SenderPhoto, u1.UserID AS SenderID,
           u2.Username AS ReceiverUsername, u2.user_photo AS ReceiverPhoto, u2.UserID AS ReceiverID
    FROM userconnection uc
    LEFT JOIN user u1 ON uc.UserID1 = u1.UserID
    LEFT JOIN user u2 ON uc.UserID2 = u2.UserID
    WHERE uc.UserID1 = ? OR uc.UserID2 = ?
  `;
  
  db.query(sql, [userId, userId], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: "Internal Server Error" });
    } else {
      if (results.length === 0) {
        res.status(404).json({ message: "User connection not found" });
      } else {
        res.status(200).json(results);
      }
    }
  });
});

};

 
export const edituserconnection = (req, res) => {
  const connectionId = req.params.id;
  const { message } = req.body;

  const sql = "UPDATE userconnection SET message = ?, ConnectionDate = NOW() WHERE ConnectionID = ?";
  db.query(sql, [message, connectionId], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: "Internal Server Error" });
    } else {
      if (result.affectedRows === 0) {
        res.status(404).json({ message: "User connection not found" });
      } else {
        res.status(200).json({ message: "User connection updated successfully" });
      }
    }
  });
};


export const getConversationBetweenUsers = (req, res) => {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Not logged in!");
    jwt.verify(token, "secretkey", (err, userInfo) => {
      if (err) return res.status(403).json("Token is not valid!");
  
      const userId1 = userInfo.userID;
//   const userId1 = req.params.userId1;
  const userId2 = req.params.userId2;

  const userSql = `
    SELECT uc.ConnectionID, uc.UserID1, uc.UserID2,
           u1.Username AS SenderUsername, u1.user_photo AS SenderPhoto, u1.UserID AS SenderID,
           u2.Username AS ReceiverUsername, u2.user_photo AS ReceiverPhoto, u2.UserID AS ReceiverID
    FROM userconnection uc
    LEFT JOIN user u1 ON uc.UserID1 = u1.UserID
    LEFT JOIN user u2 ON uc.UserID2 = u2.UserID
    WHERE (uc.UserID1 = ? AND uc.UserID2 = ?) OR (uc.UserID1 = ? AND uc.UserID2 = ?)
  `;
  
  db.query(userSql, [userId1, userId2, userId2, userId1], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: "Internal Server Error" });
    } else {
      if (results.length === 0) {
        res.status(404).json({ message: "Conversation not found" });
      } else {
        const conversationId = results[0].ConnectionID;
        const conversationSql = `
          SELECT *
          FROM userconnection
          WHERE ConnectionID = ?
        `;

        db.query(conversationSql, [conversationId], (err, messages) => {
          if (err) {
            console.error(err);
            res.status(500).json({ message: "Internal Server Error" });
          } else {
            if (messages.length === 0) {
              res.status(404).json({ message: "No messages found for this conversation" });
            } else {
              const data = {
                ConversationDetails: results[0],
                Messages: messages
              };
              res.status(200).json(data);
            }
          }
        });
      }
    }
  });
});

};
