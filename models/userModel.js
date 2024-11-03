import { Schema, model } from "mongoose";
import helpers from "../helpers/index.js";

const emailRegexp = /^\w+([\.-]?w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const userSchema = new Schema({
  email: {
    type: String,
    required: [true, "Email is required"],
    match: emailRegexp,
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minLength: 6,
  },
  token: {
    type: String,
    default: null,
  },
});

userSchema.post("save", helpers.handlerMongooseErrors);

const User = model("user", userSchema);

export default User;
