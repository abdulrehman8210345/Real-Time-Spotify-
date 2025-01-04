import {Server} from "socket.io"
import { Message } from "../models/message.model.js";

export const socketServer = (server)=>{
    const io = new Server(server,{
        cors :{
            origin:"http://localhost:3000",
            credentials:true
        }
    })

    const userSockets = new Map(); //{userId : socketId}
    const userActivities = new Map(); //{userId : activitiy}

    io.on("connection",(socket)=>{

        socket.on("user_connected",(userId)=>{
            userSockets.set(userId,socket.id);
            userActivities.set(userId,"Idle");

            // broadcast/tell all the users that particular user connected

            io.emit("user_connected",userId);

            socket.emit("users_online",Array.from(userSockets.keys()));

            io.emit("activities",Array.from(userActivities.entries()));
        })

        socket.on("update_activity",({userId,activity})=>{
            userActivities.set(userId,activity);
            io.emit("activity_updated",{userId,activity})
        })

        socket.on("send_message",async(data)=>{
            try {
                const {senderId,recieverId,text} = data;
                const message = await Message.create({
                    senderId,recieverId,text
                })

                const recieverSocketId = userSockets.get(recieverId);
                if(recieverSocketId){
                    io.to(recieverSocketId).emit("recieve_message",message)
                }
                
                socket.emit("message_sent",message);
            } catch (error) {
                console.log("Message sending failed",error.message);
                socket.emit("message_error",error.message)
                
            }
           
        })

        socket.on("disconnect",()=>{
            let disconnectedUserId;
            for(const [userId,socketId] of userSockets.entries()){
                if(socketId === socket.id){
                    disconnectedUserId = userId;
                    userSockets.delete(userId);
                    userActivities.delete(userId);
                    break;
                }
            }
            if(disconnectedUserId){
            io.emit("user_disconnected",disconnectedUserId);    
            }
        })
    })

}