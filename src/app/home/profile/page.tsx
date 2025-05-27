"use client";
import React, { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  EditUserProfile,
  GetRoute,
  getUserPostData,
  GetUserProfile,
} from "@/components/utils/DataServices";
import { GetRoutes, RouteGetForCardTypes } from "@/components/utils/Interface";
import UserRoutesCard from "@/components/ui/UserRoutesCard";
import { GetLocalStorageId } from "@/components/utils/helperFunctions";
import {
  MapPinHouse,
  Bike,
  Locate,
  Hourglass,
  LogOut,
  Pencil,
} from "lucide-react";
import DropDownInputComponent from "@/components/buttons/DropDownInputComponent";
import { UserProfileTypes } from "@/components/utils/Interface";

const ProfilePage = () => {
  const { push } = useRouter();

  const [userData, setUserData] = useState({
    name: "",
    username: "",
    profilePicture: "/assets/images/default-profile.png",
    bikeType: "Not specified",
    ridingFrequency: "Not specified",
    location: "Not specified",
    ridePreference: "Not specified",
    experienceLevel: "Not specified",
    userId: 0,
    profileId: 0,
    page: 0,
    pageSize: 0,
  });

  const [activeTab, setActiveTab] = useState("profile");
  const [likedRoutes, setLikedRoutes] = useState(new Set());
  const [userRoutes, setUserRoutes] = useState<GetRoutes[]>([]);
  const [userId, setUserId] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [scrolled] = useState<boolean>(false);

  const fetchUserData = useCallback(async () => {
    if (!userId) return;
    try {
      setIsLoading(true);
      const data = await GetUserProfile(userId);
      const {
        bikeType,
        location,
        profilePicture,
        rideConsistency,
        ridingExperience,
        ridingPreference,
        userName,
        name,
        page,
        pageSize,
        id: profileId,
      } = data;

      setUserData({
        name: name || "Rider",
        username: userName || "Guest",
        profilePicture:
          profilePicture || "/assets/images/default-profile.png",
        bikeType: bikeType || "Not specified",
        ridingFrequency: rideConsistency || "Not specified",
        location: location || "Not specified",
        ridePreference: ridingPreference || "Not specified",
        experienceLevel: ridingExperience || "Not specified",
        userId: userId,
        profileId: profileId,
        page: 0,
        pageSize: 0,
      });
    } catch (err) {
      console.error("Failed to fetch user data:", err);
    } finally {
      setIsLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    const id = GetLocalStorageId();
    if (!id) {
      push("/pages/Login/loginPage");
      return;
    } else {
      setUserId(id);
    }

    fetchUserData();
  }, [push, userId, fetchUserData]);

  useEffect(() => {
    if (userData.userId) {
      const fetchRoutes = async () => {
        try {
          const routes = await GetRoute(userId, page, pageSize);
          setUserRoutes(routes);

          const liked = new Set();
          routes.forEach((route: RouteGetForCardTypes) => {
            route.likes?.forEach(
              (like: { userId: number; isDeleted: boolean }) => {
                if (like.userId === userData.userId && !like.isDeleted) {
                  liked.add(route.id);
                }
              }
            );
          });
          setLikedRoutes(liked);
        } catch (err) {
          console.error("Failed to fetch routes:", err);
        }
      };
      fetchRoutes();
    }
  }, [userData.userId]);

  const handleLogOut = () => {
    localStorage.clear();
    push("/pages/Login/loginPage");
  };

  const filteredRoutes =
    activeTab === "post"
      ? userRoutes.filter(
          (route) =>
            route.isPrivate === false && route.creatorName === userData.username
        )
      : activeTab === "likes"
      ? userRoutes.filter((route) => likedRoutes.has(route.id))
      : [];

  // ------------------ User preferences ------------------
  const [isEditing, setIsEditing] = useState(false);
  const [editKey, setEditKey] = useState<string | null>(null);
  const [editValue, setEditValue] = useState<string>("");

  const handleEditSubmit = async (newValue: string) => {
    console.log("New value:", newValue);
    if (!newValue || !editKey) return;

    const fieldMappings: { [key: string]: string } = {
      "Bike Type": "BikeType",
      "Ride Frequency": "RideConsistency",
      "Location": "Location",
      "Riding Preferences": "RidingPreference",
      "Experience Level": "RidingExperience"
    };

    const field = fieldMappings[editKey];
    if (!field) return;

    try {
      const updatedProfile: UserProfileTypes = {
        UserId: userData.userId,
        UserName: userData.username || null,
        Name: userData.name || null,
        Location: field === "Location" ? newValue : (userData.location === "Not specified" ? null : userData.location),
        BikeType: field === "BikeType" ? newValue : (userData.bikeType === "Not specified" ? null : userData.bikeType),
        RidingExperience: field === "RidingExperience" ? newValue : (userData.experienceLevel === "Not specified" ? null : userData.experienceLevel),
        RidingPreference: field === "RidingPreference" ? newValue : (userData.ridePreference === "Not specified" ? null : userData.ridePreference),
        RideConsistency: field === "RideConsistency" ? newValue : (userData.ridingFrequency === "Not specified" ? null : userData.ridingFrequency),
        ProfilePicture: userData.profilePicture || null
      };

      console.log("Sending updated profile:", updatedProfile);
      const response = await EditUserProfile(updatedProfile);
      
      if (response) {
        // After successful update, fetch fresh data from server
        await fetchUserData();
        console.log("Profile updated successfully:", response);
      } else {
        console.error("Failed to update profile - server returned null");
        await fetchUserData(); // Refresh data even on error to ensure UI is in sync
      }
    } catch (error) {
      console.error("Failed to update profile:", error);
      await fetchUserData(); // Refresh data on error to ensure UI is in sync
    }

    setIsEditing(false);
    setEditKey(null);
    setEditValue("");
  };

  const getDropdownOptions = (key: string) => {
    switch (key) {
      case "Bike Type":
        return {
          options: [
            { label: "Mountain Bike", value: "Mountain Bike" },
            { label: "Road Bike", value: "Road Bike" },
            { label: "Hybrid Bike", value: "Hybrid Bike" },
            { label: "Electric Bike", value: "Electric Bike" }
          ]
        };
      case "Ride Frequency":
        return {
          options: [
            { label: "Rarely", value: "Rarely" },
            { label: "Occasionally", value: "Occasionally" },
            { label: "Regularly", value: "Regularly" },
            { label: "Daily", value: "Daily" }
          ]
        };
      case "Riding Preferences":
        return {
          options: [
            { label: "Cruising", value: "Cruising" },
            { label: "Long Distance", value: "Long Distance" },
            { label: "Off Road", value: "Off Road" },
            { label: "Track Riding/Fast Riding", value: "Track Riding" }
          ]
        };
      case "Experience Level":
        return {
          options: [
            { label: "Beginner (6 months or less)", value: "Beginner" },
            { label: "Intermediate (6 months to 2 years)", value: "Intermediate" },
            { label: "Advanced (2 years or more)", value: "Advanced" }
          ]
        };
      default:
        return {
          options: []
        };
    }
  };

  const profileItems = [
    {
      icon: <Bike />,
      label: "Bike Type",
      value: userData.bikeType,
    },
    {
      icon: <Bike />,
      label: "Ride Frequency",
      value: userData.ridingFrequency,
    },
    {
      icon: <Locate />,
      label: "Location",
      value: userData.location,
    },
    {
      icon: <Bike />,
      label: "Riding Preferences",
      value: userData.ridePreference,
    },
    {
      icon: <Hourglass />,
      label: "Experience Level",
      value: userData.experienceLevel,
    },
  ];

  return (
    <div className="min-h-[100dvh] bg-gradient-to-b from-gray-900 to-gray-800 text-white flex flex-col">
      {/* Header - Transparent when at top, solid when scrolled */}
      <header
        className={`transition-all duration-300 ${
          scrolled
            ? "bg-gray-900 shadow-lg backdrop-blur-sm bg-opacity-90"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-6xl mx-auto flex justify-between items-center px-4 sm:px-6 py-4">
          <button
            onClick={handleLogOut}
            className="flex items-center gap-2 text-sm font-medium text-gray-300 hover:text-red-400 transition"
          >
            <LogOut />
            <span className="hidden sm:inline">Log Out</span>
          </button>

          <h1 className="text-xl font-bold">{`${userData.username}'s Profile`}</h1>

          <button
            onClick={() => push("/pages/Profile/editProfile")}
            className="flex items-center gap-2 text-sm font-medium text-gray-300 hover:text-blue-400 transition"
          >
            <Pencil />
            <span className="hidden sm:inline">Edit</span>
          </button>
        </div>
      </header>

      {/* Profile Banner with Parallax Effect */}
      <section className="pt-20 relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
          <Image
            src={"/assets/images/motorcyclegroup.jpg"}
            priority={true}
            loading="eager"
            quality={60}
            width={800}
            height={200}
            alt={"motocycle picture"}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="relative z-1 max-w-4xl mx-auto px-4 py-8 sm:py-12">
          <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-10">
            <div className="relative w-28 h-28 sm:w-36 sm:h-36">
              <div className="absolute inset-0 bg-blue-600 rounded-full blur-md opacity-50"></div>
              <div className="relative h-full w-full overflow-hidden rounded-full border-4 border-gray-700 shadow-xl">
                <Image
                  src={userData.profilePicture}
                  alt={userData.name}
                  fill
                  sizes="(max-width: 768px) 100px, 150px"
                  className="object-cover"
                />
              </div>
            </div>

            <div className="text-center sm:text-left">
              <h2 className="text-2xl sm:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-500">
                {userData.name}
              </h2>
              <p className="text-gray-400 font-medium">@ {userData.username}</p>

              <div className="flex items-center justify-center gap-1 sm:justify-start mt-2 text-gray-300">
                <MapPinHouse className="w-[15px] h-[15px]" />
                <span className="text-sm">{userData.location}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tab Navigation */}
      <nav className="sticky top-16 bg-gray-800 z-10 border-t border-b border-gray-700 shadow-lg">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex justify-between">
            {["profile", "post", "likes"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`relative py-4 px-3 text-sm font-medium transition-colors ${
                  activeTab === tab
                    ? "text-blue-400"
                    : "text-gray-400 hover:text-gray-200"
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
                {activeTab === tab && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500"></span>
                )}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content (Profile Item Cards) */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="w-12 h-12 border-t-2 border-b-2 border-blue-500 rounded-full animate-spin"></div>
            <p className="mt-4 text-gray-400">Loading profile...</p>
          </div>
        ) : activeTab === "profile" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {profileItems.map((item, index) => (
              <button
                key={index}
                onClick={() => {
                  setIsEditing(true);
                  setEditKey(item.label);
                  setEditValue(item.value);
                }}
                className="bg-gray-800 rounded-xl p-5 border border-gray-700 hover:border-blue-600 transition-all duration-300 shadow-md hover:shadow-blue-900/20 cursor-pointer"
              >
                <div className="flex items-start gap-4">
                  <div className="bg-gray-700 p-2 rounded-lg">{item.icon}</div>
                  <div className="flex flex-col items-baseline">
                    <h3 className="text-gray-400 text-sm mb-1">{item.label}</h3>
                    <p className="font-medium">{item.value}</p>
                  </div>
                </div>
              </button>
            ))}
            {/* Open drop down here*/}
            {isEditing && editKey && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-gray-800 p-6 rounded-lg shadow-xl w-[90%] max-w-md">
                  <h3 className="text-xl font-semibold mb-4">Edit {editKey}</h3>
                  {(editKey === "Location" || editKey === "Bike Type") ? (
                    <div className="space-y-2">
                      <input
                        type="text"
                        value={editValue}
                        onChange={(e) => {
                          // Limit input to 30 characters
                          if (e.target.value.length <= 25) {
                            setEditValue(e.target.value);
                          }
                        }}
                        maxLength={25}
                        className="w-full bg-gray-700 text-white p-2 rounded mb-1"
                        placeholder={`Enter ${editKey.toLowerCase()}`}
                      />
                      <p className="text-sm text-gray-400">
                        {editValue.length}/25 characters
                      </p>
                    </div>
                  ) : (
                    <div className="mb-4">
                      <DropDownInputComponent
                        options={getDropdownOptions(editKey).options}
                        onChange={(e) => setEditValue(e.target.value)}
                        placeholder={`Select ${editKey}`}
                      />
                    </div>
                  )}
                  <div className="flex justify-end gap-4">
                    <button
                      onClick={() => {
                        setIsEditing(false);
                        setEditKey(null);
                        setEditValue("");
                      }}
                      className="px-4 py-2 text-gray-400 hover:text-white transition"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => handleEditSubmit(editValue)}
                      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                    >
                      Save
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : filteredRoutes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredRoutes.map((route) => (
              <UserRoutesCard key={route.id} {...route} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="inline-block p-4 bg-gray-800 rounded-full mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {activeTab === "post" ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                )}
              </svg>
            </div>
            <h3 className="text-xl font-medium text-gray-300 mb-2">
              {activeTab === "post"
                ? "No Routes Posted Yet"
                : "No Liked Routes"}
            </h3>
            <p className="text-gray-500 max-w-md mx-auto">
              {activeTab === "post"
                ? "Share your favorite rides with the community by creating your first route."
                : "Discover and like routes to save them for future adventures."}
            </p>
            {activeTab === "post" && (
              <button
                onClick={() => push("/home/map")}
                className="mt-6 px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition-colors flex items-center gap-2 mx-auto"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                Create Route
              </button>
            )}
          </div>
        )}
      </main>

      {/* Back to top button */}
      {scrolled && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed right-6 bottom-24 md:bottom-6 bg-gray-700 hover:bg-gray-600 w-10 h-10 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 opacity-80 hover:opacity-100"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 10l7-7m0 0l7 7m-7-7v18"
            />
          </svg>
        </button>
      )}
    </div>
  );
};

export default ProfilePage;
