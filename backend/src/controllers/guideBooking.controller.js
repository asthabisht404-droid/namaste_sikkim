import { GuideBooking } from "../models/guideBooking.model";
import { asyncHandler } from "../utils/asyncHandler";

// function to create a new guide booking
export const createGuideBooking = asyncHandler(async (req, res) => {
    if (!req.user) {
        throw new ApiError(404, "User not found")
    }
    // 1
    const { monastery, guide, date } = req.body
    // console.log("email: ", email);

    // 2
    if (
        [monastery, guide, date].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400, "All fields are required")
    }
    // 3
    const newBooking = await GuideBooking.create({
        monastery,
        user: req.user._id,
        guide,
        date
    })

    const createdBooking = await GuideBooking.findById(newBooking._id)

    if (!createdBooking) {
        throw new ApiError(500, "Something went wrong while booking the guide")
    }
    // 7
    return res.status(201).json(
        new ApiResponse(200, createdBooking, "Guide booked Successfully")
    )
})


// @desc    Get all guide bookings of the guide
export const getAllGuideBookings = asyncHandler(async (req, res) => {
    if (!req.guide) {
        throw new ApiError(404, "Guide not found")
    }
    const bookings = await GuideBooking.find({ guide: req.guide._id })
    return res.status(200).json(
        new ApiResponse(200, bookings, "All guide bookings fetched successfully")
    )
})

// @desc    Get a single guide booking
// @route   GET /api/v1/bookings/:id
// @access  Private
export const getGuideBookingByIdForGuide = asyncHandler(async (req, res) => {
    const { id } = req.params
    if (!req.guide) {
        throw new ApiError(404, "Guide not found")
    }

    const booking = await GuideBooking.findById(id)

    if (!booking) {
        throw new ApiError(404, "Guide booking not found")
    }

    return res.status(200).json(
        new ApiResponse(200, booking, "Guide booking fetched successfully")
    )
})

// @desc    Delete a guide booking
// @route   DELETE /api/v1/bookings/:id
// @access  Private
export const deleteGuideBookingByGuide = asyncHandler(async (req, res) => {
    const { id } = req.params

    if (!req.guide) {
        throw new ApiError(404, "Guide not found")
    }

    const booking = await GuideBooking.findByIdAndDelete(id)

    if (!booking) {
        throw new ApiError(404, "Guide booking not found")
    }

    return res.status(200).json(
        new ApiResponse(200, booking, "Guide booking deleted successfully")
    )
})

// @desc    Delete a guide booking
// @route   DELETE /api/v1/bookings/:id
// @access  Private
export const deleteGuideBookingByUser = asyncHandler(async (req, res) => {
    const { id } = req.params

    if (!req.user) {
        throw new ApiError(404, "User not found")
    }

    const booking = await GuideBooking.findByIdAndDelete(id)

    if (!booking) {
        throw new ApiError(404, "Guide booking not found")
    }

    return res.status(200).json(
        new ApiResponse(200, booking, "Guide booking deleted successfully")
    )
})

// get all guide bookings of a user
export const getAllUserGuideBookings = asyncHandler(async (req, res) => {
    if (!req.user) {
        throw new ApiError(404, "User not found")
    }
    const bookings = await GuideBooking.findAll({ user: req.user._id })
    return res.status(200).json(
        new ApiResponse(200, bookings, "All user guide bookings fetched successfully")
    )
})

// get single booking of a user
export const getGuideBookingByIdForUser = asyncHandler(async (req, res) => {
    const { id } = req.params
    if (!req.user) {
        throw new ApiError(404, "User not found")
    }

    const booking = await GuideBooking.findById(id)

    if (!booking) {
        throw new ApiError(404, "Guide booking not found")
    }

    return res.status(200).json(
        new ApiResponse(200, booking, "Guide booking fetched successfully")
    )
})