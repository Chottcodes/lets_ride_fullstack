// Login Fetch
export interface IUserCreate
{
    Email:string
    Password:string
    Question:string
    Answer:string
}
export interface IUserCardType {
    id: number;
    creatorId: number;
    creator: {
    profilePicture: string;
    userName: string;
    };
    imageUrl: string;
    title: string;
    description: string;
    dateCreated: string;
    isDeleted: boolean;
    likes: LikeModel[];
    comments: CommentModel[];
  }
  export interface LikeModel {
    userId: number;
  }
  export interface CommentModel {
    userId: number;
    text: string;
    createdAt: string;
  }
  export interface InputField {
    creatorId: number;
    imageUrl: string | null;
    title: string;
    description: string;
    IsDeleted: boolean
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
export interface RoutePostTypes {
    CreatorId:number,
    RouteName:string
    RouteDescription:string
    ImageUrl:string
    CityName:string
    IsPrivate:boolean
    IsDeleted:boolean
    PathCoordinates:Coordinates[]
}
export interface Coordinates {
    latitude: number;
    longitude: number;
  }
  export interface RouteGetTypes {
    id: number;
    routeName: string;
    routeDescription: string;
    imageUrl: string;
    cityName: string;
    isPrivate: boolean;
    isDeleted: boolean;
    pathCoordinates: Coordinates[];
    dateCreated: string;
  }
  export interface Coordinates {
    latitude: number;
    longitude: number;
  }
    export interface RouteGetForCardTypes {
        id: number;
        routeName: string;
        creator:UserProfile
        routeDescription: string;
        imageUrl: string;
        cityName: string;
        isPrivate: boolean;
        isDeleted: boolean;
        pathCoordinates: Coordinates[];
        likes: Likes[];
        comments:comments[]

        dateCreated: string;
    }
    export interface Likes{
      routeId:number
      userId:number
      isDeleted:boolean
      createdAt:string
    }
   interface comments{
        commentText?: string;
        createdAt?: string;
        user: {
          userName: string;
          profilePicture: string;
        };
      }
      
    interface UserProfile {
        id: number;
        userId: number;
        userName: string;
        name: string;
        location: string;
        bikeType: string;
        ridingExperience: string;
        ridingPreference: string;
        rideConsistency: string;
        profilePicture: string;
      }
      export interface LikesRoutesModel{
        UserId:number
        RouteId:number
        IsDeleted:boolean
      }
      export interface LikesGalleryModel{
        UserId:number
        GalleryPostId:number
        IsDeleted:boolean
      }
      export interface LikesVideoModel{
        UserId:number
        VideoId:number
        IsDeleted:boolean
      }

      export interface AddGalleryPost
      {
        ImageUrl: string;
        CreatorId:number;
        Title: string;
        Description: string;
        IsDeleted: boolean;
      }
      export interface CommentsModelRoute
      {
        UserId:number;
        RouteId:number;
        CommentText:string;
        IsDeleted:boolean;
       
      }
      export interface CommentsModelGallery
      {
        UserId:number;
        GalleryPostId:number;
        CommentText:string;
        IsDeleted:boolean;
      }
      export interface CommentsModelVideo
      {
        UserId:number;
        VideoId:number;
        CommentText:string;
        IsDeleted:boolean;
      }
     export interface GalleryComments{
        commentText?: string;
        dateCreated?: string;
        profilePictureUrl?: string;
        username:string;
      }
      export interface AddVideoTypes{
        CreatorId:number;
        VideoUrl:string;
        Title:string;
        IsDeleted:boolean;
      }
      export interface VideoGet{
        id:number
        creator:UserProfile;
        videoUrl:string;
        title:string;
        isDeleted:boolean;
        createdAt:string
        likes:Likes[];
        comments:comments[]
      }
   export interface Coordinate {
  latitude: number;
  longitude: number;
}

export interface GetRoutes {
  id: number;
  title: string;
  isPrivate: boolean;
  creatorName: string;
  likeCount:number;
  isLikedByCurrentUser:boolean;
  profilePicture: string | null;
  dateCreated: string; 
  routeDescription: string | null;
  commentCount:number;
  pathCoordinates: Coordinate[];
}
export interface RouteComment {
  commentText: string;
  username: string;
  profilePictureUrl: string;
  dateCreated: string | Date;
}
