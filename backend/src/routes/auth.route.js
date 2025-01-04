import { Router } from "express";
import { authClerkCallback } from "../controllers/auth.controller.js";

const router = Router();

router.post("/callback",authClerkCallback)

export default router;