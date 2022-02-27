import { ICommunity } from "./i-community";

export interface IUserFirebaseAuth {
    email:string,
    password?:string,
}

export interface IUserBD{
    nickname:string,
    communities?:string[],
    id?:string;
}
