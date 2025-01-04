import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useChatStore } from "@/stores/useChatStore"

const ChatHeader = () => {
    const {selectedUser,onlineUsers} = useChatStore();

    if(!selectedUser) return null;
  return (
    <div  className='p-4 border-b border-zinc-800'>
        <div className='flex items-center gap-3'>
            <Avatar className="lg:size-8 2xl:size-10 size-7">
                <AvatarImage src={selectedUser?.imageUrl}/>
                <AvatarFallback>{selectedUser?.fullName[0]}</AvatarFallback>
            </Avatar>
            <div>
            <h2 className='font-medium lg:text-sm 2xl:text-lg text-[14px]'>{selectedUser?.fullName}</h2>
            <p className='lg:text-xs text-[12px] 2xl:text-sm text-zinc-400'>
                {onlineUsers.has(selectedUser?.ClerkId)? "Online" : "Offline"}
            </p>
            </div>
        </div>
    </div>
  )
}

export default ChatHeader