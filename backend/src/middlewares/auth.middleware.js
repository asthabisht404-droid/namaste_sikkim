import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken"
import { User } from "../models/user.model.js";
import { Guide } from "../models/guide.model.js"



export const verifyJWT = asyncHandler(async(req, _, next) => {      // yaah pe res ka use nhi kiya to _ aagya

    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")
    
        if (!token) {
            throw new ApiError(401, "Unauthorized request")
        }
    
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    
        const user = await User.findById(decodedToken?._id).select("-password -refreshToken")
    
        if (!user) {
            throw new ApiError(401, "Invalid Access Token")
        }
    
        req.user = user;
        next()
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid Access token")
    }
})

export const guideVerifyJWT = asyncHandler(async(req, _, next) => {      // yaah pe res ka use nhi kiya to _ aagya

    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")
    
        if (!token) {
            throw new ApiError(401, "Unauthorized request")
        }
    
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    
        const guide = await Guide.findById(decodedToken?._id).select("-password -refreshToken")

        if (!guide) {
            throw new ApiError(401, "Invalid Access Token")
        }

        req.guide = guide;
        next()
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid Access token")
    }
})