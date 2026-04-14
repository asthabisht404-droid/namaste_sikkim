import mongoose, { Schema } from "mongoose";

const guideBookingSchema = Schema({
    monastery: {
        type: String,
        required: true,
        lowercase: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    guide: {
        type: Schema.Types.ObjectId,
        ref: "Guide"
    },
    date: {
        type: Date,
        required: true
    },

}, { timestamps: true })

export const GuideBooking = mongoose.model("GuideBooking", guideBookingSchema)