import express from "express";
import middlewares from "../../middlewares/index.js";
import schemes from "../../schemas/index.js";
import auth from "../../controllers/auth.js";

const router = express.Router();

router.post(
  "/register",
  middlewares.validation(schemes.loginSchema),
  auth.register
);

router.post("/login", middlewares.validation(schemes.loginSchema), auth.login);

router.post("/logout", middlewares.authenticate, auth.logout);

export default router;
