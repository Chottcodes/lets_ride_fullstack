import { InputField, IUserCardType, IUserCreate, IUserInfo, RoutePostTypes, UserProfileTypes} from "./Interface"
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
export const PostRoute = async (route:RoutePostTypes ) => {
   console.log(route)
    const res = await fetch(url + "RideTables/AddRoute", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(route)
    });
    if (!res.ok) {
        console.log("Error");
        return null;
    };
    const data = await res.json();
    return data;
}
export const GetRoute = async () => {
    const res = await fetch(url + `RideTables/GetRoutes`)
    const data = await res.json();
    return data;
}
export const GetProfileById = async (id:number) => {
    const res = await fetch(url + `RideTables/GetProfile/${id}`)
    const data = await res.json();
    return data;
}
export const getGalleryPosts = async () =>
    {
        const res = await fetch(url + "RideTables/GetGalleryPosts")
        if(!res.ok)
        {
            console.log("Error");
            return null;
        };
        const data = await res.json();
        return data;
    }
    export const getUserPostData = async (user: InputField ) =>
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