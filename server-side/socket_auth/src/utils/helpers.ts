
import bcrypt from "bcrypt";
import jwt, { JwtPayload } from "jsonwebtoken";
import { Request } from "express";
import { ApiError } from "../models/interfaces";

const saltRounds = 10;

export async function hasher(password: string): Promise<string[]> {

    const salt : string = await bcrypt.genSalt(saltRounds);
    const hashedPassword : string = await bcrypt.hash(password , salt);
    
    return [hashedPassword , salt];
}

export async function comparePassword(password : string , hashedPassword : string) : Promise<boolean>{

    return bcrypt.compare(password , hashedPassword);
}


export function getUserIdJwt(req : Request) : string {

    const token = req.cookies["jwt"];

    if(!token) throw new ApiError(401 , "token missing");

    const decoded : string | JwtPayload | null = jwt.decode(token);

    if(!decoded) throw new ApiError(500 , "error wile decoding");

    let userId : string ;

    if(typeof decoded === 'string'){
        userId = JSON.parse(decoded).id;
    } 
    else{
        userId = decoded.id;
    }

    return userId;
}