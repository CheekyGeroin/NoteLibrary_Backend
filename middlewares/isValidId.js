import { isValidObjectId } from "mongoose";
import { httpError } from "../helpers";

const isValidId = (req, res, next) => {
  const { contactId: id } = req.params;
  if (!isValidObjectId(id)) {
    next(httpError(400, `${id} is not valid id`));
  }
  next();
};

export default isValidId;
