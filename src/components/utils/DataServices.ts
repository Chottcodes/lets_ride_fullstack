import { AddGalleryPost, CommentsModelRoute, InputField, IUserCardType, IUserCreate, IUserInfo, LikesRoutesModel, RoutePostTypes, UserProfileTypes} from "./Interface"
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
    console.log(data)
    return data;
}
export const GetProfileById = async (id:number) => {
    const res = await fetch(url + `RideTables/GetProfile/${id}`)
    const data = await res.json();
    return data;
}

// ------------------- Gallery Page ---------------------------------
export const getGalleryPosts = async () => {
    try {
      const res = await fetch(url + "RideTables/GetGallery");
      if (!res.ok) {
        const errText = await res.text();
        console.error("Fetch failed:", res.status, errText);
        return null;
      }
  
      const data = await res.json();
      return data;
    } catch (err) {
      console.error("Network error:", err);
      return null;
    }
  };

 export const addGalleryPost = async (galleryPost: AddGalleryPost) =>
 {
    console.log(galleryPost)
    try {
        const res = await fetch(url + "RideTables/AddGalleryPost", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(galleryPost)
        });

        if (!res.ok) {
          const errText = await res.json();
          console.error("Fetch failed:", res.status, errText);
          return null;
        }
    
        const data = await res.json();
        return data;
      } catch (err) {
        console.error("Network error:", err);
        return null;
      }
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
export const AddLike = async (Likes:LikesRoutesModel) => {
    
        const res = await fetch(url + "RideTables/AddLike", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(Likes)
        });

        if(!res.ok)
        {
            console.log("Error");
            return null;
        }
        const data = await res.json();
        return data;
    }
export const AddCommentRoute=async (comment:CommentsModelRoute) => {
    const res = await fetch(url + "RideTables/AddComment",{
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },body: JSON.stringify(comment)
    });
    if(!res.ok)
        {
            console.log("Error");
            return null;
        }
        const data = await res.json();
        return data;

}
