import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import gameRoutes from "./routes/game.routes";

dotenv.config();

const app: Express = express();
const PORT = process.env.PORT;
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Home");
});

app.use("/game", gameRoutes);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
