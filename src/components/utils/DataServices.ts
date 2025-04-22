
import { IUserCardType, IUserCreate, IUserInfo, UserProfileTypes} from "./Interface"

const url = "https://rideapi-egexbda9bpfgh6c9.westus-01.azurewebsites.net/"

// Account Creation
export const createAccount = async (user:IUserCreate) =>{
    const response = await fetch(url + "User/CreateUser", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body:JSON.stringify(user)
    })
    if(!response.ok)
        {
            const data = await response.json();
            const message = data.message;
            console.log(message);
            return data.success;
        }

    const data = await response.json();
    console.log(data);
    return data;
}
//Login
export const logIn = async (user: IUserInfo) =>{
    console.log(user)
    const response = await fetch(url + "User/Login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body:JSON.stringify(user)
    })
    if(!response.ok)
    {
        const data = await response.json();
        const message = data.message;
        console.log(message);
        
        return null;
    }

    const data = await response.json();
    return data;
}
//Reset Password
export const resetPassword = async (user:IUserCreate) => {
    try {
        const res = await fetch(url + "User/UpdatePassword", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        });

        if (!res.ok) {
            return false; 
        }
        const data = await res.json();
        return data;

    } catch (error) {
        
        console.error("Network error or server not reachable:", error);
    }
}   

export const UserProfileSetup = async (user: UserProfileTypes) => {
    
        console.log(user)
        const res = await fetch(url + "RideTables/AddUserProfile", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        });
        if(!res.ok)
        {
            console.log("Error");
            return null;
        };
        const data = await res.json();
        return data;
}
export const GetUserProfile = async(UserId:number) =>
{
    const res = await fetch(url + `RideTables/GetProfile/${UserId}`)
    const data = await res.json();
    return data;
}

// ---------------------------- User Data For Cards ----------------------------

export const getUserPostData = async (user: IUserCardType ) =>
{
    const res = await fetch(url + "RideTables/AddGalleryPost", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    });

    if(!res.ok)
    {
        console.log("Error");
        return null;
    };
    const data = await res.json();
    return data;
}