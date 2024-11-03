import jwt from "jsonwebtoken";
import models from "../models/index.js";
import helpers from "../helpers/index.js";
import JWTHandling from "../helpers/JWTHandling.js";

const { SECRET_KEY } = process.env;

const authenticate = async (req, res, next) => {
  const { authorization = " " } = req.headers;
  const [bearer, token] = authorization.split(" ");
  if (bearer !== "Bearer") {
    next(helpers.httpError(401));
  }
  console.log(token);
  try {
    console.log(1);
    const id = JWTHandling.checkToken(token);
    console.log(id);
    const user = await models.User.findById(id);
    console.log(user);
    if (!user || !user.token || user.token !== token) {
      next(helpers.httpError(401));
    }

    req.user = user;
    next();
  } catch {
    next(helpers.httpError(401));
  }
};

export default authenticate;
