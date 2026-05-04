import cache from "../utils/cache.js";
import { fetchNearbyShops } from "../services/google.service.js";

export const getNearbyShopsController = async (req, res, next) => {

  try {

    const { lat, lng } = req.query;

    if (!lat || !lng) {
      return res.status(400).json({
        error: "lat and lng required",
      });
    }

    const cacheKey = `${lat}-${lng}`;

    // 🔥 CACHE HIT
    const cached = cache.get(cacheKey);

    if (cached) {
      return res.json(cached);
    }

    const results =
      await fetchNearbyShops(
        lat,
        lng,
        process.env.GOOGLE_MAPS_API_KEY
      );

    // 🔥 SAVE CACHE
    cache.set(cacheKey, results);

    res.json(results);

  } catch (error) {
    next(error);
  }
};