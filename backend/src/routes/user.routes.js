import { Router } from "express";
import { registerUser, loginUser, refreshAccessToken, applyAsGuide } from "../controllers/user.controller.js";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/refresh-token", refreshAccessToken);
router.post("/apply", applyAsGuide);

export default router;
