import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullName :{
        type:String,
        required:true
    },
    imageUrl :{
        type:String,
        required:true
    },
    ClerkId:{
        type:String,
        required:true,
        unique:true
    }
},
{timestamps:true})

export const User = new mongoose.model("User",userSchema);
