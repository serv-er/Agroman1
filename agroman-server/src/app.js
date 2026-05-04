
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import rateLimit from "express-rate-limit";
import newsRoutes from "./routes/news.routes.js";
import shopsRoutes from "./routes/shops.routes.js";
import schemesRoutes from "./routes/schemes.routes.js";
import { errorHandler } from "./middleware/error.middleware.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// 🔥 RATE LIMIT
app.use(
  rateLimit({
    windowMs: 60 * 1000,
    max: 60,
  })
);

// ROUTES
app.use("/api/shops", shopsRoutes);



app.use("/api/schemes", schemesRoutes);
app.use("/api/news", newsRoutes);

// ERROR HANDLER
app.use(errorHandler);

export default app;