import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"
import { Outlet } from "react-router-dom"
import LeftSidebar from "./components/LeftSidebar";
import FriendsActivity from "./components/FriendsActivity";
import MusicPlayer from "./components/MusicPlayer";
import PlayBackControls from "./components/PlayBackControls";
import { useEffect, useState } from "react";


const MainLaout = () => {
    const [mobile, setMobile] = useState(false);

    useEffect(()=>{
        const checkMobile = ()=>{
            if(window.innerWidth < 768){
                setMobile(true)
            }
        }
        checkMobile();
        window.addEventListener("resize",checkMobile);

        return ()=> window.removeEventListener("resize",checkMobile);
    })
  return (
    <div className="h-screen bg-black text-white flex flex-col">
        <ResizablePanelGroup className="flex flex-1 p-2 overflow-hidden" direction="horizontal">
<MusicPlayer/>
            {/* left sidebar  */}
            <ResizablePanel defaultSize={20} minSize={mobile ? 0 :20} maxSize={30}>
                <LeftSidebar/>

            </ResizablePanel>
            <ResizableHandle className="bg-black w-2 rounded-lg transition-colors"/>
            <ResizablePanel defaultSize={mobile ? 100 : 60 }>
                <Outlet/>
                </ResizablePanel>
           {
            !mobile && 
            <>
                 <ResizableHandle className="bg-black w-2 rounded-lg transition-colors"/>
            {/* right sidebar  */}
            <ResizablePanel defaultSize={20} minSize={0} maxSize={25} collapsedSize={0} >
                <FriendsActivity/>
            </ResizablePanel>
            </>
           }
        </ResizablePanelGroup>
        <PlayBackControls/>
    </div>
  )
}

export default MainLaout