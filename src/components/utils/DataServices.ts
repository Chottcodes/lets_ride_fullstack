
import { IUserCreate, IUserInfo} from "./Interface"

const url = "https://rideapi-egexbda9bpfgh6c9.westus-01.azurewebsites.net/"

// Account Creation
export const createAccount = async (user:IUserCreate) =>{
    console.log(JSON.stringify(user))
    console.log(user)

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