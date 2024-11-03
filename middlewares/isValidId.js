import { isValidObjectId } from "mongoose";
import helpers from "../helpers/index.js";

const isValidId = (req, res, next) => {
  const { contactId: id } = req.params;
  if (!isValidObjectId(id)) {
    next(helpers.httpError(400, `${id} is not valid id`));
  }
  next();
};

export default isValidId;
