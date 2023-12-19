import { db } from '../connect.js';
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"

export const login = (req, res) => {
  const q = "SELECT * FROM `user` WHERE Email = ?";
  db.query(q, [req.body.Email], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length === 0) return res.status(404).json("User not found!");

    const checkPassword = bcrypt.compareSync(req.body.Password, data[0].Password);

    if (!checkPassword) return res.status(400).json("Wrong Password or Email");

    console.log("Data from login:", data);
    const token = jwt.sign({ userID: data[0].UserID }, "secretkey");

    console.log("Generated token:", token);
    
    const { Password, ...others } = data[0];

    res
      .cookie("accessToken", token, {
        httpOnly: true,
      })
      .cookie("userID", data[0].ID) 
      .status(200)
      .json(others);
  });
};




export const logout = (req, res) => {
    res.clearCookie("accessToken",{
      secure:true,
      sameSite:"none"
    }).status(200).json("User has been loged out")
} 
    

export const adduser = (req, res) => {
  try {
    const { Username, Password, Email, user_photo, profile_photo, score, location } = req.body;

    if (!Username || !Password || !Email) {
      return res.status(400).json({ message: "Username, Password, and Email are required fields." });
    }

    const emailExistsQuery = "SELECT * FROM user WHERE Email = ?";
    const usernameExistsQuery = "SELECT * FROM user WHERE Username = ?";

    db.query(emailExistsQuery, [Email], (emailErr, emailData) => {
      if (emailErr) {
        console.error("Error checking duplicate email:", emailErr);
        return res.status(500).json({ message: "Server Error" });
      }

      db.query(usernameExistsQuery, [Username], (usernameErr, usernameData) => {
        if (usernameErr) {
          console.error("Error checking duplicate username:", usernameErr);
          return res.status(500).json({ message: "Server Error" });
        }

        if (emailData.length > 0) {
          return res.status(400).json({ message: "Email is already registered." });
        }

        if (usernameData.length > 0) {
          return res.status(400).json({ message: "Username is already taken." });
        }

        // Both Email and Username are unique, proceed with insertion
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(Password, salt);

        const insertQuery =
          "INSERT INTO user (Username, Password, Email, user_photo, profile_photo, score, location) VALUES (?, ?, ?, ?, ?, ?, ?)";

        const values = [Username, hashedPassword, Email, user_photo, profile_photo, score, location];

        db.query(insertQuery, values, (err, data) => {
          if (err) {
            console.error("Error in inserting user:", err);
            return res.status(500).json({ message: "Server Error" });
          }

          const token = jwt.sign({ ID: data.insertId }, "secretkey");

          res.cookie("accessToken", token, {
            httpOnly: true,
          }).status(200).json({ message: "User added successfully", user: { Username, Email } });
        });
      });
    });
  } catch (e) {
    console.error("Exception during user addition:", e);
    return res.status(500).json({ message: "Server Error" });
  }
};
    

  export const getusers = (req, res) => {
    const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

    const q = "SELECT Username, score, user_photo, location FROM `user`";
    db.query(q, (err, data) => {
      if (err) {
        console.error("Error retrieving users:", err);
        return res.status(500).json({ message: "Server Error" });
      }
      return res.json(data);
    });
  };
  


  export const deleteUser = (req, res) => {
    const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");
  const decodedToken = jwt.verify(token, 'secretkey');
  const userId = decodedToken.userID;
    // const userId = req.params.id;
    
            const deleteLikesQuery = "DELETE FROM `likes` WHERE `user_id` = ?";
            db.query(deleteLikesQuery, [userId], (likesErr, likesResult) => {
                if (likesErr) {
                    return res.status(500).json(likesErr);
                }

             



    // Delete comments associated with the user's posts
    const deleteCommentsQuery = "DELETE FROM `comments` WHERE `post_id` IN (SELECT `post_id` FROM `post` WHERE `user_id` = ?)";
    db.query(deleteCommentsQuery, [userId], (commentsErr, commentsResult) => {
        if (commentsErr) {
            return res.status(500).json(commentsErr);
        }

        // Delete alerts associated with the user's posts
        const deleteAlertsQuery = "DELETE FROM `alerts` WHERE `post_id` IN (SELECT `post_id` FROM `post` WHERE `user_id` = ?)";
        db.query(deleteAlertsQuery, [userId], (alertsErr, alertsResult) => {
            if (alertsErr) {
                return res.status(500).json(alertsErr);
            }

            // Delete posts associated with the user
            const deletePostQuery = "DELETE FROM `post` WHERE `user_id` = ?";
            db.query(deletePostQuery, [userId], (postErr, postResult) => {
                if (postErr) {
                    return res.status(500).json(postErr);
                }

        

                        // Delete the user
                        const deleteUserQuery = "DELETE FROM `user` WHERE `UserID` = ?";
                        db.query(deleteUserQuery, [userId], (userErr, userResult) => {
                            if (userErr) {
                                return res.status(500).json(userErr);
                            }

                            if (userResult.affectedRows === 0) {
                                return res.status(404).json({ message: "User not found" });
                            }
                            res.clearCookie("accessToken",{
                              secure:true,
                              sameSite:"none"
                            })


                            return res.json({ message: "User and associated data deleted successfully" });
                        });
                    });
                });
            });
        });
};






export const getuser = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");
  const decodedToken = jwt.verify(token, 'secretkey');
  const userId = decodedToken.userID;
    // const userId = req.params.id;
    const q = "SELECT * FROM `user` WHERE UserID = ?";
    db.query(q, [userId], (err, data) => {
        if (err) return res.status(500).json(err);
        if (data.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.json(data[0]);
    });
};

export const edituser = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");
  const decodedToken = jwt.verify(token, 'secretkey');
  const userId = decodedToken.userID;
    // const userId = req.params.id;
    const { Username, Password, Email, user_photo, profile_photo, score, location  } = req.body;
    // Check if Password is provided
  if (!Password) {
    return res.status(400).json({ error: 'Password is required' });
  }

  // Hash the password
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(Password, salt);


    const q = "UPDATE `user` SET Username = ?, Password = ?, user_photo = ?, profile_photo = ?,location = ? WHERE UserID = ?";
    const values = [Username, hashedPassword, user_photo, profile_photo, location, userId];

    db.query(q, values, (err, result) => {
        if (err) {
            console.error('Error executing MySQL query:', err);
            res.status(500).json({ error: 'Failed to update user' });
            return;
          }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.json({ message: "User updated successfully" });
    });
};
