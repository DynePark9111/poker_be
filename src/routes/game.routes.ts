import { Router } from "express";
const router = Router();

const gameController = require("../controllers/game.controller");

router.get("/new", gameController.getInitialCards);
router.post("/change", gameController.postChangeCards);

export default router;
