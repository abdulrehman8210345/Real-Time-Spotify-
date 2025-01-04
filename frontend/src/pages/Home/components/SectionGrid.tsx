import FeaturedGridSkeleton from "@/components/skeletons/FeaturedGridSkeleton";
import { Button } from "@/components/ui/button";
import { Song } from "@/types";
import PlayButton from "./PlayButton";

type sectionGridProps = {
  title: string;
  songs: Song[];
  isLoading: boolean;
};

const SectionGrid = ({ isLoading, title, songs }: sectionGridProps) => {
  if (isLoading) return <FeaturedGridSkeleton />;
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl lg:text-2xl 2xl:text-3xl font-bold">{title}</h2>
        <Button
          variant="ghost"
          className="2xl:text-sm lg:text-xs text-[12px] text-zinc-400 hover:text-white rounded-xl"
        >
          Show All
        </Button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {
            songs?.map((song)=>(
                <div className="bg-zinc-800/40 rounded-md p-4 hover:bg-zinc-700/40 cursor-pointer group transition-all" key={song._id}>
                    <div className="relative mb-4">
                        <div className="aspect-square rounded-md shadow-lg overflow-hidden">
                            <img src={song.imageUrl} alt={song.title} 
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
                        </div>
                        <PlayButton song={song}/>
                    </div>
                    <h3 className="font-medium lg:text-sm 2xl:text-lg mb-2 truncate">{song.title}</h3>
                    <p className="2xl:text-sm lg:text-xs text-[12px] text-zinc-400 truncate">{song.artist}</p>

                </div>
            ))
        }
      </div>
    </div>
  );
};

export default SectionGrid;
