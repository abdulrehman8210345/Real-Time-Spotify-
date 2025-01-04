import { Router } from "express";
import { getAllAlbums, getAnAlbumById } from "../controllers/album.controller.js";

const router = Router();

router.get("/",getAllAlbums);
router.get("/:id",getAnAlbumById);

export default router;