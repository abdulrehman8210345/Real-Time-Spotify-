import { create } from "zustand";
import { axiosInstance } from "@/lib/axios";
import { Message, User } from "@/types";
import { io } from "socket.io-client";

interface userStore {
  users: User[];
  isLoading: boolean;
  error: string | null;
  socket: any;
  isConnected: boolean;
  messages: Message[];
  onlineUsers: Set<string>;
  userActivities: Map<string, string>;
  selectedUser : User | null;

  fetchAllUsers: () => Promise<void>;
  initSocket: (userId: string) => void;
  disconnectSocket: () => void;
  sendMessage: (recieverId: string, senderId: string, text: string) => void;
  fetchMessages : (userId:string)=>Promise<void>;
  setSelectedUser : (user : User)=>void;
}

const BaseUrl = import.meta.env.MODE === "development" ? "http://localhost:5000/" : "/";

const socket = io(BaseUrl, {
  autoConnect: false,
  withCredentials: true,
});

export const useChatStore = create<userStore>((set, get) => ({
  users: [],
  isLoading: false,
  error: null,
  socket: socket,
  isConnected: false,
  messages: [],
  onlineUsers: new Set(),
  userActivities: new Map(),
  selectedUser:null,
  fetchAllUsers: async () => {
    set({ isLoading: true, error: null });

    try {
      const response = await axiosInstance.get("/user");
      set({ users: response.data });
    } catch (error: any) {
      set({ error: error.response.data.message });
    } finally {
      set({ isLoading: false });
    }
  },

  initSocket: (userId) => {
    if (!get().isConnected) {
        socket.auth = {userId}
      socket.connect();

      socket.emit("user_connected", userId);

      socket.on("users_online", (users: string[]) => {
        set({ onlineUsers: new Set(users) });
      });

      socket.on("activities", (activities: [string, string][]) => {
        set({ userActivities: new Map(activities) });
      });

      socket.on("user_connected",(userId:string)=>{
        set((state)=>({
            onlineUsers: new Set([...state.onlineUsers , userId])
        }))
      })

      socket.on("user_disconnected",(userId:string)=>{
        set((state)=>{
            const newOnlineUsers = new Set(state.onlineUsers);
            newOnlineUsers.delete(userId);
            return {onlineUsers : newOnlineUsers}
        })
      })

      socket.on("recieve_message",(message:Message)=>{
        set((state)=>({
            messages : [...state.messages,message]
        }))
      })

      socket.on("message_sent",(message:Message)=>{
        set((state)=>({
            messages : [...state.messages,message]
        }))
      })

      socket.on("activity_updated",({userId,activity})=>{
        set((state)=>{
            const newActivities = new Map(state.userActivities);
            newActivities.set(userId,activity);
            return {userActivities:newActivities}
        })
      })

      set({isConnected:true})



    }
  },
  sendMessage: (recieverId,senderId,text) => {
    if(!get().socket) return;

    socket.emit("send_message",{recieverId,senderId,text})
  },


  disconnectSocket: () => {
    if(get().isConnected){
        socket.disconnect();
        set({isConnected:false})
    }
  },

  fetchMessages : async (userId)=>{
    set({isLoading:true,error:null})

    try {
        const response = await axiosInstance.get(`/user/messages/${userId}`)
        set({messages:response.data})
        
    } catch (error:any) {
        set({error:error.response.data.message})

        
    }
    finally{
        set({isLoading:false})
    }
  },
  setSelectedUser : (user)=>{
    set({selectedUser:user})
  }
}));
