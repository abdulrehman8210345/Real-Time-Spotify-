import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    recieverId:{
        type:String,
        required:true
    },
    senderId:{
        type:String,
        required:true
    },
    text:{
        type:String,
        required:true
    }
},{
    timestamps:true
})

export const Message = new mongoose.model("Message",messageSchema);