import { Song } from "../models/song.model.js";
export const getAllSortedSongs = async (req,res,next)=>{
    try {
       const songs = await Song.find().sort({createdAt:-1});
        
        res.status(200).json(songs);
    } catch (error) {
        console.log("Error while getting all sorted songs",error);
        next(error);
        
    }
}

export const getfeaturedSongs = async (req,res,next)=>{
    try {
        const songs = await Song.aggregate([
            {$sample : {size : 6}},
            {$project :{
                _id :1,
                title:1,
                artist:1,
                imageUrl:1,
                audioUrl:1


            }}
        ])
        if(!songs){
            console.log("No songs found");
        }
        res.status(200).json(songs);
        
    } catch (error) {
        console.log("Error while getting featured songs",error);
        next(error);
    }
}
export const getMadeForYouSongs = async (req,res,next)=>{
    try {
        const songs = await Song.aggregate([
            {$sample : {size : 4}},
            {$project :{
                _id :1,
                title:1,
                artist:1,
                imageUrl:1,
                audioUrl:1


            }}
        ])
        res.status(200).json(songs);
        
    } catch (error) {
        console.log("Error while getting featured songs",error);
        next(error);
    }
}
export const getTrendingSongs = async (req,res,next)=>{
    try {
        const songs = await Song.aggregate([
            {$sample : {size : 4}},
            {$project :{
                _id :1,
                title:1,
                artist:1,
                imageUrl:1,
                audioUrl:1


            }}
        ])
        res.status(200).json(songs);
        
    } catch (error) {
        console.log("Error while getting featured songs",error);
        next(error);
    }
}