import { Song } from "@/types";
import { create } from "zustand";
import { useChatStore } from "./useChatStore";

interface PlayerStore{
    queue : Song[];
    currentSong : Song | null ;
    currentIndex : number;
    isPlaying :boolean;

    setCurrentSong : (songs :Song | null)=> void;
    initializeQueue : (songs: Song[])=>void;
    playAlbum : (songs: Song[],startIndex?:number)=>void;
    togglePlay : ()=>void;
    playNext : ()=>void;
    playPrevious : ()=>void;
    
}

export const usePlayerStore = create<PlayerStore>((set,get)=>({
    queue:[],
    currentIndex:-1,
    isPlaying:false,
    currentSong : null,

    setCurrentSong : (song : Song | null)=>{

        const socket = useChatStore.getState().socket;
        if(socket.auth){
            socket.emit("update_activity",{
                userId : socket.auth.userId,
                activity: `Playing ${song?.title} by ${song?.artist}`
            })
        }
      const index = get().queue.findIndex((sonng)=>sonng._id === song?._id)
      set({
        currentSong:song,
        isPlaying :true,
        currentIndex:index ! == -1? index : get().currentIndex
      })
    },
    
    initializeQueue : (songs:Song[])=>{
        set({
            queue:songs,
            currentSong : get().currentSong || songs[0],
            currentIndex: get().currentIndex === -1 ? 0 : get().currentIndex
        })
    },

    playAlbum : (songs:Song[], startIndex=0)=>{

        const song = songs[startIndex];
        const socket = useChatStore.getState().socket;
        if(socket.auth){
            socket.emit("update_activity",{
                userId : socket.auth.userId,
                activity: `Playing ${song?.title} by ${song?.artist}`
            })
        }
        set({
            queue:songs,
            currentSong: songs[startIndex],
            currentIndex:startIndex,
            isPlaying:true
        })
    },

    togglePlay : ()=>{
        const isCurrentlyPlaying  =  !get().isPlaying
        const socket = useChatStore.getState().socket;
        const currentSong = get().currentSong
        if(socket.auth){
            socket.emit("update_activity",{
                userId : socket.auth.userId,
                activity: isCurrentlyPlaying  && currentSong ?  `Playing ${currentSong?.title} by ${currentSong?.artist}` : "Idle"
            })
        }
        set({isPlaying:isCurrentlyPlaying })
    },
    playNext : ()=>{
        const nextIndex = get().currentIndex + 1
        if(nextIndex < get().queue.length){
            const nextSong = get().queue[nextIndex]
            const socket = useChatStore.getState().socket;
            if(socket.auth){
                socket.emit("update_activity",{
                    userId : socket.auth.userId,
                    activity: `Playing ${nextSong?.title} by ${nextSong?.artist}`
                })
            }
            set({
                currentSong : nextSong,
                isPlaying : true,
                currentIndex : nextIndex
            })

        }
        else{
            set({isPlaying:false})
            const socket = useChatStore.getState().socket;
            if(socket.auth){
                socket.emit("update_activity",{
                    userId : socket.auth.userId,
                    activity: "Idle"
                })
            }
        }
    },
    playPrevious : ()=>{
        const prevIndex= get().currentIndex-1
        if(prevIndex >= 0){
            const prevSong = get().queue[prevIndex]
            const socket = useChatStore.getState().socket;
            if(socket.auth){
                socket.emit("update_activity",{
                    userId : socket.auth.userId,
                    activity: `Playing ${prevSong?.title} by ${prevSong?.artist}`
                })
            }
            set({
                currentSong: prevSong,
                currentIndex:prevIndex,
                isPlaying:true
            })
    }
    else{
        set({isPlaying:false})
        const socket = useChatStore.getState().socket;
        if(socket.auth){
            socket.emit("update_activity",{
                userId : socket.auth.userId,
                activity: "Idle"
            })
        }
    }
}

}))