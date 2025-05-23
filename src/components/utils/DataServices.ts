import { AddGalleryPost, CommentsModelGallery,  InputField, IUserCreate, IUserInfo, LikesGalleryModel, LikesRoutesModel, RoutePostTypes, UserProfileTypes, AddVideoTypes, LikesVideoModel, CommentsModelVideo, UserProfileReturnTypes } from "./Interface"
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
       
          return false;
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
            const errorText = await res.text();
            console.log(errorText)
          
            return null;
        };
        const data = await res.json();
        return data;
}

export const EditUserProfile = async(user: UserProfileTypes) => {
    console.log("Attempting to edit profile with data:", JSON.stringify(user, null, 2));
    try {
        const res = await fetch(url + "RideTables/EditProfile",
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(user)
            }
        );
        
        if (!res.ok) {
            const errorText = await res.text();
            console.error(`EditUserProfile failed with status ${res.status}:`, errorText);
            return null;
        }
        
        const data = await res.json();
        console.log("EditUserProfile success response:", data);
        return data;
    } catch (error) {
        console.error("Network or fetch error in EditUserProfile:", error);
        return null;
    }
}

export const GetUserProfile = async(UserId:number) =>
{
    const res = await fetch(url + `RideTables/GetProfile/${UserId}`);
    const data = await res.json();
    console.log("GetUserProfile response:", data);
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
export const GetRoute = async (userId: number, page: number, pageSize: number) => {
    try {
        if (!userId || page < 1 || pageSize < 1) {
            console.error("Invalid parameters:", { userId, page, pageSize });
            return [];
        }

        const queryParams = new URLSearchParams({
            userId: userId.toString(),
            page: page.toString(),
            pageSize: pageSize.toString(),
        });

        const res = await fetch(`${url}RideTables/GetRoutes?${queryParams}`);

        if (!res.ok) {
            const errorText = await res.text();
            console.error(`GetRoute failed with status ${res.status}:`, errorText);
            return [];
        }

        const data = await res.json();
        return data;
    } catch (err) {
        console.error("Network or fetch error in GetRoute:", err);
        return [];
    }
};


export const GetProfileById = async (id:number) => {
    const res = await fetch(url + `RideTables/GetProfile/${id}`)
    const data = await res.json();
    return data;
}

// ------------------- Gallery Page ---------------------------------
export const GetGalleryPosts = async (userId: number, page:number, pageSize:number ) => {
  try {
    const res = await fetch(
      `${url}/RideTables/GetGallery/${userId}?page=${page}&pageSize=${pageSize}`
    );

    if (!res.ok) {
      console.error("Error fetching gallery posts");
      return null;
    }

    const data = await res.json();
    return data;
  } catch (err) {
    console.error("Network error in GetGalleryPosts:", err);
    return null;
  }
};
export const RemoveGalleryLike=async(userId:number,postId:number)=>{
    const res = await fetch(url + `RideTables/RemoveGalleryLike/${userId}/${postId}`,{
        method:"DELETE",
        headers: {
            "Content-Type": "application/json",
        }
    })
     if(!res.ok)
        {
            console.log("Error");
            return null;
        }
        const data = await res.json();
    return data
}

 export const addGalleryPost = async (galleryPost: AddGalleryPost) =>
 {
 
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
        }
        const data = await res.json();
        return data;
      } catch (err) {
        console.error("Network error:", err);
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
export const AddGalleryLike = async (Likes:LikesGalleryModel) => {
    
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
export const AddVideoLike = async (Likes:LikesVideoModel) => {
    
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
    
export const AddCommentRoute = async (comment: LikesRoutesModel) => {
  try {
    const response = await fetch(url + "RideTables/AddComment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(comment),
    });

    // Response returned but not OK (like 400 or 500)
    if (!response.ok) {
      const errorText = await response.text(); // Read the error body
      console.error(`Server responded with status ${response.status}:`, errorText);
      throw new Error(`Server error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    // Catch network errors, CORS issues, etc.
    console.error("Fetch failed:", error);
    throw new Error(`Fetch failed: ${(error as Error).message}`);
  }
};



export const AddCommentVideo=async (comment: CommentsModelVideo) => {
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
export const AddCommentGallery=async (comment:CommentsModelGallery) => {
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
export const GetGalleryComments=async(GalleryId:number)=>{
    const res = await fetch(url + `RideTables/GetGalleryComments/${GalleryId}`)
    if(!res.ok)
        {
            console.log("Error");
            return null;
        }
        const data = await res.json();
        return data;
}
export const GetVideoComments=async(VideoId:number)=>{
    const res = await fetch(url + `RideTables/GetVideoComments/${VideoId}`)
    if(!res.ok)
        {
            console.log("Error");
            return null;
        }
        const data = await res.json();
        return data;
}
export const AddVideo=async(input:AddVideoTypes)=>{
    const res = await fetch(url + "RideTables/AddVideo",{
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },body: JSON.stringify(input)
    });
    if(!res.ok)
        {
            console.log("Error");
            return null;
        }
        const data = await res.json();
        return data;
}
export const GetVideo = async (userId: number, page:number, pageSize:number) => {
  try {
    const res = await fetch(
      `${url}/RideTables/GetVideos/${userId}?page=${page}&pageSize=${pageSize}`
    );

    if (!res.ok) {
      console.log("Error fetching videos");
      return null;
    }

    const data = await res.json();
    return data;
  } catch (err) {
    console.error("Network error in GetVideo:", err);
    return null;
  }
};

export const RemoveRouteLike=async(userId:number,postId:number)=>
{

    const res = await fetch(url + `RideTables/RemoveRouteLike/${userId}/${postId}`,{
        method:"DELETE",
        headers: {
            "Content-Type": "application/json",
        }
    })
     if(!res.ok)
        {
            console.log("Error");
            return null;
        }
        const data = await res.json();
    return data
}

export const GetRouteComment = async(routeId:number)=>
{
    const res = await fetch(url + `RideTables/GetRouteComments/${routeId}`)
     if(!res.ok)
        {
            console.log("Error");
            return null;
        }
        const data = await res.json();
        return data
}


