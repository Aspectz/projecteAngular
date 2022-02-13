import { IComment } from "./i-comment";
import { IVote } from "./i-vote";

export interface IPost {
    id?:string,
    author:string,
    comments?:IComment[],
    community:string,
    file:string,
    title:string,
    votes?:IVote[],

}
