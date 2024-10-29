import mongoose from "mongoose";
import dotenv from "dotenv";
import connection from "./db/connection";

dotenv.config();

const { PORT } = process.env;
mongoose.set("strictQuery", true);
const port = PORT || 3000;

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
