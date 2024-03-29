import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";

export class ApiError extends Error {
    statusCode : number;
    message : string;
    data : Object | null;

    constructor(statusCode: number = 500, message: string = "error has occurred" , data : Object | null = null) {
        super(message);
        this.statusCode = statusCode;
        this.message = message;
        this.data = data;
    }
}

export type loginType = {
    email : string
    password: string
}

export type User = {
    id?: number
    name: string
    email: string 
    password: string
    salt: string
    createdOn?: Date
    room?: Room[]
  }
  
export type Room = {
    id: number
    users?: User[]
}

interface RequestWithUserI extends Request{
    user? : JwtPayload | string;
}

export type RequestWithUser = RequestWithUserI