import { Request, Response, NextFunction } from "express";
import { ApiError, User, loginType , RequestWithUser } from "../models/interfaces";
import { PrismaClient } from "@prisma/client";
import { PrismaClientInitializationError } from "@prisma/client/runtime/library";
import { hasher , comparePassword } from "../utils/helpers";
import jwt from "jsonwebtoken";


const prisma = new PrismaClient();


export async function createUser(req: Request, res: Response, next: NextFunction) {
    try {
        const data: User | null = req.body.data;

        if (!data) {
            return next(new ApiError(404, "missing data", null));
        }

        const user_found : User | null = await prisma.user.findFirst({
            where : {
                email : data.email
            }
        })

        if(user_found) return res.status(200).json({
            "message" : "user already exists with email"
        })

        const hash: string[] = await hasher(data.password);
        const hashedPassword : string = hash[0];
        const salt : string = hash[1];

        const user: User = await prisma.user.create({
            data: {
                name: data.name,
                email: data.email,
                salt: salt,
                password: hashedPassword,
                room: { create: [] }
            }
        });

        console.log(user);

        return res.status(200).json({
            "data": {...user , salt : ""},
            "message": "user created"
        })
    }
    catch (error: any) {
        if (error instanceof PrismaClientInitializationError) {
            console.log("Prisma initalized error");
            return next(new ApiError(500, "prisma error", null));
        }
        else {
            console.log(error);
            return next(new ApiError(500, "server side error", null));
        }
    }

}

export async function getUser(req : Request , res : Response , next : NextFunction){
    try{
        let query : string | null | number = req.query.id as string;

        if(!query){
            return next(new ApiError(404 , "missing id query params" , null));
        }

        query = parseInt(query);

        const user_found : User | null = await prisma.user.findFirst({
            where : {
                id : query
            }
        });

        console.log(user_found);

        if(!user_found) return res.status(200).json({
            "message" : "user not found"
        });

        return res.status(200).json({
            "message" : "user found",
            "data" : {...user_found , salt : "" , password : ""}
        });
    }
    catch(error : any){
        console.log(error);
        return next(new ApiError(500 , error , null));
    }
}

export async function login(req : Request , res : Response , next : NextFunction){
    try{
        const data : loginType = req.body.data;

        if(!data) return next(new ApiError(404 , "missing data" , null));

        const password : string = data.password;

        if(!password) return next(new ApiError(404 , "missing password" , null));

        const user : User | null = await prisma.user.findFirst({
            where : {
                email : data.email
            }
        });

        if(!user) return next(new ApiError(404 , "user not found this email" , null));

        const hashedPassword : string = user.password;

        if(!(await comparePassword(data.password , hashedPassword))){
            return res.status(401).json({
                "message" : "Password is wrong"
            });
        }

        const token = jwt.sign({
            "id" : user.id,
            "email" : user.email,
            "roleId" : 0
        }, process.env.JWT_SECRET || "secret", {
            "expiresIn" : 60 *  60 * 60
        });

        res.cookie("jwt" , token , {maxAge : 60 * 60 * 60 * 1000});

        return res.status(200).json({
            "message" : "User logged in",
            "data" : {...user , salt : "" , password : ""}
        });
        

    }
    catch(error : any){

    }
}

export async function register(req : Request , res : Response , next : NextFunction){
    try{
        const data : User | null = req.body.data;

        if(!data) return next(new ApiError(404 , "missing user data" , null));

        const userFound : User | null = await prisma.user.findFirst({
            where : {
                email : data.email
            }
        });

        if(userFound) return res.status(401).json({
            "message" : "email already exists"
        });

        const hash : string[] = await hasher(data.password);

        const hashedPassword : string = hash[0];
        const salt : string = hash[1];

        const user : User = await prisma.user.create({
            data : {
                name: data.name,
                email: data.email,
                salt: salt,
                password: hashedPassword,
                room: { create: [] }
            }
        });

        const token = jwt.sign({
            "id" : user.id,
            "email" : user.email,
            "roleId" : 0
        }, process.env.JWT_SECRET || "secret", {
            "expiresIn" : 60 *  60 * 60
        });

        res.cookie("jwt" , token , {maxAge : 60 * 60 * 60 * 1000});

        return res.status(200).json({
            "message" : "User registered",
            "data" : {...user , salt : "" , password : ""}
        });

    }
    catch(error : any){
        return next(new ApiError(500 , error  , null));
    }
}

export async function authenticatedRoute(req : RequestWithUser , res : Response , next : NextFunction){

    return res.status(200).json({
        "data" : req.user
    });
}

export async function logout(req : RequestWithUser , res : Response , next : NextFunction){
    try{
        res.clearCookie("jwt");

        return res.status(200).json({
            "message" : "Your Logged out"
        });

    }
    catch(error : any){
        return next(new ApiError(500 , error , null));
    }
}