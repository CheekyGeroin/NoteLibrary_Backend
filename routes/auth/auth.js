import express from "express";
import { auth, validation } from "../../middlewares";
import { loginSchema } from "../../schemas";

const router = express.Router();
