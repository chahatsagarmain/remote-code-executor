import { Request, Response, NextFunction } from "express";
import { ApiError, User, Room } from "../models/interfaces";
import { PrismaClient } from "@prisma/client";
import jwt, { JwtPayload } from "jsonwebtoken";
import { getUserIdJwt } from "../utils/helpers";

const prisma = new PrismaClient();

export async function generateRoom(req: Request, res: Response, next: NextFunction) {

    const token = req.cookies["jwt"];

    if (!token) return next(new ApiError(404, "No token found"));

    const decoded: string | JwtPayload | null = jwt.decode(token);

    if (!decoded) return next(new ApiError(404, "No token found"));

    let userId: string = "";

    if (typeof decoded === 'string') userId = JSON.parse(decoded).id;

    else userId = decoded.id;

    let user: User | null = await prisma.user.findFirst({
        where: {
            id: parseInt(userId)
        }
    });

    console.log(user);

    const newRoom: Room = await prisma.room.create({
        data: {
            users: {
                connect: [{ id: parseInt(userId) }]
            }
        },
        include: {
            users: true
        }
    });

    return res.status(200).json({
        message: "Room created",
        roomId: newRoom.id,
        room: newRoom
    })

}


export async function getRoom(req: Request, res: Response, next: NextFunction) {

    const roomId : string = req.params.roomId;

    if (!roomId) return next(new ApiError(404, "no room Id specified"));

    const room: Room | null = await prisma.room.findFirst({
        where: {
            id: parseInt(roomId)
        },
        include: {
            users: true
        }
    });

    return res.status(200).json({
        room: room
    });
}

export async function getRoomUtil(roomId : string) : Promise<Room | null> {
    const room: Room | null = await prisma.room.findFirst({
        where: {
            id: parseInt(roomId)
        }
    });

    if(!room){
        return null;
    }

    return room;
}

export async function addToRoom(req: Request, res: Response, next: NextFunction) {

    const roomId : string | null = req.body.roomId;

    if (!roomId) return next(new ApiError(404, "no room Id specified"));

    let userId: string | null = req.body.userId;

    if (!userId) {
        try {
            userId = getUserIdJwt(req);
        }
        catch (error: any) {
            return next(new ApiError(error.statusCode, error.message));
        }
    }

    const room: Room | null = await prisma.room.findFirst({
        where: {
            id: parseInt(roomId)
        }
    });

    if (!room) return next(new ApiError(404, "No room with room Id"));

    const user : User | null = await prisma.user.findFirst({
        where : {
            id : parseInt(userId)
        }
    });

    if(!user) return next(new ApiError(404 , "USER NOT FOUND"));

    try {
        const updatedRoom : Room = await prisma.room.update({
            where: {
                id: parseInt(roomId)
            },
            data: {
                users: {
                    connect: [{ id: parseInt(userId) }]
                }
            },
            include: {
                users: true
            }

        });
        return res.status(200).json({
            message : "room updated",
            room : updatedRoom       
        })
    }
    catch (error: any) {
        console.log(error);
        return next(new ApiError(500, "error while updating"));
    }

}

export async function leaveRoom(req : Request , res : Response , next : NextFunction){
    
    try{
        const userId : string = getUserIdJwt(req);

        const roomId : string | null = req.body.roomId;

        if(!roomId) return next(new ApiError(404 , "no room Id provided"));

        const updatedRoom : Room = await prisma.room.update({
            where : {
                id : parseInt(roomId)
            },
            data : {
                users : {
                    disconnect : [{ id : parseInt(userId)}]
                }
            },
            include : {
                users : true
            }
        });

        return res.status(200).json({
            message : "You left the room",
            room : updatedRoom
        });
    }
    catch(error : any){
        return next(new ApiError(error.statusCode , error.message));
    }
}

export async function leaveRoomById(userId : string,roomId : string) : Promise<boolean> { 
    try{
        const updatedRoom : Room = await prisma.room.update({
            where : {
                id : parseInt(roomId)
            },
            data : {
                users : {
                    disconnect : [{ id : parseInt(userId)}]
                }
            },
            include : {
                users : true
            }
        });
    }
    catch(error){
        return false;
    }

    return false;
};

export async function addToRoomById(userId : string , roomId : string) : Promise<boolean> {
    try{
        console.log(roomId);
        console.log(userId)
        const room: Room | null = await prisma.room.findFirst({
            where: {
                id: parseInt(roomId)
            }
        });
        console.log(room)
        if(!room) return false;
        

        const updatedRoom : Room = await prisma.room.update({
            where: {
                id: parseInt(roomId)
            },
            data: {
                users: {
                    connect: [{ id: parseInt(userId) }]
                }
            },
            include: {
                users: true
            }

        });
        console.log(updatedRoom)
    }
    catch(error){
        console.log(error);
        return false;
    }

    return true;
}