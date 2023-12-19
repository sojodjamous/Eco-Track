import { db } from '../connect.js';
import jwt from 'jsonwebtoken';

export const getalearts = async (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  try {
    const decodedToken = jwt.verify(token, 'secretkey');
    const userID = decodedToken.userID;

    const getAllAlertsQuery = `
      SELECT p.*, u.Username, u.user_photo, a.seen_alert
      FROM alerts a
      JOIN post p ON a.post_id = p.post_id
      JOIN user u ON p.user_id = u.UserID
      WHERE a.UserID = ?
    `;

    db.query(getAllAlertsQuery, [userID], (error, [postsInAlerts]) => {
      if (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error" });
      }

      res.status(200).json(postsInAlerts);
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getaleart = async (req, res) => {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Not logged in!");
  
    try {
      const decodedToken = jwt.verify(token, 'secretkey');
      const userID = decodedToken.userID;
      const alertID = req.params.id; 
      console.log(alertID)
  
      const getAlertAndPostQuery = `
        SELECT p.*, u.Username, u.user_photo, a.seen_alert
        FROM alerts a
        JOIN post p ON a.post_id = p.post_id
        JOIN user u ON p.user_id = u.UserID
        WHERE a.UserID = ? AND a.AlertID = ?
      `;
  
      db.query(getAlertAndPostQuery, [userID, alertID], (error, [alertAndPost]) => {
        if (error) {
          console.error(error);
          return res.status(500).json({ error: "Internal Server Error" });
        }
  
        if (!alertAndPost) {
            return res.status(404).send("Alert not found");  // قم بتغيير هنا
          }
          
  
        if (alertAndPost.seen_alert === 0) {
          const updateSeenAlertQuery = `
            UPDATE alerts
            SET seen_alert = 1
            WHERE AlertID = ?
          `;
  
          db.query(updateSeenAlertQuery, [alertID], (updateError) => {
            if (updateError) {
              console.error(updateError);
              return res.status(500).json({ error: "Internal Server Error" });
            }
          });
        }
  
        const alertWithStatus = {
          ...alertAndPost,
          status: alertAndPost.seen_alert === 0 ? 'Not seen yet' : 'Seen'
        };
  
        res.status(200).json(alertWithStatus);
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };
  