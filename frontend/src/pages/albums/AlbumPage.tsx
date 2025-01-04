import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useMusicStore } from "@/stores/useMusicStore";
import { usePlayerStore } from "@/stores/usePlayerStore";
import { Clock, Pause, Play } from "lucide-react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";


export const formatDuration = (seconds: number) => {
	const minutes = Math.floor(seconds / 60);
	const remainingSeconds = seconds % 60;
	return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
};

const AlbumPage = () => {
  const { albumid } = useParams();

  const { isLoading, currentAlbum, fetchAlbumById } = useMusicStore();

  const {isPlaying,currentSong,togglePlay,playAlbum} = usePlayerStore();

  const handlePlaySong = (index:number)=>{
    if(!currentAlbum) return;
    playAlbum(currentAlbum?.songs,index)
  }

  const handlePlayAlbum = ()=>{
    if(!currentAlbum?.songs) return;
    const isCurrentAlbumPlaying = currentAlbum?.songs.some((song)=>song._id === currentSong?._id);
    if(isCurrentAlbumPlaying) togglePlay();
    else playAlbum(currentAlbum?.songs,0)
  }

  useEffect(() => {
    if (albumid) fetchAlbumById(albumid);
  }, [albumid, fetchAlbumById]);

  if (isLoading) return null;
  return (
    <div className="h-full">
      <ScrollArea className="h-full rounded-md">
        {/* album detail section  */}
        <div className="relative min-h-full">
          <div className="absolute inset-0 bg-gradient-to-b from-[#5038a0]/80 via-zinc-900/80 to-zinc-900 pointer-events-none" />

          <div className="relative z-10">
            <div className="flex p-6 lg:gap-6 gap-4 pb-8">
              <img
                src={currentAlbum?.imageUrl}
                alt={currentAlbum?.title}
                className="2xl:w-[240px] 2xl:h-[240px] lg:w-[180px] lg:h-[180px] w-[80px] h-[80px] shadow-xl rounded"
              />
              <div className="flex flex-col ">
                <p className="lg:text-sm text-xs font-medium">Album</p>
                <h1 className="2xl:text-7xl lg:text-5xl text-2xl font-bold lg:my-4 my-2">
                  {currentAlbum?.title}
                </h1>
                <div className="flex items-center gap-2 lg:text-sm text-[10px] text-zinc-100">
                  <span className="font-medium text-white">
                    {currentAlbum?.artist}
                  </span>
                  <span>• {currentAlbum?.songs.length} songs</span>
                  <span>• {currentAlbum?.releaseYear}</span>
                </div>
              </div>
            </div>
            <div className="px-6 pb-4 flex items-center gap-6">
              <Button
              onClick={handlePlayAlbum}
                size="icon"
                className="2xl:w-14 2xl:h-14 lg:w-10 lg:h-10 w-8 h-8 rounded-full bg-green-500 hover:bg-green-400 hover:scale-105 transition-all"
              >{
                isPlaying && currentAlbum?.songs.some((song)=>song._id === currentSong?._id)? 
                <Pause className="text-black h-7 w-7"/>: <Play className="text-black h-7 w-7" />
              }
                
              </Button>
            </div>

            {/* table section  */}
            <div className="bg-black/20 backdrop-blur-sm">
              <div
                className="grid grid-cols-[16px_4fr_2fr_1fr] gap-4 lg:px-10 px-4 py-2 text-[10px] lg:text-sm 
            text-zinc-400 border-b border-white/5"
              >
                <div>#</div>
                <div>Title</div>
                <div>Released Date</div>
                <div>
                  <Clock className=" lg:h-4 h-3 lg:w-4 w-3" />
                </div>
              </div>

              <div className="lg:px-6 px-0">
                <div className="space-y-2 py-4">
                  {currentAlbum?.songs.map((song, index) => {
                    const isCurrentSong = currentSong?._id === song._id
                    return (
                      <div
                        key={song._id}
                        onClick={() => handlePlaySong(index)}
                        className={`grid grid-cols-[16px_4fr_2fr_1fr] lg:gap-4 gap-2 lg:px-4 px-2 py-2 text-sm 
                      text-zinc-400 hover:bg-white/5 rounded-md group cursor-pointer
                      `}
                      >
                        <div className="flex items-center justify-center">
                          { isCurrentSong && isPlaying ? <div className="size-4 text-green-500">♫</div> : <span className="group-hover:hidden">{index+1}</span> }
                            {
                              !isCurrentSong && <Play className="h-4 w-4 hidden group-hover:block "/>
                            }
                            
                            
                        </div>

                        <div className="flex items-center gap-3">
                          <img
                            src={song.imageUrl}
                            alt={song.title}
                            className="lg:size-10 size-7"
                          />

                          <div>
                            <div className={`font-medium lg:text-sm text-xs text-white`}>
                              {song.title}
                            </div>
                            <div className="lg:text-sm text-xs">{song.artist}</div>
                          </div>
                        </div>
                        <div className="flex items-center lg:textsm text-xs">
                          {song.createdAt.split("T")[0]}
                        </div>
                        <div className="flex items-center lg:textsm text-xs">
                          {song.duration}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
};

export default AlbumPage;
