import express from "express";
import { getNearbyShopsController }
from "../controllers/shops.controller.js";

const router = express.Router();

router.get("/", getNearbyShopsController);

export default router;