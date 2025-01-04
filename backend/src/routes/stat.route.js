import { Router } from "express";
import { isAdmin, protectedRoute } from "../middleware/auth.middleware.js";
import { getStats } from "../controllers/stat.controller.js";

const router = Router();

router.get("/",protectedRoute,isAdmin,getStats)

export default router;