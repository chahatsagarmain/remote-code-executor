
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
    users: User[]
  }