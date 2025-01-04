import { SignedOut, UserButton } from "@clerk/clerk-react";
import { LayoutDashboardIcon } from "lucide-react";
import { Link } from "react-router-dom";
import SignInOAuthButtons from "./SignInOAuthButtons";
import { useAuthStore } from "@/stores/useAuthStore";
import { cn } from "@/lib/utils";
import { buttonVariants } from "./ui/button";


const TopBar = () => {
    const {isAdmin} = useAuthStore();
  return (
    <div className="flex justify-between items-center p-4 sticky top-0 bg-zinc-900/75 z-10 backdrop-blur-md">
        <div className="flex gap-2 items-center">
            <img src="/spotify.png" className="2xl:size-8 lg:size-6 size-5" alt="logo" />
            <p className="2xl:text-lg lg:text-sm text-[16px]">Spotify</p>
        </div>
        <div className="flex gap-4 items-center">
            {
                isAdmin && (
                    <Link to={"/admin"} className={cn(buttonVariants({variant:"outline"}))}>
                        <LayoutDashboardIcon className="size-4 mr-2"/>
                        <p className="2xl:text-lg lg:text-sm text-xs">Admin Dashboard</p>
                    </Link>
                )  
            }
            <SignedOut>
                <SignInOAuthButtons/>
            </SignedOut>

            <UserButton/>
        </div>
    </div>
  )
}

export default TopBar