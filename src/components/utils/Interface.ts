// Login Fetch
export interface IUserCreate
{
    Email:string
    Password:string
    Question:string
    Answer:string
}
export interface IUserInfo
{
    email: string
    password: string
}



// User Data 
export interface IUserData
{
    id: number
    username: string
}

// Token
export interface IToken
{
    token: string
}