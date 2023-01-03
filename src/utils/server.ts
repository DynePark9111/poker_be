import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import gameRoutes from "../routes/game.routes";
import authRoutes from "../routes/auth.routes";
import cors from "cors";
import cookieParser from "cookie-parser";
import { database } from "./DI";

export default function (database: database) {
  dotenv.config();

  const app: Express = express();
  const ORIGIN = process.env.ORIGIN || "*";

  database.connect();
  // Middleware
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cors({ origin: ORIGIN, credentials: true }));
  app.use(cookieParser());

  // Routes
  app.get("/", (req: Request, res: Response) => {
    res.send("Home");
  });
  app.use("/auth", authRoutes);
  app.use("/game", gameRoutes);

  return app;
}
