import { Router } from "express";
import { isAdmin, protectedRoute } from "../middleware/auth.middleware.js";
import { checkAdmin, createalbum, createSong, deletealbum, deleteSong } from "../controllers/admin.controller.js";

const router = Router();

router.get("/checkadmin",protectedRoute,isAdmin,checkAdmin);
router.post("/songs",protectedRoute,isAdmin,createSong);
router.delete("/songs/:id",protectedRoute,isAdmin,deleteSong);
router.post("/albums",protectedRoute,isAdmin,createalbum);
router.delete("/albums/:id",protectedRoute,isAdmin,deletealbum);

export default router;