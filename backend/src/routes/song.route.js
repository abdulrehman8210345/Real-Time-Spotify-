import { Router } from "express";
import { getAllSortedSongs, getfeaturedSongs, getMadeForYouSongs, getTrendingSongs } from "../controllers/song.controller.js";
import { isAdmin, protectedRoute } from "../middleware/auth.middleware.js";

const router = Router();

router.get("/",protectedRoute,isAdmin,getAllSortedSongs);
router.get("/featured",getfeaturedSongs)
router.get("/made-for-you",getMadeForYouSongs)
router.get("/trending",getTrendingSongs)

export default router;