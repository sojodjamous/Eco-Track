import { db } from '../connect.js';

export const geteducationalresources = (req, res) => {
    const q = "SELECT * FROM `educationalresources`";
    db.query(q, (err, data) => {
        if (err) return res.status(500).json(err);
        return res.json(data);
    });
};

export const addeducationalresource = (req, res) => {
    const { Title, Content, ResourceType, PublicationDate, photo } = req.body;
    const q = "INSERT INTO `educationalresources` (Title, Content, ResourceType, PublicationDate, photo) VALUES (?, ?, ?, ?, ?)";
    db.query(q, [Title, Content, ResourceType, PublicationDate, photo], (err, result) => {
        if (err) return res.status(500).json(err);
        return res.json({ message: "Educational Resources added successfully", id: result.insertId });
    });
};

export const deleteeducationalresource = (req, res) => {
    const educationalresourceId = req.params.id;
    const q = "DELETE FROM `educationalresources` WHERE ResourceID = ?";
    db.query(q, [educationalresourceId], (err, result) => {
        if (err) return res.status(500).json(err);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Educational ResourceId not found" });
        }
        return res.json({ message: "Educational Resource deleted successfully" });
    });
};

export const geteducationalresource = (req, res) => {
    const educationalresourceId = req.params.id;
    const q = "SELECT * FROM `educationalresources` WHERE ResourceID = ?";
    db.query(q, [educationalresourceId], (err, data) => {
        if (err) return res.status(500).json(err);
        if (data.length === 0) {
            return res.status(404).json({ message: "Educational Resource not found" });
        }
        return res.json(data[0]);
    });
};

export const editeducationalresource = (req, res) => {
    const educationalresourceId = req.params.id;
    const {  Title, Content, ResourceType, PublicationDate,photo } = req.body;
    const q = "UPDATE `educationalresources` SET Title = ?, Content = ?, ResourceType = ?, PublicationDate = ?, photo= ? WHERE ResourceID = ?";
    db.query(q, [Title, Content, ResourceType, PublicationDate,photo,educationalresourceId], (err, result) => {
        if (err) return res.status(500).json(err);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Educational Resource not found" });
        }
        return res.json({ message: "Educational Resource updated successfully" });
    });
};
