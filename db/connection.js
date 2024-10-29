import mongoose from "mongoose";
import dotenv from "dotenv";

const connection = () => {
  return mongoose.connect(process.env.MONGO_CONNECTION_URL);
};

export default connection;
