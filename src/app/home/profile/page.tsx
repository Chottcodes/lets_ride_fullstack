"use client";
import React, { useEffect, useState } from "react";

import PrimaryButton from "@/components/buttons/PrimaryButton";
import ProfileDisplay from "@/components/ProfileDisplay";
import ProfileWithDescription from "@/components/ProfileWithDescription";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  AddCommentRoute,
  AddLike,
  GetRoute,
  GetUserProfile,
} from "@/components/utils/DataServices";
import {
  CommentsModelRoute,
  LikesRoutesModel,
  RouteGetForCardTypes,
  UserProfileReturnTypes,
} from "@/components/utils/Interface";
import UserRoutesCard from "@/components/ui/UserRoutesCard";
import { GetLocalStorageId } from "@/components/utils/helperFunctions";

const ProfilePage = () => {
  const { push } = useRouter();

  const [name, setName] = useState<string>("");
  const [username, setUserName] = useState<string>("");
  const [profilePicture, setProfilePicture] = useState<string>("");
  const [bikeType, setBikeType] = useState<string>("");
  const [ridingFrequency, setRidingFrequency] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [ridePreference, setRidePreference] = useState<string>("");
  const [experienceLevel, setExperienceLevel] = useState<string>("");
  
  const [userId, setUserId] = useState<number>(0);
  const [isPost, setIsPost] = useState<boolean>(false);
  const [isLikes, setIsLikes] = useState<boolean>(false);
  const [isProfile, setIsProfile] = useState<boolean>(true);

  const [likedRoutes, setLikedRoutes] = useState<Set<number>>(new Set());

  const [userRoutes, setUserRoutes] = useState<RouteGetForCardTypes[]>([]);

  useEffect(() => {
    const getInfo = GetLocalStorageId();
    const fetchData = async () => {
      if (getInfo) {
        setUserId(getInfo);
        const id = getInfo;
        const getData = await GetUserProfile(id);
        const {
          bikeType,
          location,
          profilePicture,
          rideConsistency,
          ridingExperience,
          ridingPreference,
          userName,
          name,
        }: UserProfileReturnTypes = getData;
        setBikeType(bikeType);
        setLocation(location);
        setProfilePicture(profilePicture);
        setRidingFrequency(rideConsistency);
        setExperienceLevel(ridingExperience);
        setRidePreference(ridingPreference);
        setUserName(userName);
        setName(name);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (isProfile === true) {
      const getUsersRoutes = async () => {
        try {
          const res = await GetRoute();
          console.log(res);
          setUserRoutes(res);

          const likedByUser = new Set<number>();
          res.forEach((route: RouteGetForCardTypes) => {
            route.likes.forEach((like) => {
              if (like.userId === userId && !like.isDeleted) {
                likedByUser.add(route.id);
              }
            });
          });
          setLikedRoutes(likedByUser);
        } catch (error) {
          console.error("Error fetching routes:", error);
        }
      };
      getUsersRoutes();
    }
  }, [isProfile, userId]);

  const handleLogOut = () => {
    localStorage.setItem("Token", "");
    localStorage.setItem("ID", "");
    push("/pages/Login/loginPage");
  };

  const LikeRoute = async (routeId: number) => {
    const likeObj: LikesRoutesModel = {
      UserId: userId,
      RouteId: routeId,
      IsDeleted: false,
    };
    const response = await AddLike(likeObj);
    if (response) {
      console.log("Like added successfully");
    } else {
      console.error("Error adding like");
    }
  };

  const handleLikes = (routeId: number) => {
    LikeRoute(routeId);
    setLikedRoutes((prev) => new Set(prev).add(routeId));
  };

  return (
    <div className="h-[100dvh] w-full relative">
      <header className="absolute w-full h-[10%] flex justify-between items-center lg:hidden">
        <button onClick={handleLogOut} className="pl-5 text-white">
          Log Out
        </button>
        <button className="pr-5 h-[45px] w-[45px] ">
          <Image
            src={"/assets/images/edit.png"}
            width={900}
            height={900}
            alt="Edit Icon"
          />
        </button>
      </header>
      <section className="h-[25%] w-full ">
        <ProfileWithDescription
          ProfilePicture={profilePicture}
          Name={name}
          Username={username}
          Location={location}
        />
      </section>
      <nav className="w-full h-15 flex justify-evenly items-center m-auto text-white">
        <button
          onClick={() => {
            setIsProfile(true);
            setIsPost(false);
            setIsLikes(false);
          }}
          className={`${
            isProfile ? "text-blue-700" : "text-white"
          } cursor-pointer`}
        >
          Profile
        </button>
        <button
          onClick={() => {
            setIsProfile(false);
            setIsPost(true);
            setIsLikes(false);
          }}
          className={`${
            isPost ? "text-blue-700" : "text-white"
          } cursor-pointer`}
        >
          Post
        </button>
        <button
          onClick={() => {
            setIsProfile(false);
            setIsPost(false);
            setIsLikes(true);
          }}
          className={`${
            isLikes ? "text-blue-700" : "text-white"
          } cursor-pointer `}
        >
          Likes
        </button>
      </nav>
      <main
        className={`${
          isProfile ? "block" : "hidden"
        } m-auto w-[80%] h-[60%] flex flex-col lg:flex-wrap lg:justify-start lg:items-center lg:w-[65%] lg:h-[50%] gap-10 text-white overflow-y-auto pb-10`}
      >
        <section className=" h-[20%] w-full lg:w-[40%]">
          <ProfileDisplay
            header="Bike Type"
            src="/assets/images/motorbike.png"
            text={bikeType}
          />
        </section>
        <section className=" h-[20%] w-full lg:w-[40%]">
          <ProfileDisplay
            header="Ride Frequency"
            src="/assets/images/motorbike.png"
            text={ridingFrequency}
          />
        </section>
        <section className=" h-[20%] w-full lg:w-[40%]">
          <ProfileDisplay
            header="Location"
            src="/assets/images/location.png"
            text={location}
          />
        </section>
        <section className=" h-[20%] w-full lg:w-[40%]">
          <ProfileDisplay
            header="Riding Preferences"
            src="/assets/images/motorbike.png"
            text={ridePreference}
          />
        </section>
        <section className=" h-[20%] w-full lg:w-[40%]">
          <ProfileDisplay
            header="Experience Level"
            src="/assets/images/motorbike.png"
            text={experienceLevel}
          />
        </section>
      </main>
      <main
        className={`${
          isPost ? "block" : "hidden"
        } lg:m-auto w-full h-[60%] flex flex-col justify-center items-center lg:justify-start lg:items-center lg:w-[65%] lg:h-[50%] gap-10 text-white overflow-y-auto pb-30 lg:pb-5`}
      >
        <div className="w-[80%] h-full lg:w-[40%] ">
          {userRoutes
            .filter((route) => route.creator.id === userId)
            .map((route, index) => {
              const handleCommentSubmit = async (commentText: string) => {
                if (commentText) {
                  const CommentsOBj: CommentsModelRoute = {
                    UserId: userId,
                    RouteId: route.id,
                    CommentText: commentText,
                    IsDeleted: false,
                  };
                  const response = await AddCommentRoute(CommentsOBj);
                  console.log(response);
                }
              };

              return (
                <div key={index} className="w-full h-full">
                  <UserRoutesCard
                    key={index}
                    LikesNumber={route.likes.length}
                    UserprofilePicture={route.creator.profilePicture}
                    ProfileName={`@${route.creator.userName}`}
                    
                    onCommentSubmit={handleCommentSubmit}
                    RouteImage={route.imageUrl}
                    RouteName={route.routeName}
                    RouteDate={new Date(route.dateCreated).toLocaleDateString(
                      "en-CA"
                    )}
                    RouteDescription={route.routeDescription}
                    isLiked={likedRoutes.has(route.id)}
                    handleLike={() => handleLikes(route.id)}
                    comments={route.comments.map((comment) => ({
                      commentText: comment.commentText,
                      CreatedAt: comment.createdAt,
                      user: {
                        userName: comment.user.userName,
                        profilePicture: comment.user.profilePicture,
                      },
                    }))}
                    commentNumbers={route.comments.length}
                    RouteStartingPoint={[
                      route.pathCoordinates[0].longitude,
                      route.pathCoordinates[0].latitude,
                    ]}
                    TrailCoords={route.pathCoordinates.map((coord) => [
                      coord.longitude,
                      coord.latitude,
                    ])}
                  />
                </div>
              );
            })}
        </div>
      </main>
      <main
        className={`${
          isLikes ? "block" : "hidden"
        } m-auto w-[80%] h-[60%] flex flex-col lg:flex-wrap lg:justify-start lg:items-center lg:w-[65%] lg:h-[50%] gap-10 text-white overflow-y-auto pb-30`}
      ></main>

      <section className="hidden lg:flex lg:w-[60%] lg:h-[6%] lg:m-auto lg:justify-between">
        <div className="w-full lg:w-[40%]">
          <PrimaryButton
            buttonText="Logout"
            isBackgroundDark={false}
            onClick={handleLogOut}
          />
        </div>
        <div className="lg:w-[40%] lg:flex">
          <PrimaryButton buttonText="Edit" isBackgroundDark={true} />
        </div>
      </section>
    </div>
  );
};

export default ProfilePage;
