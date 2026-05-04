import express from "express";
import axios from "axios";

const router = express.Router();

router.get("/", async (req, res) => {

  const { crop } = req.query;

  try {

    const response = await axios.get(
      "https://gnews.io/api/v4/search",
      {
        params: {
          q: `${crop} farming agriculture India`,
          lang: "en",
          country: "in",
          max: 10,
          token: process.env.GNEWS_API_KEY,
        },
      }
    );

    res.json(response.data.articles);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      error: "Failed to fetch news",
    });
  }
});

export default router;