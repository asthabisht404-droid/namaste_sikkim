import { Router } from "express";
import {
    registerUser as applyAsGuide,
    loginUser as loginGuide,
    logoutUser as logoutGuide,
    refreshAccessToken,
    changeCurrentPassword,
    getCurrentUser as getCurrentGuide,
    updateAccountDetails
} from "../controllers/user.controller.js";
import { guideVerifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

// Guide registration & login
router.route("/register").post(applyAsGuide);
router.route("/login").post(loginGuide);

// Secured routes
router.route("/logout").post(guideVerifyJWT, logoutGuide);
router.route("/refresh-token").post(refreshAccessToken);
router.route("/change-password").post(guideVerifyJWT, changeCurrentPassword);
router.route("/current-user").get(guideVerifyJWT, getCurrentGuide);
router.route("/update-account").patch(guideVerifyJWT, updateAccountDetails);

export default router;
