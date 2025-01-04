import PlaylistSkeleton from "@/components/skeletons/PlayListSkeleton"
import { buttonVariants } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import { useMusicStore } from "@/stores/useMusicStore"
import { SignedIn } from "@clerk/clerk-react"
import { HomeIcon, Library, MessageCircle } from "lucide-react"
import { useEffect } from "react"
import { Link } from "react-router-dom"

const LeftSidebar = () => {
    const { albums, fetchAlbums, isLoading } = useMusicStore();

    useEffect(() => {
        fetchAlbums();

    }, [fetchAlbums])

    // console.log({ albums });
    return (
        <div className="h-full flex flex-col gap-2">
            {/* home, message section  */}
            <div className="rounded-lg lg:p-4 p-0 bg-zinc-900">
                <div className="space-y-2">
                    <Link to={"/"} className={cn(buttonVariants({
                        variant: "ghost",
                        className: "hover:bg-zinc-800 justify-start text-white w-full"
                    }))}>
                        <HomeIcon className="mr-2 size-5" />
                        <span className="hidden md:inline">Home</span>
                    </Link>
                    <SignedIn>
                        <Link to={"/chat"} className={cn(buttonVariants({
                            variant: "ghost",
                            className: "hover:bg-zinc-800 justify-start text-white w-full"
                        }))}>
                            <MessageCircle className="mr-2 size-5" />
                            <span className="hidden md:inline">Message</span>
                        </Link>

                    </SignedIn>
                </div>

            </div>

            {/* playlist section  */}

            <div className="flex-1 rounded-lg bg-zinc-900 lg:p-4 p-1 pt-4">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center text-white px-2">
                        <Library className="2xl:size-5 lg:size-4 mr-2" />
                        <span className="hidden md:inline">Library</span>
                    </div>
                </div>
                <ScrollArea className="h-[calc(100vh-300px)]">
                    <div className="space-y-2">
                        {isLoading ? (
                            <PlaylistSkeleton />
                        ) : (
                            albums.map((album) => (
                                <Link to={`/albums/${album._id}`} key={album._id} className="p-2 hover:bg-zinc-800 rounded-md cursor-pointer flex items-center gap-3 group">
                                    <img src={album.imageUrl} alt="Playlist img" className="lg:size-10
                                    size-8 rounded-md flex-shrink-0 object-cover" />
                                    <div className="flex-1 min-w-0 hidden md:block">
                                        <p className="lg:text-sm 2xl:text-lg truncate">{album.title}</p>
                                        <p className="lg:text-[12px] 2xl:text-xs  truncate text-zinc-400">Album • {album.artist}</p>
                                    </div>
                                </Link>
                            ))
                        )}
                    </div>
                </ScrollArea>

            </div>

        </div>
    )
}

export default LeftSidebar