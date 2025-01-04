import { Album } from "../models/album.model.js";

export const getAllAlbums = async (req,res,next)=>{
    try {

        const albums = await Album.find();
        res.status(200).json(albums);
        
    } catch (error) {
        console.log("Error while getting all albums",error);
        next(error);
        
    }
}

export const getAnAlbumById = async (req,res,next)=>{
    try {
        const {id}= req.params;
        const album = await Album.findById(id).populate("songs");

        if(!album){
            return res.status(404).json({message:"Album not found"});
        }
        res.status(200).json(album);
        
    } catch (error) {
        console.log("Error while getting album by id",error);
        next(error);
    }
}