import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import helpers from "../helpers/index.js";
import models from "../models/index.js";
import JWTHandling from "../helpers/JWTHandling.js";
const { SECRET_KEY } = process.env;

const register = async (req, res) => {
  const { email, password } = req.body;

  const user = await models.User.findOne({ email });

  if (user) {
    console.log(user.email);
    throw helpers.httpError(409, "Email in use");
  }

  const hashPass = await bcrypt.hash(password, 10);

  const newUser = await models.User.create({
    ...req.body,
    password: hashPass,
  });
  const verificationToken = JWTHandling.signToken(newUser._id);

  newUser.token = verificationToken;
  await newUser.save();
  console.log(newUser);

  res.status(201).json({
    user: {
      email: newUser.email,
    },
    token: newUser.token,
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await models.User.findOne({ email });
  const comparePass = await bcrypt.compare(password, user.password);

  if (!user || !comparePass) {
    throw helpers.httpError(401, "Email or password is wrong");
  }

  const payload = {
    id: user._id,
  };
  const token = JWTHandling.signToken(payload.id);

  await models.User.findByIdAndUpdate(user._id, { token });

  res.status(201).json({
    token,
    user: { email: user.email },
  });
};

const logout = async (req, res) => {
  const { _id } = req.user;

  await models.User.findByIdAndUpdate(_id, { token: null });

  res.status(204).json({
    message: "No content",
  });
};

const auth = {
  register: helpers.controlWrapper(register),
  login: helpers.controlWrapper(login),
  logout: helpers.controlWrapper(logout),
};
export default auth;
