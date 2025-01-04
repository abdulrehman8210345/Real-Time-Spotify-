import express from "express";
import dotenv from "dotenv"
import fileupload from "express-fileupload"
import path from "path"
import {clerkMiddleware} from "@clerk/express"
import userRoute from './routes/user.route.js'
import songRoute from './routes/song.route.js'
import albumRoute from './routes/album.route.js'
import statRoute from './routes/stat.route.js'
import adminRoute from './routes/admin.route.js'
import authRoute from './routes/auth.route.js'
import { connectDb } from "./lib/dbConnect.js";
import cors from "cors"
import cron from "node-cron";
import fs from "fs";
import { createServer } from "http";
import { socketServer } from "./lib/socket.js";


dotenv.config();
const app = express();
const PORT = process.env.PORT;
const __dirname = path.resolve();

const httpServer = createServer(app);
socketServer(httpServer);



app.use(express.json());
app.use(clerkMiddleware());

app.use(cors({
    origin : "http://localhost:3000",
    credentials : true
}))



app.use(fileupload({
    useTempFiles:true,
    tempFileDir:path.join(__dirname,"tmp"),
    createParentPath:true,
    limits:{
        fileSize:10*1024*1024
    }

}))

const tempDir = path.join(process.cwd(),"tmp");
cron.schedule("0 * * * *", () => {
	if (fs.existsSync(tempDir)) {
		fs.readdir(tempDir, (err, files) => {
			if (err) {
				console.log("error", err);
				return;
			}
			for (const file of files) {
				fs.unlink(path.join(tempDir, file), (err) => {});
			}
		});
	}
});

app.use("/api/user",userRoute);
app.use("/api/auth",authRoute);
app.use("/api/admin",adminRoute);
app.use("/api/stats",statRoute);
app.use("/api/albums",albumRoute);
app.use("/api/songs",songRoute);

if(process.env.ENVR_MODE === "production"){
    app.use(express.static(path.join(__dirname,"../frontend/dist")));
    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(__dirname,"../frontend/dist/index.html"))
    })
}




app.use((error,req,res,next)=>{
    res.status(500).json({message:process.env.ENVR_MODE === "development"? error.message : "Internal server error"});
})


httpServer.listen(PORT,()=>{
    console.log(`Server is running at ${PORT}` );
    connectDb();
})