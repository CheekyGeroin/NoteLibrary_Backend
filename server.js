import mongoose from "mongoose";
import dotenv from "dotenv";
import app from "./app.js";

dotenv.config();

const { PORT } = process.env;
mongoose.set("strictQuery", true);
const port = PORT || 3000;

const connection = () => {
  return mongoose.connect(process.env.MONGO_CONNECT_URL);
};

const startServer = async () => {
  try {
    await connection();
    console.log("Database connection successful");

    app.listen(port, () => {
      console.log(`Server running. Use our API on port: ${port}`);
    });
  } catch (err) {
    console.log(`Failed to launch application with error: ${err.message}`);
    process.exit(1);
  }
};

startServer();
