import express from "express";
import middlewares from "../../middlewares";
import schemes from "../../schemes";

const addValidation = middlewares.validation(schemes.addNoteScheme);
const updValidation = middlewares.validation(schemes.updNoteScheme);

const router = express.Router();

router.get("/", middlewares.authenticate);

router.post("/", middlewares.authenticate, addValidation);

router.put(
  "/:id",
  middlewares.authenticate,
  middlewares.isValidId,
  updValidation
);

router.delete("/:id", middlewares.authenticate, middlewares.isValidId);

export default router;
