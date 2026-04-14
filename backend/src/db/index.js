import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`✅ MongoDB connected! DB HOST: ${connectionInstance.connection.host}`);
    console.log(`📂 Database name: ${connectionInstance.connection.name}`);
  } catch (error) {
    console.log("❌ MongoDB connection FAILED", error);
    process.exit(1);
  }
};

export default connectDB;
