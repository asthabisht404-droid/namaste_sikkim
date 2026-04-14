import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";

// Helper to generate tokens
const generateTokens = async (user) => {
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });
    return { accessToken, refreshToken };
};

// Tourist / Guide registration
export const registerUser = async (req, res) => {
    try {
        const { fullName, email, password, role } = req.body;
        if (!email || !password || !role) return res.status(400).json({ message: "Missing fields" });

        const exists = await User.findOne({ email });
        if (exists) return res.status(409).json({ message: "User already exists" });

        const user = await User.create({ fullName, email, password, role });
        res.status(201).json({ message: "User registered", user: { _id: user._id, email: user.email, role: user.role } });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Guide application (additional info)
export const applyAsGuide = async (req, res) => {
    try {
        const { fullName, email, phone, languages, experience, bio } = req.body;
        if (!fullName || !email || !phone) return res.status(400).json({ message: "Missing fields" });

        const exists = await User.findOne({ email });
        if (exists) return res.status(409).json({ message: "User already exists" });

        const guide = await User.create({ fullName, email, phone, languages, experience, bio, role: "guide" });
        res.status(201).json({ message: "Guide application submitted", guide });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Login (tourist or guide)
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) return res.status(400).json({ message: "Missing fields" });

        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: "User not found" });

        const valid = await user.isPasswordCorrect(password);
        if (!valid) return res.status(401).json({ message: "Invalid credentials" });

        const tokens = await generateTokens(user);
        res.status(200).json({ message: "Login successful", user: { _id: user._id, email: user.email, role: user.role }, ...tokens });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Refresh token
export const refreshAccessToken = async (req, res) => {
    try {
        const token = req.body.refreshToken || req.cookies.refreshToken;
        if (!token) return res.status(401).json({ message: "No refresh token" });

        const decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
        const user = await User.findById(decoded._id);
        if (!user || token !== user.refreshToken) return res.status(401).json({ message: "Invalid token" });

        const tokens = await generateTokens(user);
        res.status(200).json({ message: "Tokens refreshed", ...tokens });
    } catch (err) {
        res.status(401).json({ message: err.message });
    }
};
