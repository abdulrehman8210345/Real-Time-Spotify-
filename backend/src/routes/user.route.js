import { Router } from "express";
import { protectedRoute } from "../middleware/auth.middleware.js";
import { getAllMessages, getAllUsers } from "../controllers/user.controller.js";

const router = Router();

router.get("/",protectedRoute,getAllUsers);
router.get("/messages/:userId",protectedRoute,getAllMessages)

export default router;