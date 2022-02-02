import { IPost } from "./i-post";

export interface ICommunity {
    name:string,
    posts?:IPost[]
}
