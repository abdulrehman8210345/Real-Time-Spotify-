import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useChatStore } from "@/stores/useChatStore";
import { useUser } from "@clerk/clerk-react";
import { Send } from "lucide-react";
import { useState } from "react"

const MessageInput = () => {
    const [message, setmessage] = useState("");
    const {user} = useUser();
    const {selectedUser,sendMessage} = useChatStore();

    const handleSendMessage = ()=>{
        if(!user || !message || !selectedUser) return;
        sendMessage(selectedUser.ClerkId,user.id,message);
        setmessage("");
    }
  return (
    <div className="p-4 mt-auto border-t border-zinc-800">
        <div className="flex gap-2">
            <Input
            placeholder="Type a message"
            value={message}
            onChange={((e)=>setmessage(e.target.value))}
            onKeyDown={(e)=> e.key === "Enter" && handleSendMessage()}
            className='bg-zinc-800 border-none text-xs lg:text-lg'

            />
            <Button onClick={handleSendMessage} size={"icon"} disabled={!message.trim()}>
                <Send className="size-4"/>
            </Button>
        </div>
    </div>
  )
}

export default MessageInput