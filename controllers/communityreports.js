import { db } from '../connect.js';
import jwt from 'jsonwebtoken';

export const getcommunityreports = (req, res) => {
    const q = "SELECT * FROM `communityreports`";
    db.query(q, (err, data) => {
        if (err) return res.status(500).json(err);
        return res.json(data);
    });
};

export const addcommunityreport = (req, res) => {
   
        const { UserID, ReportType, Description, Timestamp, LocationID, photo, reference } = req.body;
        const q1 = "INSERT INTO `communityreports` (UserID, ReportType, Description, Timestamp, LocationID, photo, reference) VALUES (?, ?, ?, ?, ?, ?, ?)";
        
        db.query(q1, [UserID, ReportType, Description, Timestamp, LocationID, photo, reference], (err, result) => {
            if (err) return res.status(500).json(err);

            const q2 = "UPDATE `user` SET score = score + 5 WHERE UserID = ?";
            
            const q3 = "SELECT * FROM `communityreports` WHERE UserID = ?";
            
            db.query(q3, [UserID], (err, rows) => {
                if (err) return res.status(500).json(err);

                if (rows.length === 0) {
                    return res.status(404).json({ message: "User not found in communityreports" });
                }

                db.query(q2, [UserID], (err, result) => {
                    if (err) return res.status(500).json(err);
                    return res.json({ message: "Communityreport added successfully, and user score updated by 5 points" });
                });
            });
        });
};

export const deletecommunityreport = (req, res) => {
    const communityreportId = req.params.id;
    const q = "DELETE FROM `communityreports` WHERE ReportID = ?";
    db.query(q, [communityreportId], (err, result) => {
        if (err) return res.status(500).json(err);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Communityreport not found" });
        }
        return res.json({ message: "Communityreport deleted successfully" });
    });
};

export const getcommunityreport = (req, res) => {
    const communityreportId = req.params.id;
    const q = "SELECT * FROM `communityreports` WHERE ReportID = ?";
    db.query(q, [communityreportId], (err, data) => {
        if (err) return res.status(500).json(err);
        if (data.length === 0) {
            return res.status(404).json({ message: "Communityreport not found" });
        }
        return res.json(data[0]);
    });
};  

export const editcommunityreport = (req, res) => {
    const communityreportId = req.params.id;
    const { UserID, ReportType, Description, LocationID, photo, reference } = req.body;
    const q = "UPDATE `communityreports` SET UserID=?, ReportType=?, Description=?, Timestamp=NOW(), LocationID=?, photo=?, reference=? WHERE ReportID=?";
    db.query(q, [UserID, ReportType, Description, LocationID, photo, reference, communityreportId], (err, result) => {
        if (err) return res.status(500).json(err);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Communityreport not found" });
        }
        return res.json({ message: "Communityreport updated successfully" });
    });
};
export const search = (req, res) => {
    const keyword = req.params.keyword; // Assuming the keyword is passed in the URL parameter

    const qPost = `
        SELECT * 
        FROM post 
        WHERE content LIKE '%${keyword}%'
    `;

    const qCommunityReports = `
        SELECT * 
        FROM communityreports 
        WHERE Description LIKE '%${keyword}%'
    `;

    const qEducationalResources = `
        SELECT * 
        FROM educationalresources 
        WHERE Title LIKE '%${keyword}%'
    `;

    db.query(qPost, (errPost, postData) => {
        if (errPost) return res.status(500).json(errPost);

        db.query(qCommunityReports, (errCommReports, commReportsData) => {
            if (errCommReports) return res.status(500).json(errCommReports);

            db.query(qEducationalResources, (errEducational, educationalData) => {
                if (errEducational) return res.status(500).json(errEducational);

                const mergedData = {
                    posts: postData,
                    communityReports: commReportsData,
                    educationalResources: educationalData
                };

                return res.json(mergedData);
            });
        });
    });
};


