import express from "express";
import { schemes } from "../data/schemes.js";

const router = express.Router();

router.get("/", (req, res) => {

  const { crop } = req.query;

  const filtered = schemes.filter(
    (scheme) =>
      scheme.crops.includes("all") ||
      scheme.crops.includes(crop?.toLowerCase())
  );

  res.json(filtered);
});

export default router;