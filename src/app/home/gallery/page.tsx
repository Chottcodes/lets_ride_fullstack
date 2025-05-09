"use client";

import React, { useEffect, useState } from "react";

import UserCards from "@/components/ui/UserCards";
import { IUserCardType, Likes, VideoGet } from "@/components/utils/Interface";
import OpenPostModal from "@/components/inputs/cardTestInput";
import Image from "next/image";
import { getGalleryPosts, GetVideo } from "@/components/utils/DataServices";
import { useRouter } from "next/navigation";

import VideoComponet from "@/components/VideoComponet";
import VideoModal from "@/components/VideoModal";

const Page = () => {
  const [userCardsDataArr, setUserCardsDataArr] = useState<IUserCardType[]>([]);
  const [userVideoData, setUserVideoData] = useState<VideoGet[]>([]);
  const [likesCount, setLikesCount] = useState<number>();
  const [isImagePosted, setIsImagePosted] = useState<boolean>(false);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [videoId, setVideoId] = useState<number>();
  const [videoLikes, setVideoLikes] = useState<Likes[]>([]);
  const router = useRouter();
  useEffect(() => {
    const fetchPosts = async () => {
      const res = await getGalleryPosts();
      const data = await res;
  
      setUserCardsDataArr(data);
    };
    const fetchVideos = async () => {
      const res = await GetVideo();
      const data = await res;
      
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
      
        setUserCardsDataArr(data);
      };
      const fetchVideos = async () => {
        const res = await GetVideo();
        const data = await res;
       
        setUserVideoData(data);
      };
      fetchVideos();
      fetchPosts();
      setIsImagePosted(false);
    }
  }, [isImagePosted]);

  return (
    <div className="h-[100dvh] w-full flex flex-col relative ">
      <header className="w-full h-[15%] lg:h-[20%]  flex flex-col items-center text-white">
        <Image
          className="w-full h-[80%] object-contain"
          onClick={() => router.push("/home")}
          src="/assets/images/Logo.png"
          alt="Description of image"
          width={900}
          height={900}
        />
      </header>
      <section className="w-full lg:h-[10%] m-auto flex justify-between items-center pb-2 lg:pb-0">
        <h1 className="text-[30px] text-white pl-5">Gallery</h1>
        <div className=" pr-2 lg:pr-10">
          {userCardsDataArr !== null && (
            <OpenPostModal
              isPosted={(value: boolean) => setIsImagePosted(value)}
            />
          )}
        </div>
      </section>
      <main className="w-full h-screen lg:h-full flex flex-col justify-start overflow-y-scroll ">
        <section className="w-full mb-5 min-h-[350px] lg:min-h-[350px]">
          <div className="w-full  lg:h-full flex flex-row gap-4 overflow-x-auto custom-scrollbar pl-3 pr-3 ">
            {userCardsDataArr.map((card, index) => (
              <div
                className="w-[350px] pb-5 lg:min-w-[300px] flex-shrink-0"
                key={index}
              >
                <UserCards {...card} />
              </div>
            ))}
          </div>
        </section>
        <section className="w-full h-[10%] flex items-center">
          <h1 className="text-[30px] text-white pl-5">Videos</h1>
        </section>
        <section className="w-full min-h-[450px] lg:h-[70%]">
          <div className="w-full h-[80%] lg:h-[95%] flex flex-row gap-3 overflow-x-auto custom-scrollbar pl-3 pr-3">
            {userVideoData.map((videos, index) => (
              <div
                className="w-[50%] lg:w-[20%] h-full flex-shrink-0"
                key={index}
              >
                <VideoComponet
                  {...videos}
                  onClick={() => {
                    setSelectedVideo(videos.videoUrl);
                    setVideoId(videos.id);
                    setLikesCount(videos.likes.length);
                    setVideoLikes(videos.likes);
                  }}
                />
              </div>
            ))}
          </div>
        </section>
      </main>
      {selectedVideo && (
        <VideoModal
          videoUrl={selectedVideo}
          videoId={videoId ? videoId : 0}
          videoLikes={likesCount ?? 0}
          videoLikeArr={videoLikes}
          onClose={() => setSelectedVideo(null)}
        />
      )}
    </div>
  );
};

export default Page;
