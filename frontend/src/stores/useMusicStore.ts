import { axiosInstance } from "@/lib/axios"
import { Album, Song,Stats } from "@/types";
import toast from "react-hot-toast";
import {create} from "zustand"

interface MusicInterface {
    songs : Song[];
    albums:Album[];
    isLoading :boolean;
    error : string | null;
    stats : Stats;
    currentAlbum: Album | null;
    featureSongs:Song[];
    trendingSongs:Song[];
    madeforYouSongs:Song[];
    fetchFeaturedSongs:()=>Promise<void>;
    fetchMadeforYouSongs:()=>Promise<void>;
    fetchtrendingSongs:()=>Promise<void>;
    fetchAlbums: ()=> Promise<void>
    fetchSongs : ()=> Promise<void>;
    fetchStats : ()=> Promise<void>;
    fetchAlbumById : (id :string)=>Promise<void>;
    deleteSong : (id:string)=>Promise<void>;
}

 
export const useMusicStore = create<MusicInterface>((set)=>({
    songs : [],
    albums :[],
    error :null,
    isLoading:false,
    currentAlbum : null,
    stats:{
        totalSongs : 0,
        totalAlbums : 0,
        totalUsers : 0,
        totalArtists : 0
    },

    featureSongs : [],
    trendingSongs :[],
    madeforYouSongs:[],

    fetchFeaturedSongs : async ()=>{
        set({isLoading : true , error: null} )
        try {
            const response= await axiosInstance.get("/songs/featured")
            set({featureSongs:response.data})
            
        } catch (error:any) {
            set({error : error.response.data.message})
            
        }
        finally{
            set({isLoading :false})
        }

    },

    fetchtrendingSongs : async ()=>{
        set({isLoading : true , error: null} )
        try {
            const response= await axiosInstance.get("/songs/trending")
            set({trendingSongs:response.data})
            
        } catch (error:any) {
            set({error : error.response.data.message})
            
        }
        finally{
            set({isLoading :false})
        }

    },
    fetchMadeforYouSongs : async ()=>{
        set({isLoading : true , error: null} )
        try {
            const response= await axiosInstance.get("/songs/made-for-you")
            set({madeforYouSongs:response.data})
            
        } catch (error:any) {
            set({error : error.response.data.message})
            
        }
        finally{
            set({isLoading :false})
        }
        

    },

    fetchAlbums : async ()=>{
        set({isLoading : true , error: null} )
        try {

            const response = await axiosInstance.get("/albums");
            set({ albums : response.data})
            
        } catch (error:any) {
            set({error : error.response.data.message})
            
        }
        finally{
            set({isLoading :false})
        }
    },

    fetchStats : async ()=>{
        set({isLoading : true , error: null} )
        try {
            const response = await axiosInstance.get("/stats");
            set({stats : response.data})
            
        } catch (error:any) {
            set({error : error.response.data.message})
            
        }finally{
            set({isLoading :false})
        }
    },

    fetchSongs: async ()=>{
        set({isLoading : true , error: null} )
        set({isLoading : true , error: null} )
        try {
            const response = await axiosInstance.get("/songs");
            set({songs : response.data})
            
        } catch (error:any) {
            set({error : error.response.data.message})
            
        }finally{
            set({isLoading :false})
        }
    },

    fetchAlbumById : async (id)=>{
        set({isLoading : true , error: null} )
        try {

            const response = await axiosInstance.get(`/albums/${id}`);
            set({currentAlbum:response.data})

            
        } catch (error:any) {
            set({error : error.response.data.message})
            
        }
        finally{
            set({isLoading :false})
        }
    },
    deleteSong : async (id)=>{
        set({isLoading : true , error: null} )
        try {
            await axiosInstance.delete(`/admin/songs/${id}`);
            set((state)=>(
                { 
                    songs: state.songs.filter((song)=>song._id !== id)
                }
            ));
            toast.success("Song deleted Successfully")
            
        } catch (error:any) {
            console.log(error.response.data.message);
            toast.error("Error while deleting song")
        }
        finally{
            set({isLoading:false})
        }
    }
}))