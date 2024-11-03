import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { httpError, controlWrapper } from "../helpers";
import { User } from "../models";
const { SECRET_KEY } = process.env;

const register = async (req, res) => {
  const { email, password } = req.body;

  const user = User.findOne({ email });

  if (user) {
    throw httpError(409, "Email in use");
  }

  const hashPass = await bcrypt.hash(password, 10);

  const newUser = await User.create({
    ...req.body,
    password: hashPass,
  });

  res.status(201).json({
    user: {
      email,
    },
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  const comparePass = await bcrypt.compare(password, user.password);

  if (!user || !comparePass) {
    throw httpError(401, "Email or password is wrong");
  }

  const payload = {
    id: user._id,
  };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });

  await User.findByIdAndUpdate(user._id, { token });

  res.status(201).json({
    token,
    user: { email: user.email },
  });
};

const logout = async (req, res) => {
  const { _id } = req.user;

  await User.findByIdAndUpdate(_id, { token: null });

  res.status(204).json({
    message: "No content",
  });
};

export default auth = {
  register: controlWrapper(register),
  login: controlWrapper(login),
  logout: controlWrapper(logout),
};
