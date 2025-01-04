import FeaturedGridSkeleton from "@/components/skeletons/FeaturedGridSkeleton";
import { useMusicStore } from "@/stores/useMusicStore"
import PlayButton from "./PlayButton";


const FeaturedSection = () => {
    const {featureSongs,isLoading,error} = useMusicStore();

    if(isLoading) return <FeaturedGridSkeleton/>;

    if(error) return <p className="text-red-500 text-lg mb-4">{error}</p>
   return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {
            featureSongs?.map((feature)=>(
                <div key={feature._id} className="flex items-center bg-zinc-800/50 rounded-md overflow-hidden hover:bg-zinc-700/50 transition-colors group cursor-pointer relative">
            <img src={feature.imageUrl} alt={feature.title} className="w-16 sm:w-20 h-16 sm:h-20 object-cover flex-shrink-0" />
            <div className="flex-1 p-4">
                <p className="truncate lg:text-sm  2xl:text-lg">{feature.title}</p>
                <p className="2xl:text-sm lg:text-xs text-[12px] text-zinc-400 truncate">{feature.artist}</p>
            </div>
            <PlayButton song={feature}/>
                </div>
            ))
        }
    </div>
  )
}

export default FeaturedSection