import { Router } from "express";
import {
  getInitialCards,
  postChangeCards,
} from "../controllers/game.controller";
const router = Router();

router.get("/new", getInitialCards);
router.post("/change", postChangeCards);

export default router;
