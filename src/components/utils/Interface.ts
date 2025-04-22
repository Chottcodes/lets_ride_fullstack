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
export interface CreateUserReturnOBJ
{
    result:{
        id:number;
        token:string;
    }
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
    result:{
        id:number;
        token:string;
    }

}
export interface UserProfileTypes {
    UserName:string
    UserId:number
    Name:string
    Location:string
    BikeType:string
    RidingExperience:string
    RidingPreference:string
    RideConsistency:string
    ProfilePicture:string
}
export interface UserProfileReturnTypes {
    userName:string
    name:string
    location:string
    bikeType:string
    ridingExperience:string
    ridingPreference:string
    rideConsistency:string
    profilePicture:string
}