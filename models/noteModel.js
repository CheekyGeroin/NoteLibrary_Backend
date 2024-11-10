import { Schema, model } from "mongoose";
import helpers from "../helpers/index.js";

const noteScheme = new Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
  },
  text: {
    type: String,
    maxlength: 100,
  },
});

noteScheme.post("save", helpers.handlerMongooseErrors);

const Note = model("note", noteScheme);

export default Note;
