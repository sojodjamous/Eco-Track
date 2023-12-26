import express from "express";
import { getWeather } from "../controllers/Weather.js";
const router = express.Router();

router.post("/getWeather", getWeather);


export default router;
