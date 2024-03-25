import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import dotenv from "dotenv";
import errorMiddleware from "./middlewares/errorMiddleware";
import router from "./routes/router";
// import { connectToDb } from "./db/connect";
import cookieParser from "cookie-parser";

dotenv.config({
    path: ".env",
});


const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {});

io.of("/room").on("connection", (socket) => {
    //Accessing differently because not getting right url due to different apis on same server

    const room = socket.request.headers.room;

    socket.on("join", (data) => {
        console.log("in join");

        console.log(`${socket.id} has joined ${room}`);
        socket.join(`${room}`);
        socket.emit("joined", "user joined");
    });

    socket.on("code" , (data) => {
        socket.to(`${room}`).emit("update" , data);
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



