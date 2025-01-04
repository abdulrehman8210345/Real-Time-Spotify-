import { User } from "../models/user.model.js";

export const authClerkCallback = async (req,res,next)=>{
    try {

        const {id, firstName,lastName,imageUrl} = req.body;
        console.log('Received Clerk data:', { id, firstName, lastName, imageUrl });
        const user = await User.findOne({ClerkId:id});
        console.log('Found user in DB:', user);
        if(!user){
            await User.create({
                ClerkId:id,
                fullName: `${firstName || ""} ${lastName || ""}`.trim(),
                imageUrl
            })
        }

        res.status(200).json({success:true});
        
    } catch (error) {
        console.log("Internal server error",error);
      next(error);
        
    }
}