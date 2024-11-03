import authenticate from "./authenticate.js";
import isValidId from "./isValidId.js";
import validation from "./validation.js";

const middlewares = {
  authenticate,
  isValidId,
  validation,
};
export default middlewares;
