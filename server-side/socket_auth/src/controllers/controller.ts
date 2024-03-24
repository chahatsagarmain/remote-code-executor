// import { Request, Response, NextFunction } from 'express';
// import ApiError from "../models/interfaces";
// import { connectToDb } from "../db/connect";

// //Storing the room data and user data in stateless manner , here we have utilised redis's hash map data strucutre to store the users in a unique room Id

// export async function createRoom(req: Request, res: Response, next: NextFunction) {
//     try {
//         const client = await connectToDb();
//         const userId : string | null = req.body.userId;
//         if(!userId){
//             return next(new ApiError(404 , "missing userId" , null));
//         } 

//         const roomId = id_generator();

//         if(await client.hGet("rooms",roomId)){
//             return res.status(200).json({
//                 message : "room already exists",
//                 roomId  : roomId
//             })
//         }

//         await client.hSet("rooms",roomId,`${userId}`);

//         return res.status(200).json({
//             message: "done",
//             roomId : roomId
//         });
//     }
//     catch (error: any) {
//         console.log(error)
//         return next(new ApiError(500));
//     }
// }

// export async function createUser(req: Request, res: Response, next: NextFunction) {

//     try {
//         console.log(req.body);

//         const userName: string | null = req.body.userName;
//         if (!userName || userName.length == 0) {
//             return next(new ApiError(401, "userName not found", null));
//         }

//         const userId : string = userIdGenerator(userName);
//         console.log(userId);
//         return res.status(200).json({
//             "message": "User created",
//             "userId": userId
//         })
//     }
//     catch (error) {
//         return next(new ApiError(500 , "error" , null));
//     }
// }

// export async function getRoom(req : Request , res : Response , next : NextFunction){
//     try {
//         const roomId : string | null = req.body.roomId;
//         console.log(roomId);
//         if(!roomId){
//             return next(new ApiError(404 , "roomId not found" , null));
//         }
//         const client = await connectToDb();
//         const room : string | undefined = await client.hGet("rooms",`${roomId}`);

//         if(!room){
//             return res.status(404).json({
//                 message : "room not found",
//                 room : null
//             });
//         }

//         return res.status(200).json({
//             message : "room found",
//             room : room
//         })
//     }
//     catch(error){

//     }
// }

// export async function addToRoom(req : Request , res : Response , next : NextFunction){
//     try {
//         const roomId : string | null = req.body.roomId;
//         const userId : string | null = req.body.userId;
        
//         if(!roomId || !userId){
//             return next(new ApiError(404 , "No room id or user id" , null));
//         }
//         const client = await connectToDb();
//         const room : string | undefined = await client.hGet("rooms",roomId);
//         if(!room){
//             return next(new ApiError(404 , "No room found" , null));
//         } 
//         const users : string[] = room.split(",");
        
//         if(users.includes(userId)){
//             return res.status(200).json({
//                 "message" : "user already exists"
//             });
//         }

//         users.push(userId);

//         const newRoom : string = users.join(",");
//         console.log(newRoom);
//         await client.hSet("rooms",roomId,newRoom);

//         return res.status(200).json({
//             message : "user added",
//             room : newRoom    
//         })
//     }
//     catch(error : any){
//         return next(new ApiError(500 , "error" , error))
//     }
// }

// export async function removeFromRoom(req : Request , res : Response , next : NextFunction){
//     try{
//         const roomId : string | null = req.body.roomId;
//         const userId : string | null = req.body.userId;

//         if(!roomId || !userId){
//             return next(new ApiError(404 , "missing roomId or userId" ));
//         }

//         const client  = await connectToDb();
//         const roomFound : string | undefined = await client.hGet("rooms",roomId); 

//         if(!roomFound){
//             return next(new ApiError(404 , "room Not found" , null));
//         }

//         let roomUsers : string[] = roomFound.split(",");
//         roomUsers = roomUsers.filter((value , index) => {
//             if(value !== userId) return true;
//         });

//         await client.hSet("rooms",roomId,roomUsers.join(","));

//         return res.status(200).json({
//             message : "removed user",
//             room : roomUsers
//         });

//     }  
//     catch(error : any){
//         return next(new ApiError(500 , "Server error" , error));
//     }
// }

// const id_generator = () => {
//     return Date.now().toString(16) + Math.random().toString(16);
// }

// const userIdGenerator = (userName: string) => {
//     return userName + Math.random().toString(16);
// }