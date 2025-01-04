import mongoose from "mongoose";

export const connectDb = async ()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to DB");
    } catch (error) {
        console.log("error while connecting to DB",error);
        
    }
    
}