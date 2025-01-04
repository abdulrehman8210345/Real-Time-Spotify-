import {clerkClient} from "@clerk/express"

export const protectedRoute = async (req,res,next)=>{
    if(!req.auth.userId){
        return res.status(401).json({message:"Unauthorized, please login"});
    }
    next();
}


export const isAdmin= async (req,res,next)=>{

    try {
        
   

    const userdetail= await clerkClient.users.getUser(req.auth.userId);
    const admin = process.env.ADMIN_EMAIL === userdetail.primaryEmailAddress?.emailAddress;
    if(!admin){
        return res.status(403).json({message:"Unauthorized, you are not admin"});
    }
    next();
} catch (error) {
    next(error);
       
}

}