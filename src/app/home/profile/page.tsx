"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  GetGalleryPosts,
  GetRoute,
  GetUserProfile,
  GetVideo,
} from "@/components/utils/DataServices";
import {
  GetRoutes,
  IUserCardType,
 
} from "@/components/utils/Interface";
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
  });

  const [activeTab, setActiveTab] = useState("profile");

  const [userRoutes, setUserRoutes] = useState<GetRoutes[]>([]);
  const [userGalleryPost, setUserGalleryPost] = useState<IUserCardType[]>([]);
  const [userVideoPost, setUserVideoPost] = useState([]);
  const [userId, setUserId] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [scrolled] = useState<boolean>(false);
  useEffect(() => {
    console.log(userId);
    console.log(userRoutes);
  }, [userId, userRoutes]);
  useEffect(() => {
    const id = GetLocalStorageId();
    if (!id) {
      push("/pages/Login/loginPage");
      return;
    } else {
      setUserId(id);
    }

    const fetchUserData = async () => {
      try {
        setIsLoading(true);
        const data = await GetUserProfile(id);
        const {
          bikeType,
          location,
          profilePicture,
          rideConsistency,
          ridingExperience,
          ridingPreference,
          userName,
          name,
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
          userId: id,
        });
      } catch (err) {
        console.error("Failed to fetch user data:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [push]);

  useEffect(() => {
    if (userId) {
      const fetchRoutes = async () => {
        try {
          console.log(userId);
          const routes = await GetRoute(userId, 1, 100);
          setUserRoutes(routes);
        } catch (err) {
          console.error("Failed to fetch routes:", err);
        }
      };
      const fetchGalleryPost = async () => {
        try {
          const gallery = await GetGalleryPosts(userId, 1, 100);
          setUserGalleryPost(gallery);
        } catch (error) {
          console.error("Failed to fetch Gallery:", error);
        }
      };
      const fetchVideoPost = async () => {
        try {
          const gallery = await GetVideo(userId, 1, 100);
          setUserVideoPost(gallery);
        } catch (error) {
          console.error("Failed to fetch Gallery:", error);
        }
      };
      fetchRoutes();
      fetchGalleryPost();
      fetchVideoPost();
    }
  }, [userId]);

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
      ? userRoutes.filter((route) => route.isLikedByCurrentUser=== true)
      : [];

  // Profile data items for consistent rendering
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

      {/* Main Content */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="w-12 h-12 border-t-2 border-b-2 border-blue-500 rounded-full animate-spin"></div>
            <p className="mt-4 text-gray-400">Loading profile...</p>
          </div>
        ) : activeTab === "profile" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {profileItems.map((item, index) => (
              <div
                key={index}
                className="bg-gray-800 rounded-xl p-5 border border-gray-700 hover:border-blue-600 transition-all duration-300 shadow-md hover:shadow-blue-900/20"
              >
                <div className="flex items-start gap-4">
                  <div className="bg-gray-700 p-2 rounded-lg">{item.icon}</div>
                  <div>
                    <h3 className="text-gray-400 text-sm mb-1">{item.label}</h3>
                    <p className="font-medium">{item.value}</p>
                  </div>
                </div>
              </div>
            ))}
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
