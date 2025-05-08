"use client";

import React, { useEffect, useState } from "react";

import UserCards from "@/components/ui/UserCards";
import { IUserCardType, VideoGet } from "@/components/utils/Interface";
import OpenPostModal from "@/components/inputs/cardTestInput";
import Image from "next/image";
import { getGalleryPosts, GetVideo } from "@/components/utils/DataServices";

import VideoComponet from "@/components/VideoComponet";
import VideoModal from "@/components/VideoModal";

const Page = () => {
  const [userCardsDataArr, setUserCardsDataArr] = useState<IUserCardType[]>([]);
  const [userVideoData, setUserVideoData] = useState<VideoGet[]>([]);
  const [isImagePosted, setIsImagePosted] = useState<boolean>(false);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [videoId,setVideoId]=useState<number>()
  useEffect(() => {
    const fetchPosts = async () => {
      const res = await getGalleryPosts();
      const data = await res;
      console.log(data);
      setUserCardsDataArr(data);
    };
    const fetchVideos = async () => {
      const res = await GetVideo();
      const data = await res;
      console.log("Refetched Video:", data);
      setUserVideoData(data);
    };
    fetchVideos();
    fetchPosts();
  }, []);
  useEffect(() => {
    if (isImagePosted) {
      const fetchPosts = async () => {
        const res = await getGalleryPosts();
        const data = await res;
        console.log("Refetched Images:", data);
        setUserCardsDataArr(data);
      };
      const fetchVideos = async () => {
        const res = await GetVideo();
        const data = await res;
        console.log("Refetched Video:", data);
        setUserVideoData(data);
      };
      fetchVideos();
      fetchPosts();
      setIsImagePosted(false);
    }
  }, [isImagePosted]);

  return (
    <div className="h-[100dvh] w-full flex flex-col relative ">
      <header className="w-full h-[20%] flex flex-col items-center text-white">
        <Image
          className="w-full h-[80%] object-contain"
          src="/assets/images/Logo.png"
          alt="Description of image"
          width={900}
          height={900}
        />
      </header>
      <section className="w-full h-[10%] m-auto flex justify-between items-center">
        <h1 className="text-[30px] text-white pl-5">Gallery</h1>
        <div className="hidden lg:flex pr-10">
          {userCardsDataArr !== null && (
            <OpenPostModal
              isPosted={(value: boolean) => setIsImagePosted(value)}
            />
          )}
        </div>
      </section>
      <main className="sm:w-full lg:w-full lg:h-full flex flex-col justify-start">
        <section className="w-full h-[50%]">
          <div className="w-full flex flex-row gap-2 overflow-x-auto custom-scrollbar pl-3">
            {userCardsDataArr.map((card, index) => (
              <div className="w-[30%] h-[50%] flex-shrink-0" key={index}>
                <UserCards {...card} />
              </div>
            ))}
          </div>
        </section>
        <section className="w-full h-[10%] flex items-center">
          <h1 className="text-[30px] text-white pl-5">Videos</h1>
        </section>
        <section className="w-full h-[70%]">
          <div className="w-full h-[95%] flex flex-row gap-2 overflow-x-auto custom-scrollbar pl-3">
            {userVideoData.map((videos, index) => (
              <div className="w-[20%] h-full flex-shrink-0" key={index}>
                <VideoComponet {...videos} onClick={() => { setSelectedVideo(videos.videoUrl); setVideoId(videos.id); }} />
              </div>
            ))}
          </div>
        </section>
      </main>
      {selectedVideo && (
        <VideoModal
          videoUrl={selectedVideo}
          videoId={videoId? videoId:0}
          onClose={() => setSelectedVideo(null)}
        />
      )}
    </div>
  );
};

export default Page;
