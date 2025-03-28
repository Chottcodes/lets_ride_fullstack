import { IUserData, IUserInfo} from "./Interface"

const url = "https://rideapi-egexbda9bpfgh6c9.westus-01.azurewebsites.net/"

// Account Creation
export const createAccount = async (user: IUserInfo) =>{
    console.log(JSON.stringify(user))
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
    return data.success;
}

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