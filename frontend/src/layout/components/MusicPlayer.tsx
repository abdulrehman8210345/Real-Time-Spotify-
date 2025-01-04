import { usePlayerStore } from "@/stores/usePlayerStore";
import { useEffect, useRef } from "react"

const MusicPlayer = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const PrevSongRef = useRef<string | null>(null);

  const {currentSong,isPlaying,playNext}= usePlayerStore();

  // this uuseeffect is for play/pause of audio 
  useEffect(()=>{
    if(isPlaying){
      audioRef.current?.play();
    }
    else{
      audioRef.current?.pause();
    }

  },[isPlaying])

  // this useEffect is for song ended
  useEffect(()=>{
    const audio_element = audioRef.current; 
    

    audio_element?.addEventListener("ended",()=>{playNext()});

    return ()=>{
      audio_element?.removeEventListener("ended",()=>{playNext()});
    }

  },[playNext])

  // this useEffect is for changing song

  useEffect(()=>{
    if(!audioRef.current || !currentSong) return;
    const audio_element= audioRef.current;

    const ischange = PrevSongRef.current !== currentSong?.audioUrl;
    if(ischange){
      audio_element.src = currentSong?.audioUrl;
      audio_element.currentTime = 0;
      PrevSongRef.current = currentSong.audioUrl;

      if(isPlaying)  audio_element.play();
    }
  },[currentSong,isPlaying])

  return (
    <div>
        <audio ref={audioRef}/>
    </div>
  )
}

export default MusicPlayer