import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import dotenv from "dotenv";
import errorMiddleware from "./middlewares/errorMiddleware";
import router from "./routes/router";
import { addToRoomById , leaveRoomById} from "./controllers/room.controller";
import { connectToDB } from "./db/connect";
import cookieParser from "cookie-parser";

dotenv.config({
    path: ".env",
});


const client = connectToDB.getClient();

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

io.of("/room").on("connection", (socket) => {
    //Accessing differently because not getting right url due to different apis on same server
    console.log(`${socket.id} connected!`)
    const room = socket.request.headers.room;
    const userId = socket.request.headers.user;

    console.log(userId);

    if(!room && !userId){
        socket.emit("error","Unauthorized access");
        socket.disconnect(true);
    }

    socket.on("join", async (data) => {
        console.log("in join");
        const joined = await addToRoomById(userId as string, room as string)
        if(!joined){
            socket.emit("error","Cant join room");
            socket.disconnect(true);
        }
        socket.join(room as string);
        console.log(`${socket.id} has joined ${room}`);
        socket.emit("joined", "user joined");
    });

    socket.on("code" , (data) => {
        socket.to(room as string).emit("update" , data);
    }); 

    socket.on("disconnect" , async (data) => {
        const left = await leaveRoomById(userId as string , room as string);
        if (!left){
            socket.emit("error","Cant leave room");
            socket.disconnect(true);
       }
        socket.leave(room as string);
        socket.disconnect();
    });
});

app.use(cookieParser())

app.use(express.json())

app.use("/api/v1/", router);

app.use(errorMiddleware);

const PORT: number = Number.parseInt(process.env.PORT || "3000");
const HOST: string = process.env.HOST || "127.0.0.1";

httpServer.listen(PORT, HOST, async () => {
    try {
        console.log(`server listening on ${HOST} ${PORT}`);
    } catch (error) {
        console.log("Couldn't connect", error);
    }
});



