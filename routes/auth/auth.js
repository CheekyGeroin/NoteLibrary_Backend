import express from "express";
import { authenticate, validation } from "../../middlewares";
import { loginSchema } from "../../schemas";

const router = express.Router();

router.post("/register", validation(loginSchema));

router.post("/login", validation(loginSchema));

router.post("/logout", authenticate);
