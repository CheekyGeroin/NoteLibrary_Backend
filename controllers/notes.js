import helpers from "../helpers/index.js";
import models from "../models/index.js";

const { Note } = models;
const { httpError, controlWrapper } = helpers;

const getNotes = async (req, res) => {
  const { _id: owner } = req.user;
  const notes = await Note.find({ owner });

  res.status(200).json(notes);
};

const addNote = async (req, res) => {
  const { _id: owner } = req.user;
  const { title, text } = req.body;
  const newNote = await Note.create({ title, text, owner });

  res.status(201).json(newNote);
};

const updNote = async (req, res) => {
  const { _id: owner } = req.user;
  const { id } = req.params;

  if (Object.keys(req.body).length === 0) {
    throw httpError(400, "Missing fields");
  }

  const updateNote = await Note.findByIdAndUpdate(
    { _id: id, owner },
    req.body,
    { new: true }
  );

  if (!updateNote) {
    throw httpError(404, "Not Found");
  }

  res.status(200).json({ message: "Update success" });
};

const deleteNote = async (req, res) => {
  const { _id: owner } = req.user;
  const { id } = req.params;

  const deletedNote = await Note.findByIdAndDelete({ _id: id, owner });

  if (!deletedNote) {
    throw httpError(404, "Not Found");
  }

  res.status(200).json({ message: "Delete success" });
};

const notes = {
  getNotes: controlWrapper(getNotes),
  addNote: controlWrapper(addNote),
  updNote: controlWrapper(updNote),
  deleteNote: controlWrapper(deleteNote),
};
export default notes;
