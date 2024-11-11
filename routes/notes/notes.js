import express from "express";
import middlewares from "../../middlewares/index.js";
import schemes from "../../schemes/index.js";
import notes from "../../controllers/notes.js";

const { getNotes, addNote, updNote, deleteNote } = notes;

const addValidation = middlewares.validation(schemes.addNoteScheme);
const updValidation = middlewares.validation(schemes.updNoteScheme);

const router = express.Router();

router.get("/", middlewares.authenticate, getNotes);

router.post("/", middlewares.authenticate, addValidation, addNote);

router.put(
  "/:id",
  middlewares.authenticate,
  middlewares.isValidId,
  updValidation,
  updNote
);

router.delete(
  "/:id",
  middlewares.authenticate,
  middlewares.isValidId,
  deleteNote
);

export default router;
