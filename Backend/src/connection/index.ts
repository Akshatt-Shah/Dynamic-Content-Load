import mongoose from "mongoose";
import express from "express";
import config from "config";
import cors from "cors";
import cookieParser from "cookie-parser";
import { route } from "../routes";

const port = String(config.get("PORT"));
const MongoUrl = String(config.get("MongoUrl"));

export async function connection() {
  try {
    const app = express();
    app.use(cookieParser());
    app.use(express.json());
    app.use(
      cors({
        origin: ["http://localhost:4200"],
        credentials: true,
        allowedHeaders: [
          "Origin",
          "X-Requested-With",
          "Content-Type",
          "Authorization",
        ],
        methods: ["GET", "POST", "PUT", "DELETE"],
      })
    );
    app.use(route);

    await mongoose
      .connect(MongoUrl)
      .then(() => {
        console.log("MongoDB connected successfully");
        app.listen(port, () => {
          console.log(`Server running on port ${port}`);
        });
      })
      .catch((error) => {
        console.error("Failed to connect to MongoDB", error);
        return { error: error.message, status: false };
      });
  } catch (error: any) {
    return { message: error.message, status: error.status };
  }
}
