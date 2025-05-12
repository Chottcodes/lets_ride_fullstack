"use client";

import React, { useEffect, useState } from "react";

import UserCards from "@/components/ui/UserCards";
import { IUserCardType, Likes, VideoGet } from "@/components/utils/Interface";

import { getGalleryPosts, GetVideo } from "@/components/utils/DataServices";


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
  useEffect(() => {
    const fetchPosts = async () => {
      const res = await getGalleryPosts();
      const data = await res;
      const sorted = data.sort(
        (a: IUserCardType, b: IUserCardType) =>
          new Date(b.dateCreated).getTime() - new Date(a.dateCreated).getTime()
      );
      const latestThree = sorted.slice(0, 3);
      setUserCardsDataArr(latestThree);
    };
    const fetchVideos = async () => {
      const res = await GetVideo();
      const data = await res;
      const sorted = data.sort(
        (a: IUserCardType, b: IUserCardType) =>
          new Date(b.dateCreated).getTime() - new Date(a.dateCreated).getTime()
      );
      const latestThree = sorted.slice(0, 3);
      setUserVideoData(latestThree);
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
    <div className="min-h-[100dvh] w-full flex flex-col bg-black">
    <header className="h-[500px] w-full">
    <video
      className="w-full h-full object-cover"
      autoPlay
      loop
      playsInline
      muted
    >
      <source src="/assets/video/LetsRideVidRevOne.mp4" type="video/mp4" />
    </video>
  </header>

  <section className="w-full flex justify-center items-center py-4">
    <h1 className="text-[30px] text-white pl-5">Recent</h1>
  </section>

  <main className="w-full flex flex-col">
    <section className="w-full min-h-[350px]">
      <div className="w-full flex flex-row justify-center  gap-4 overflow-x-auto pl-3 pr-3">
        {userCardsDataArr.map((card, index) => (
          <div className="w-[350px] flex-shrink-0" key={index}>
            <UserCards {...card} />
          </div>
        ))}
      </div>
    </section>

    <section className="w-full py-4 flex justify-center">
      <h1 className="text-[30px] text-white pl-5">Videos</h1>
    </section>

    <section className="w-full min-h-[450px]">
      <div className="w-full flex flex-row justify-center gap-5 overflow-x-auto">
        {userVideoData.map((videos, index) => (
          <div className="w-[50%] lg:w-[20%]  flex-shrink-0 pb-5" key={index}>
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
      videoId={videoId ?? 0}
      videoLikes={likesCount ?? 0}
      videoLikeArr={videoLikes}
      onClose={() => setSelectedVideo(null)}
    />
  )}
</div>

  );
};

export default Page;
