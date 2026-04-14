import { Router } from "express";
import { createGuideBooking, getAllGuideBookings, getGuideBookingByIdForGuide, deleteGuideBookingByGuide, deleteGuideBookingByUser, getAllUserGuideBookings, getGuideBookingByIdForUser } from "../controllers/guideBooking.controller.js";
import { verifyJWT, guideVerifyJWT } from "../middlewares/auth.middleware.js";


const router = Router()

// Guide secured routes
router.route("/book-guide").post(guideVerifyJWT, createGuideBooking)
router.route("/my-bookings").get(guideVerifyJWT, getAllGuideBookings)
router.route("/my-bookings/:id").get(guideVerifyJWT, getGuideBookingByIdForGuide)
router.route("/my-bookings/:id").delete(guideVerifyJWT, deleteGuideBookingByGuide)

// User secured routes
router.route("/my-bookings/:id").delete(verifyJWT, deleteGuideBookingByUser)
router.route("/my-bookings").get(verifyJWT, getAllUserGuideBookings)
router.route("/my-bookings/:id").get(verifyJWT, getGuideBookingByIdForUser)

export default router