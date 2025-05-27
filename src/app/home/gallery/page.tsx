"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

import UserCards from "@/components/ui/UserCards";
import { IUserCardType, VideoGet } from "@/components/utils/Interface";
import { GetGalleryPosts, GetVideo } from "@/components/utils/DataServices";
import VideoComponet from "@/components/VideoComponet";


// New components

import { ChevronRight } from "lucide-react";
import OpenPostModal from "@/components/inputs/cardTestInput";
import { GetLocalStorageId } from "@/components/utils/helperFunctions";

const Page = () => {
  const [userCardsDataArr, setUserCardsDataArr] = useState<IUserCardType[]>([]);
  const [userId, setUserId] = useState<number>(0);
  const [userVideoData, setUserVideoData] = useState<VideoGet[]>([]);

  const [isImagePosted, setIsImagePosted] = useState<boolean>(false);

  const [showPostModal, setShowPostModal] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState("photos");

  const router = useRouter();

  // Fetch data on initial load
  useEffect(() => {
    const getId = GetLocalStorageId();
    if (getId) setUserId(getId);
    const fetchPosts = async () => {
      const res = await GetGalleryPosts(getId, 1, 100);
      setUserCardsDataArr(res || []);
    };

    const fetchVideos = async () => {
      const res = await GetVideo(getId, 1, 100);
      setUserVideoData(res || []);
    };

    fetchVideos();
    fetchPosts();
  }, []);

  // Refetch data when new content is posted
  useEffect(() => {
    if (isImagePosted) {
      const fetchPosts = async () => {
        const res = await GetGalleryPosts(userId, 1, 100);
        setUserCardsDataArr(res || []);
      };

      const fetchVideos = async () => {
        const res = await GetVideo(userId, 1, 100);
        setUserVideoData(res || []);
      };

      fetchVideos();
      fetchPosts();
      setIsImagePosted(false);
    }
  }, [isImagePosted]);

  // const handleAddContent = () => {
  //   setShowPostModal(true);
  // };

  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  // If user is not logged in, show pop up, "Please Login in order to post in the gallery."

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-gray-800 to-black text-white">
      {/* Header with motorcycle-themed logo */}

      <header className="w-full py-4 px-6 flex items-center justify-between bg-gray-800/25 backdrop-blur-sm sticky top-0 z-10 ">
        <div
          className="flex items-center gap-3"
          onClick={() => router.push("/home")}
        >
          <Image
            src="/assets/images/Logo.png"
            alt="Motorcycle Logo"
            width={40}
            height={40}
            className="w-10 h-10 object-contain"
          />
          <h1 className="text-xl font-bold tracking-wider hidden sm:block">
            MOTO<span className="text-blue-500">GALLERY</span>
          </h1>
        </div>
      </header>

      {/* Tab navigation */}
      <div className="flex border-b border-zinc-800 mx-4 mt-4 relative">
        <button
          onClick={() => setActiveTab("photos")}
          className={`px-6 py-3 font-medium transition-all ${
            activeTab === "photos"
              ? "border-b-2 border-blue-500 text-white"
              : "text-zinc-400 hover:text-white"
          }`}
        >
          Photos
        </button>
        <button
          onClick={() => setActiveTab("videos")}
          className={`px-6 py-3 font-medium transition-all ${
            activeTab === "videos"
              ? "border-b-2 border-blue-500 text-white"
              : "text-zinc-400 hover:text-white"
          }`}
        >
          Videos
        </button>
        {userCardsDataArr !== null && (
          <div className=" absolute end-0 pr-5">
            <OpenPostModal
              isPosted={(value: boolean) => setIsImagePosted(value)}
            />
          </div>
        )}
      </div>

      {/* Main content */}
      <main className="px-4 py-6">
        {/* Photos Section */}
        {activeTab === "photos" && (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={variants}
            transition={{ staggerChildren: 0.1 }}
            className="space-y-6"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold flex items-center">
                Featured Photos
                <ChevronRight size={20} className="ml-1 text-blue-500" />
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {userCardsDataArr.map((card, index) => (
                <motion.div key={index} variants={variants} className="h-full">
                  <UserCards {...card} />
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Videos Section */}
        {activeTab === "videos" && (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={variants}
            className="space-y-6"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold flex items-center">
                Featured Videos
                <ChevronRight size={20} className="ml-1 text-blue-500" />
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {userVideoData.map((video, index) => (
                <motion.div
                  key={index}
                  variants={variants}
                  className="h-full aspect-video bg-zinc-800 rounded-lg overflow-hidden"
                >
                  <VideoComponet {...video} />
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </main>

      {/* Video Modal */}

      {/* Add Content Modal */}
      {showPostModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-zinc-900 rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Add New Content</h2>
            {/* We'll reuse your existing OpenPostModal component here */}
            <div className="mt-4">
              {userCardsDataArr !== null && (
                <div className="w-full">
                  <button
                    className="w-full bg-red-600 hover:bg-red-700 py-3 rounded-lg font-medium"
                    onClick={() => {
                      // This would trigger your existing modal
                      setShowPostModal(false);
                      // Using your existing OpenPostModal component
                      document.getElementById("openPostModalButton")?.click();
                    }}
                  >
                    Continue
                  </button>

                  {/* Hidden button to trigger your existing modal */}
                  <div className="hidden">
                    <button id="openPostModalButton">
                      <OpenPostModal
                        isPosted={(value: boolean) => setIsImagePosted(value)}
                      />
                    </button>
                  </div>
                </div>
              )}

              <button
                className="w-full mt-2 border border-zinc-700 py-3 rounded-lg font-medium"
                onClick={() => setShowPostModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
