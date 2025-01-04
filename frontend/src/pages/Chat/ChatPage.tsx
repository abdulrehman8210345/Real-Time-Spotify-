import TopBar from "@/components/TopBar";
import { useChatStore } from "@/stores/useChatStore";
import { useUser } from "@clerk/clerk-react";
import { useEffect, useRef } from "react";
import UsersList from "./components/UsersList";
import ChatHeader from "./components/ChatHeader";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar,  AvatarImage } from "@/components/ui/avatar";
import MessageInput from "./components/MessageInput";

const formatTime = (date: string) => {
	return new Date(date).toLocaleTimeString("en-US", {
		hour: "2-digit",
		minute: "2-digit",
		hour12: true,
	});
};

const ChatPage = () => {
  const { user } = useUser();
  const { fetchAllUsers, selectedUser, fetchMessages,messages } = useChatStore();
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (user) fetchAllUsers();
  }, [user, fetchAllUsers]);

  useEffect(() => {
    if (selectedUser) {
      fetchMessages(selectedUser.ClerkId);
    }
  }, [fetchMessages, selectedUser]);

  useEffect(()=>{
    if(scrollRef.current){
      scrollRef.current.scrollIntoView({behavior:"smooth"})
    }

  },[selectedUser,messages])
  return (
    <main className="h-full rounded-lg bg-gradient-to-b from-zinc-800 to-zinc-900 overflow-hidden">
      <TopBar/>
      <div className='grid 2xl:grid-cols-[250px_1fr] lg:grid-cols-[200px_1fr] grid-cols-[60px_1fr] h-[calc(100vh-180px)]'>
        <UsersList/>
        {/* chat div  */}
        <div className="flex flex-col h-full">
          {
            selectedUser ? (
              <>
              <ChatHeader/>
              {/* Message chat area  */}

              <ScrollArea className="h-[calc(100vh-340px)]">
                <div className="p-4 space-y-4">
                  {
                    messages.map((message)=>(
                      <div key={message._id}
                      className={`flex items-start gap-3 ${message.senderId === user?.id ? "flex-row-reverse" : ""}`}
                      >
                        <Avatar className="lg:size-7 2xl:size-9 size-6">
                          <AvatarImage src={`${message.senderId ===  user?.id ? user?.imageUrl : selectedUser.imageUrl}`}/>
                       
                        </Avatar>
                        <div className={`rounded-lg p-3 max-w-[70%] ${message.senderId === user?.id ? "bg-green-700" : "bg-zinc-800"}`}>
                          <p className="2xl:text-sm lg:text-xs text-[13px] break-words">{message.text}</p>
                          <span className="lg:text-[10px] 2xl:text-xs text-[10px] text-zinc-300 mt-1 block">{formatTime(message.createdAt)}</span>
                        </div>

                      </div>
                    ))
                  }
                  <div ref={scrollRef}></div>
                </div>
              </ScrollArea>
              <MessageInput/>
              </>
            ) : 
            (
              <NoConversationPlaceholder/>
            )

          }

        </div>
      </div>
    </main>
  );
};

export default ChatPage;

const NoConversationPlaceholder = () => (
	<div className='flex flex-col items-center justify-center h-full space-y-6'>
		<img src='/spotify.png' alt='Spotify' className='size-16 animate-bounce' />
		<div className='text-center'>
			<h3 className='text-zinc-300 text-lg font-medium mb-1'>No conversation selected</h3>
			<p className='text-zinc-500 text-sm'>Choose a friend to start chatting</p>
		</div>
	</div>
);
