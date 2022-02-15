export interface IVote {
    user:string,
    type:string
}

export interface IGeneralVotes{
    votes:IVote[],
    totalVotes:number
}
