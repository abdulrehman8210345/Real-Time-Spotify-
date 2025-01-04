import { axiosInstance } from "@/lib/axios";
import { useAuthStore } from "@/stores/useAuthStore";
import { useChatStore } from "@/stores/useChatStore";
import { useAuth } from "@clerk/clerk-react";
import { Loader } from "lucide-react";
import { useEffect, useState } from "react"

const updateApiToken = (token :string |  null)=>{

    if(token)
    axiosInstance.defaults.headers.common["Authorization"]= `Bearer ${token}`;
   
    else
    delete axiosInstance.defaults.headers.common["Authorization"]
}

const AuthProvider = ({children}:{children:React.ReactNode}) => {
    const [loading, setLoading] = useState(true);
    const {getToken,userId} = useAuth();
    const {checkAdminStatus}= useAuthStore();
    const {initSocket,disconnectSocket} = useChatStore();

    useEffect(()=>{

            const initialzeAuth = async ()=>{
                try {
                    const token = await getToken();
                    // console.log(token,"token");
                    updateApiToken(token);
                    if(token)
                        await checkAdminStatus();
                    if(userId)
                        initSocket(userId)
                    
                } catch (error) {
                    console.log("Error while getting token",error);
                    updateApiToken(null);
                }
                finally{
                    setLoading(false);
                }  
            }
            initialzeAuth();
            return ()=> disconnectSocket();
    },[getToken,initSocket,userId,checkAdminStatus,disconnectSocket])

    if(loading){
        return <div className="h-screen w-full flex items-center justify-center"> 
            <Loader className="size-8 text-emerald-500 animate-spin "/>

        </div>

    }

  return (
    <div>{children}</div>
  )
}

export default AuthProvider