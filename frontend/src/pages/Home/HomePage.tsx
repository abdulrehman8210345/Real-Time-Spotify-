import TopBar from "@/components/TopBar"
import { ScrollArea } from "@/components/ui/scroll-area"
import FeaturedSection from "./components/FeaturedSection"
import { useMusicStore } from "@/stores/useMusicStore"
import { useEffect } from "react"
import SectionGrid from "./components/SectionGrid"
import { usePlayerStore } from "@/stores/usePlayerStore"


const HomePage = () => {
  const {fetchFeaturedSongs,fetchMadeforYouSongs,fetchtrendingSongs,featureSongs,trendingSongs,madeforYouSongs,isLoading} = useMusicStore();

  const {initializeQueue}= usePlayerStore();

  useEffect(()=>{
    fetchFeaturedSongs()
    fetchMadeforYouSongs()
    fetchtrendingSongs()
  },[fetchFeaturedSongs,fetchMadeforYouSongs,fetchtrendingSongs])
  useEffect(()=>{
    if(featureSongs.length > 0 && trendingSongs.length > 0 &&madeforYouSongs.length>0){
      const allsongsqueue = [...featureSongs,...madeforYouSongs,...trendingSongs]
      initializeQueue(allsongsqueue)
      
    }
  },[initializeQueue,featureSongs,madeforYouSongs,trendingSongs])
  return (
    <div className="rounded-md overflow-hidden h-full bg-gradient-to-b from-zinc-800 to-zinc-900"><TopBar/>
    
    <ScrollArea className="h-[calc(100vh-180px)]">
      <div className="p-4 sm:p-6">
        <h1 className="text-xl lg:text-2xl 2xl:text-3xl mb-6 font-bold">Good Afternoon</h1>
        <FeaturedSection/>
      
      <div className="space-y-8">
        <SectionGrid title="Made For You" songs={madeforYouSongs} isLoading={isLoading}/>
        <SectionGrid title="Trending" songs={trendingSongs} isLoading={isLoading}/>
      </div>
      </div>

    </ScrollArea>
    </div>
  )
}

export default HomePage