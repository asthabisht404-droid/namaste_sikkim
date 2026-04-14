import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import jwt from "jsonwebtoken"
import { Guide } from "../models/guide.model.js"


const generateAccessAndRefreshToken = async (guideId) => {
    try {
        const guide = await Guide.findById(guideId)
        const accessToken = guide.generateAccessToken()
        const refreshToken = guide.generateRefreshToken()

        guide.refreshToken = refreshToken
        await guide.save({ validateBeforeSave: false })    // this means ki bina validate kre ki sare fields hai ya nhi tum aise hi save krdo database me refreshToken

        return { accessToken, refreshToken }


    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating refresh and access token")
    }
}


const applyAsGuide = asyncHandler(async (req, res) => {
    // get guide details from frontend
    // validation - not empty
    // check if user already exists: username, email
    // create user object - create entry in db
    // remove password and refresh token field from response
    // check for user creation
    // return res


    // console.log(req.body);
    // 1
    const { fullName, email, password, affiliationMonastery, reason } = req.body
    // console.log("email: ", email);

    // 2
    if (
        [fullName, email, password, affiliationMonastery, reason].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400, "All fields are required")
    }


    // 3
    const existedUser = await Guide.findOne({    // jb bhi database se baat krni hai to await lgana hai
        email
    })

    if (existedUser) {
        throw new ApiError(409, "Guide with this email already exists")
    }

    // 4
    const guide = await Guide.create({
        fullName,
        email,
        password,
        affiliationMonastery, 
        reason
    })

    // 5-6
    const createdGuide = await Guide.findById(guide._id).select(
        "-password -refreshToken"
    )
    // agr jo abhi guide create hua hai uski id hai to usme se password aur refreshToken response me se hta do kyuki database me to save ho hi gaya hai wo

    if (!createdGuide) {
        throw new ApiError(500, "Something went wrong while registering the guide")
    }
    // 7
    return res.status(201).json(
        new ApiResponse(200, createdGuide, "Guide registered Successfully")
    )

})

const loginGuide = asyncHandler(async (req, res) => {
    // req body -> data
    // email
    // find the user
    // password check
    // access token and Refresh token
    // send cookie

    // 1
    const { email, password } = req.body

    if (!email) {
        throw new ApiError(400, "Email is required")
    }

    // 2-3
    const user = await Guide.findOne({
        email
    })

    if (!user) {
        throw new ApiError(404, "Guide does not exist")
    }

    // 4
    const isPasswordValid = await user.isPasswordCorrect(password)

    if (!isPasswordValid) {
        throw new ApiError(401, "Invalid Guide Credentials")
    }

    // 5
    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user._id)

    const loggedInUser = await Guide.findById(user._id).
        select("-password -refreshToken")

    // 6
    const options = {
        httpOnly: true,     // this will ensure that only server can change the cookie
        secure: true
    }


    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new ApiResponse(
                200,
                {
                    user: loggedInUser, accessToken, refreshToken
                },
                "Guide logged In Successfully"
            )
        )

})

const logoutGuide = asyncHandler(async (req, res) => {
    await Guide.findByIdAndUpdate(
        req.guide._id,      // iss id ko find kro fir neeche di gyi values ko update kro
        {
            $set: {         // mongodb ka operator      jo field update krne hai wo btado
                refreshToken: undefined
            }
        },
        {
            new: true       // yeh krne update hone ke baad jo values hongi seedha wohi return krdega
        }
    )

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
        .status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(
            new ApiResponse(
                200,
                {},
                "Guide logged Out"
            )
        )
})

const refreshAccessToken = asyncHandler(async (req, res) => {
    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken

    if (!incomingRefreshToken) {
        throw new ApiError(401, "Unauthorized request")
    }

    try {
        const decodedToken = jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET)

        const user = await Guide.findById(decodedToken?._id)

        if (!user) {
            throw new ApiError(401, "Invalid Refresh Token")
        }

        if (incomingRefreshToken !== user?.refreshToken) {
            throw new ApiError(401, "Refresh Token is expired or used")
        }

        const options = {
            httpOnly: true,
            secure: true
        }

        const { accessToken, newRefreshToken } = await generateAccessAndRefreshToken(user._id)

        return res
            .status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", newRefreshToken, options)
            .json(
                new ApiResponse(
                    200,
                    { accessToken, refreshToken: newRefreshToken },
                    "Access token refreshed"
                )
            )
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid refresh Token")
    }
})

const changeCurrentPassword = asyncHandler(async (req, res) => {
    const { oldPassword, newPassword, confPassword } = req.body

    if (!(newPassword === confPassword)) {
        throw new ApiError(400, "New password and confirm password field are not same")
    }

    const guide = await Guide.findById(req.guide?._id)
    const isPasswordCorrect = await guide.isPasswordCorrect(oldPassword)

    if (!isPasswordCorrect) {
        throw new ApiError(400, "Invalid old password")
    }

    guide.password = newPassword
    await guide.save({ validateBeforeSave: false })

    return res
        .status(200)
        .json(new ApiResponse(
            200,
            {},
            "Password changed successfully"
        ))
})

const getCurrentGuide = asyncHandler(async (req, res) => {
    return res
        .status(200)
        .json(200, req.guide, "current guide fetched successfully")
})

const updateAccountDetails = asyncHandler(async (req, res) => {
    const { fullName, email } = req.body

    if (!fullName || !email) {
        throw new ApiError(400, "All fields are required")
    }

    const guide = await Guide.findByIdAndUpdate(
        req.guide?._id,
        {
            $set: {
                fullName,
                email: email
            }
        },
        { new: true }
    ).select("-password")

    return res
        .status(200)
        .json(
            new ApiResponse(200, user, "Account details updated successfully")
        )
})


export {
    applyAsGuide,
    loginGuide,
    logoutGuide,
    refreshAccessToken,
    changeCurrentPassword,
    getCurrentGuide,
    updateAccountDetails,
}