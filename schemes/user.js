import Joi from "joi";
const emailRegexp = /^\w+([\.-]?w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const loginScheme = Joi.object({
  username: Joi.string().regex(/^[a-zA-Z0-9\s]*$/),
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string()
    .min(6)
    .messages({
      "string.min": '"password" should have a minimum length of 6',
      "any.required": '"password" is a required field',
    })
    .required(),
});

export default loginScheme;
