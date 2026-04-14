import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"

const guideSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        fullName: {
            type: String,
            required: true,
            trim: true,
            index: true
        },
        avatar: {
            type: String,   // cloudinary url
        },
        password: {
            type: String,
            required: [true, "Password is required"]
        },
        affiliationMonastery: {
            type: String,
            required: true,
            trim: true,
            index: true
        },
        reason: {
            type: String,
            required: true,
            trim: true,
        },
        refreshToken: {
            type: String,
        },
    },
    { timestamps: true })

// pre hook  =>  yeh bolta hai ki isko database me save krne se just phle kuch kro
guideSchema.pre("save", async function (next) {
    if(!this.isModified("password")) return next();
    
    this.password = await bcrypt.hash(this.password, 10)
    next()
})

// yaah pe humne apne password ko encrypt kiya hai 

// yaah pe humne compare kiya hai
// isme password jo hai usko string rkhna compulsory hai
guideSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password)
}

guideSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            fullName: this.fullName
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}
guideSchema.methods.generateRefreshToken = function () {     // more days
    return jwt.sign(
        {
            _id: this._id,      // refresh token barr barr refresh hota hai to isme information kam dete hai
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

export const Guide = mongoose.model("Guide", guideSchema)