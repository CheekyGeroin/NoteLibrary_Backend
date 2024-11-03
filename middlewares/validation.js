import helpers from "../helpers/index.js";

const validation = (schema, message) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      next(helpers.httpError(400, error.message));
    }
    next();
  };
};

export default validation;
