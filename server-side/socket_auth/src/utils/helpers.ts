
import bcrypt from "bcrypt";

const saltRounds = 10;

export async function hasher(password: string): Promise<string[]> {

    const salt : string = await bcrypt.genSalt(saltRounds);
    const hashedPassword : string = await bcrypt.hash(password , salt);
    
    return [hashedPassword , salt];
}

export async function comparePassword(password : string , hashedPassword : string) : Promise<boolean>{

    return bcrypt.compare(password , hashedPassword);
}


