import { Request, Response, NextFunction } from "express";
import { ApiError, User } from "../models/interfaces";
import { PrismaClient } from "@prisma/client";
import { PrismaClientInitializationError } from "@prisma/client/runtime/library";
import bcrypt from "bcrypt";

export async function createUser(req: Request, res: Response, next: NextFunction) {
    try {
        const data: User | null = req.body.data;
        console.log(data);
        if (!data) {
            return next(new ApiError(404, "missing data", null));
        }
        const prisma: PrismaClient = new PrismaClient();
        const user_found : User | null = await prisma.user.findFirst({
            where : {
                email : data.email
            }
        })

        if(user_found) return res.status(200).json({
            "message" : "user already exists"
        })

        const hashedPassword: string = "hashed";

        const user: User = await prisma.user.create({
            data: {
                name: data.name,
                email: data.email,
                salt: data.salt,
                password: hashedPassword,
                room: { create: [] }
            }
        });

        console.log(user);
        console.log(typeof PrismaClientInitializationError)
        return res.status(200).json({
            "data": user,
            "message": "user created"
        })
    }
    catch (error: any) {
        if (typeof error == typeof PrismaClientInitializationError) {
            console.log("Prisma initalized error");
            return next(new ApiError(500, "prisma error", null));
        }
        else {
            console.log(error);
            return next(new ApiError(500, "server side error", null));
        }
    }

}