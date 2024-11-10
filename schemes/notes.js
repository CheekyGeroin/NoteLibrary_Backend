import Joi from "joi";

const addNoteScheme = Joi.object({
  title: Joi.string()
    .regex(/^[a-zA-Z0-9\s]*$/)
    .trim()
    .label(`Note's title`)
    .required()
    .messages({
      "any.required": '"title" is a required field',
      "string.title": "Please provide a valid title",
    }),
  text: Joi.string()
    .regex(/^[a-zA-Z0-9\s]*$/)
    .max(100)
    .required()
    .messages({
      "any.required": '"text" is a required field',
      "string.max": "Text must be up to 100 characters long",
    }),
})
  .unknown(false)
  .messages({
    "object.missing":
      "Body must have note's title and note's text as properties of a JSON.",
    "object.unknown":
      "Body cannot have any properties other than title and text",
  });

const updNoteScheme = Joi.object({
  title: Joi.string()
    .regex(/^[a-zA-Z0-9\s]*$/)
    .trim()
    .label(`Note's title`)
    .messages({ "any.required": "Please provide title" }),
  text: Joi.string()
    .regex(/^[a-zA-Z0-9\s]*$/)
    .max(100)
    .messages({ "any.required": "Please provide text" }),
})
  .unknown(false)
  .messages({
    "object.unknown":
      "Body cannot have any properties other than title and text",
  });

export default { addNoteScheme, updNoteScheme };
