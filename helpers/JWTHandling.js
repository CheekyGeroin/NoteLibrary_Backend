import jwt from "jsonwebtoken";
import httpError from "./httpErrors.js";

const signToken = (id) =>
  jwt.sign({ id }, process.env.SECRET_KEY ?? "super-secret", {
    expiresIn: process.env.JWT_EXPIRES ?? "1d",
  });

const checkToken = (token) => {
  if (!token) throw new httpError(401, "Not logged in..");

  try {
    const { id } = jwt.verify(token, process.env.SECRET_KEY ?? "super-secret");
    console.log(`ID: ${id}`);
    return id;
  } catch (err) {
    throw new httpError(401, "Not logged in..");
  }
};

export default { checkToken, signToken };
