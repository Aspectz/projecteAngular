import { IComment } from "./i-comment";

export interface IPost {
    id:string,
    author:string,
    comments?:IComment[],
    community:string,
    file:string,
    title:string,
    upvotes:number,

}
