// import {RedisClientType, createClient} from "redis";

// let client :  RedisClientType | null;

// import { PrismaClient } from "@prisma/client";

// const prisma : PrismaClient = new PrismaClient();

// export async function connectToDb() : Promise<RedisClientType>{
//     client = await createClient();

//     try{
//         await client.connect();
//         console.log("connected");
//     }
//     catch(error : any){
//         console.log(`Error occured while connecting ` , error);
//     }
//     return client;

// }

// export function getClient() : RedisClientType{
//     if(!client){
//         throw new Error("Client connection error")
//     }
//     return client;
// }

// export async function connectToDb(){
//     try{
//         await 
//     }
//     catch(error : any){
//         console.log(error);
//         return null;
//     }
// }