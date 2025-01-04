import { Card, CardContent } from "@/components/ui/card"
import { axiosInstance } from "@/lib/axios"
import { useUser } from "@clerk/clerk-react"
import { Loader } from "lucide-react"
import { useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom"


const AuthCallBackPage = () => {
  const navigate = useNavigate();
  const {user, isLoaded} = useUser();
  const SyncAttempt= useRef(false);
  useEffect(() => {

    const syncUser =async()=> {
      if(!isLoaded || !user || SyncAttempt.current) return;
   
      try {
        SyncAttempt.current=true;
        console.log("Sending data to backend:", {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          imageUrl: user.imageUrl
      });
        await axiosInstance.post("/auth/callback",{
          id : user.id,
          firstName :user.firstName,
          lastName:user.lastName,
          imageUrl : user.imageUrl
        })
        // console.log("USer data saved in db");
        
        
      } catch (error) {
        console.log("Error while syncing user",error);
        
      }
      finally{
        navigate("/");
      }
    }

    syncUser();
    
  }, [navigate,user,isLoaded])
  
  return (
    <div className="h-screen w-full bg-black flex items-center justify-center">
      <Card className="w-[90%] max-w-md bg-zinc-900 border-zinc-800">
        <CardContent className="flex flex-col items-center gap-4 pt-6">
          <Loader className="size-6 text-emerald-500 animate-spin"/>
          <h3 className="text-zinc-400 font-bold text-xl">Logging you in</h3>
          <p className="text-zinc-400 text-sm">Redircting...</p>
        </CardContent>
      </Card>
    </div>
  )
}

export default AuthCallBackPage