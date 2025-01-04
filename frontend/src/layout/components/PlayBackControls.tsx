import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { usePlayerStore } from "@/stores/usePlayerStore"

import { Laptop2, ListMusic, Mic2, Pause, Play, Repeat, Shuffle, SkipBack, SkipForward, Volume1 } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const PlayBackControls = () => {
    const {isPlaying,currentSong,playNext,playPrevious,togglePlay} = usePlayerStore();

    const [volume, setvolume] = useState(75)
    const [currentTime, setcurrentTime] = useState(0)
    const [duration, setduration] = useState(0)
    const audioRef = useRef<HTMLAudioElement|null>(null)

    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor(seconds % 60);
        return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
    };

    useEffect(()=>{
        
        audioRef.current= document.querySelector("audio");

        const audio_element = audioRef.current;
        if(!audio_element) return;

        const updateTime  = ()=>{
            setcurrentTime(audio_element.currentTime)
        }
        const updateDuration = ()=>{
            setduration(audio_element.duration)
        }

        const handleEndedSong = ()=>{
            usePlayerStore.setState({isPlaying:false}) 

        }

        audio_element.addEventListener("timeupdate",updateTime);
        audio_element.addEventListener("loadedmetadata",updateDuration);
        audio_element.addEventListener("ended",handleEndedSong);

        return ()=>{
            audio_element.removeEventListener("timeupdate",updateTime);
            audio_element.removeEventListener("loadedmetadata",updateDuration);
            audio_element.removeEventListener("ended",handleEndedSong);
        }

     
    },[currentSong])
    const handleAudioPosition = (value:number[])=>{
        if(audioRef.current){
            audioRef.current.currentTime = value[0]
        }
    }
  return (
    <footer className='h-20 sm:h-24 bg-zinc-900 border-t border-zinc-800 px-4'>
        <div className='flex justify-between items-center h-full max-w-[1800px] mx-auto'>
            {/* song detail  */}
        <div className='hidden sm:flex items-center gap-4 min-w-[180px] w-[30%]'>
					{currentSong && (
						<>
							<img
								src={currentSong.imageUrl}
								alt={currentSong.title}
								className='w-14 h-14 object-cover rounded-md'
							/>
							<div className='flex-1 min-w-0'>
								<div className='font-medium text-sm 2xl:text-lg truncate hover:underline cursor-pointer'>
									{currentSong.title}
								</div>
								<div className='2xl:text-sm lg:text-xs text-zinc-400 truncate hover:underline cursor-pointer'>
									{currentSong.artist}
								</div>
							</div>
						</>
					)}
				</div>

                {/* audio player controls  */}

                <div className='flex flex-col items-center gap-2 flex-1 max-w-full sm:max-w-[45%]'>
					<div className='flex items-center gap-4 sm:gap-6'>
						<Button
							size='icon'
							variant='ghost'
							className='hidden sm:inline-flex hover:text-white text-zinc-400'
						>
							<Shuffle className='h-4 w-4' />
						</Button>

						<Button
							size='icon'
							variant='ghost'
							className='hover:text-white text-zinc-400'
							onClick={playPrevious}
							disabled={!currentSong}
						>
							<SkipBack className='h-4 w-4' />
						</Button>

						<Button
							size='icon'
							className='bg-white hover:bg-white/80 text-black rounded-full h-8 w-8'
							onClick={togglePlay}
							disabled={!currentSong}
						>
							{isPlaying ? <Pause className='h-5 w-5' /> : <Play className='h-5 w-5' />}
						</Button>
						<Button
							size='icon'
							variant='ghost'
							className='hover:text-white text-zinc-400'
							onClick={playNext}
							disabled={!currentSong}
						>
							<SkipForward className='h-4 w-4' />
						</Button>
						<Button
							size='icon'
							variant='ghost'
							className='hidden sm:inline-flex hover:text-white text-zinc-400'
						>
							<Repeat className='h-4 w-4' />
						</Button>
					</div>

					<div className='hidden sm:flex items-center gap-2 w-full'>
						<div className='text-xs text-zinc-400'>{formatTime(currentTime)}</div>
						<Slider
							value={[currentTime]}
							max={duration || 100}
							step={1}
							className='w-full hover:cursor-grab active:cursor-grabbing'
							onValueChange={handleAudioPosition}
						/>
						<div className='text-xs text-zinc-400'>{formatTime(duration)}</div>
					</div>
				</div>

                {/* volume controls  */}
                <div className='hidden sm:flex items-center gap-4 min-w-[180px] w-[30%] justify-end'>
					<Button size='icon' variant='ghost' className='hover:text-white text-zinc-400'>
						<Mic2 className='h-4 w-4' />
					</Button>
					<Button size='icon' variant='ghost' className='hover:text-white text-zinc-400'>
						<ListMusic className='h-4 w-4' />
					</Button>
					<Button size='icon' variant='ghost' className='hover:text-white text-zinc-400'>
						<Laptop2 className='h-4 w-4' />
					</Button>

					<div className='flex items-center gap-2'>
						<Button size='icon' variant='ghost' className='hover:text-white text-zinc-400'>
							<Volume1 className='h-4 w-4' />
						</Button>

						<Slider
							value={[volume]}
							max={100}
							step={1}
							className='w-24 hover:cursor-grab active:cursor-grabbing'
							onValueChange={(value) => {
								setvolume(value[0]);
								if (audioRef.current) {
									audioRef.current.volume = value[0] / 100;
								}
							}}
						/>
					</div>
                    </div>
        </div>
    </footer>
  )
}

export default PlayBackControls