import { Message } from "../models/message.model.js";
import { User } from "../models/user.model.js"

export const getAllUsers = async (req,res,next)=>{
    try {
        const currentUSerId= req.auth.userId;
        const users = await User.find({ClerkId : {$ne :currentUSerId}})
     
        res.status(200).json(users);
        
    } catch (error) {
        next(error)
        
    }
}

export const getAllMessages = async (req,res,next)=>{
    try {
        const myId = req.auth.userId;
        const {userId} = req.params;

        const messages = await Message.find({
            $or : [
                {recieverId:myId , senderId:userId},
                {recieverId:userId , senderId:myId}
            ]
        }).sort({createdAt : 1})

        res.status(200).json(messages);
        
    } catch (error) {
        next(error)
        
    }
}