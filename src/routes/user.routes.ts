import { Router } from "express";
import { patchUserCash, patchUserGem } from "../controllers/user.controller";
const router = Router();

router.patch("/gem", patchUserGem);
router.patch("/cash", patchUserCash);

export default router;
