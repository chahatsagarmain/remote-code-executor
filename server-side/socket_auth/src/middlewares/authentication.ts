import { NextFunction , Response , Request} from "express";
import { RequestWithUser } from "../models/interfaces";
import jwt, { JwtPayload } from "jsonwebtoken";

export async function authenticationMiddleware(req : RequestWithUser , res : Response , next : NextFunction){
    try{
        const token = req.cookies["jwt"];

    if(!token){
        return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }

    const decoded : string | JwtPayload = jwt.verify(token , process.env.JWT_SECRET || "");

    req.user = decoded;

    next();

    }
    catch(error : any){
        return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }

}