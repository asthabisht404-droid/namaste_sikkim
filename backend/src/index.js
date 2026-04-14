import dotenv from "dotenv";
import { app } from "./app.js";
import mongoose from "mongoose";

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI; // include DB name in URI
const PORT = process.env.PORT || 8000;

mongoose.connect(MONGODB_URI)
    .then(() => {
        console.log("✅ MongoDB connected");
        app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
    })
    .catch(err => {
        console.log("❌ MongoDB connection failed", err);
        process.exit(1);
    });
