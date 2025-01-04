import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { axiosInstance } from "@/lib/axios";
import { useMusicStore } from "@/stores/useMusicStore";
import { Plus, Upload } from "lucide-react";
import { useRef, useState } from "react";
import toast from "react-hot-toast";

interface newSongInputs {
  title: string;
  artist: string;
  album: string;
  duration: string;
}
const AddSongDialog = () => {
  const { albums } = useMusicStore();
  const [ isLoading, setIsLoading ] = useState(false);
  const [songDialogOpen, setsongDialogOpen] = useState(false);
  const [newSong, setnewSong] = useState<newSongInputs>({
    title: "",
    artist: "",
    duration: "",
    album: "",
  });

  const [files, setfiles] = useState<{
    audio: File | null;
    image: File | null;
  }>({
    audio: null,
    image: null,
  });

  const audioRef = useRef<HTMLInputElement>(null);
  const imageRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async () => {
    setIsLoading(true);

    try {
      if(!files.audio || !files.image){
        return toast.error("Please upload both audio and image files")
      }
      if(!newSong.title || !newSong.duration || !newSong.artist)
        return toast.error("Please provide all the details");


      const formData = new FormData();
    formData.append("title",newSong.title);
    formData.append("duration",newSong.duration);
    formData.append("artist",newSong.artist);
    if(newSong.album && newSong.album!="none"){
      formData.append("albumId",newSong.album);
    }
    formData.append("audioFile",files.audio!);
    formData.append("imageFile",files.image!);


     await axiosInstance.post("/admin/songs",formData,{
      headers:{
        "Content-Type":"multipart/form-data"
      }
    })
  

    setnewSong({
      title: "",
      artist: "",
      duration: "",
      album: "",
    })
    setfiles({
      audio: null,
      image: null
    })
    setsongDialogOpen(false);

    toast.success("Song Added Successfully")
    
      
    } catch (error:any) {
      console.error("Request failed:", error);
    
      toast.error("Error while adding song");
      
    }
    finally{
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={songDialogOpen} onOpenChange={setsongDialogOpen}>
      <DialogTrigger asChild>
        <Button className="bg-emerald-500 hover:bg-emerald-600 text-black">
          <Plus className="mr-2 h-4 w-4" />
          Add Song
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-zinc-900 border-zinc-700 max-h-[80vh] overflow-auto scrollbar-hide">
        <DialogHeader>
          <DialogTitle>Add New Song</DialogTitle>
          <DialogDescription>
            Add a new song to your music library
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <input
            type="file"
            ref={imageRef}
            accept="image/*"
            hidden
            onChange={(e) =>
              setfiles((prev) => ({ ...prev, image: e.target.files![0] }))
            }
          />
          <input
            type="file"
            ref={audioRef}
            accept="audio/*"
            hidden
            onChange={(e) =>
              setfiles((prev) => ({ ...prev, audio: e.target.files![0] }))
            }
          />

          {/* image upload div  */}
          <div
            className="flex items-center justify-center p-6 border-2 border-dashed cursor-pointer border-zinc-700 rounded-lg"
            onClick={() => imageRef.current?.click()}
          >
            <div className="text-center">
              {files.image ? (
                <div className="space-y-2">
                  <div className="text-sm text-emerald-500">
                    Image selected:
                  </div>
                  <div className="text-xs text-zinc-400">
                    {files.image.name.slice(0, 20)}
                  </div>
                </div>
              ) : (
                <>
                  {" "}
                  <div className="p-3 bg-zinc-800 mb-2 rounded-full inline-block">
                    <Upload className="h-6 w-6 text-zinc-400" />
                  </div>
                  <div className="text-sm text-zinc-400 mb-2">
                    Upload artwork
                  </div>
                  <Button variant="outline" size="sm" className="text-xs">
                    Choose File
                  </Button>
                </>
              )}
            </div>
          </div>

          {/* audio upload div  */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Audio File</label>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                onClick={() => audioRef.current?.click()}
                className="w-full"
              >
                {files.audio
                  ? files.audio.name.slice(0, 20)
                  : "Choose Audio File"}
              </Button>
            </div>
          </div>

          {/* input fields  */}

          <div className="space-y-2">
            <label className="text-sm font-medium">Title</label>
            <Input
              value={newSong.title}
              onChange={(e) =>
                setnewSong({ ...newSong, title: e.target.value })
              }
              className="bg-zinc-800 border-zinc-700"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Artist</label>
            <Input
              value={newSong.artist}
              onChange={(e) =>
                setnewSong({ ...newSong, artist: e.target.value })
              }
              className="bg-zinc-800 border-zinc-700"
            />
          </div>
          <div className='space-y-2'>
						<label className='text-sm font-medium'>Duration (seconds)</label>
						<Input
							type='number'
							min='0'
							value={newSong.duration}
							onChange={(e) => setnewSong({ ...newSong, duration: e.target.value || "0" })}
							className='bg-zinc-800 border-zinc-700'
						/>
					</div>
          <div className="space-y-2">
          <label className='text-sm font-medium'>Album (Optional)</label>
          <Select value={newSong.album} onValueChange={(value)=>setnewSong({...newSong,album:value})}>
            <SelectTrigger className='bg-zinc-800 border-zinc-700'>
            <SelectValue placeholder='Select album' />
              
            </SelectTrigger>
            <SelectContent className='bg-zinc-800 border-zinc-700'>
            <SelectItem value='none'>No Album (Single)</SelectItem>
            {
              albums.map((album)=>(
                <SelectItem value={album._id} key={album._id}>{album.title}</SelectItem>
              ))
            }
            </SelectContent>

          </Select>
          </div>


        </div>
        <DialogFooter>
					<Button variant='outline' onClick={() => setsongDialogOpen(false)} disabled={isLoading}>
						Cancel
					</Button>
					<Button onClick={handleSubmit} disabled={isLoading}>
						{isLoading ? "Uploading..." : "Add Song"}
					</Button>
				</DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddSongDialog;
