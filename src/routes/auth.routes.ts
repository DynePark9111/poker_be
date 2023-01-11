import { Router } from "express";
import {
  checkUser,
  createUser,
  loginUser,
  logoutUser,
} from "../controllers/auth.controller";
const router = Router();

import { getUserCookie, reCaptcha } from "../middlewares/auth.middleware";

router.get("/", getUserCookie, checkUser);
router.post("/signup", createUser);
// router.post("/signup", reCaptcha, createUser); // TODO : testing
router.post("/login", loginUser);
router.get("/logout", logoutUser);

export default router;
