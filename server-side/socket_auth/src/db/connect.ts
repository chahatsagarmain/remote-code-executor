// import {RedisClientType, createClient} from "redis";

// let client :  RedisClientType | null;

import { PrismaClient } from "@prisma/client";

class Connect {
    client : PrismaClient;

    constructor(){
        this.client = new PrismaClient();
        console.log("Client initialised")
    }

    getClient() : PrismaClient {
        return this.client;
    }
}

export const connectToDB = new Connect();

