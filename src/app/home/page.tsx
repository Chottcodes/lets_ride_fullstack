"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ChevronRight, ChevronLeft} from "lucide-react";

import UserCards from "@/components/ui/UserCards";
import UserRoutesCard from "@/components/ui/UserRoutesCard";
import VideoComponent from "@/components/VideoComponet";
import VideoModal from "@/components/VideoModal";
import { useRouter } from "next/navigation";

import {
  GetGalleryPosts,
  GetRoute,
  GetVideo,
} from "@/components/utils/DataServices";

import {
  GetRoutes,
  IUserCardType,
  VideoGet,
} from "@/components/utils/Interface";

import { GetLocalStorageId } from "@/components/utils/helperFunctions";

const SectionTitle = ({title}:{title:React.ReactNode}) => (
  <div className="w-full flex items-center justify-between px-4 md:px-8 py-6">
    <h2 className="text-2xl md:text-3xl text-white font-bold">{title}</h2>
   
  </div>
);

const ScrollableSection = ({
  children,
  title,
}: {
  children: React.ReactNode;
  title: React.ReactNode;
}) => {
  const scrollRef = React.useRef<HTMLDivElement>(null);
  
   const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -400 : 400;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };


  return (
    <section className="w-full px-2 py-4">
      <SectionTitle title={title}/>
      
      <div className="relative group">
        <motion.button 
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/70 rounded-full p-2 z-10 text-white opacity-0 group-hover:opacity-100 transition-opacity hidden md:flex"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => scroll('left')}
        >
          <ChevronLeft size={24} />
        </motion.button>
        
        <div 
          ref={scrollRef}
          className="w-full flex flex-row gap-4 overflow-x-auto scrollbar-hide snap-x scroll-px-4 pb-6 px-2"
        >
          {children}
        </div>
        
        <motion.button 
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/70 rounded-full p-2 z-10 text-white opacity-0 group-hover:opacity-100 transition-opacity hidden md:flex"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => scroll('right')}
        >
          <ChevronRight size={24} />
        </motion.button>
      </div>
    </section>
  );
};

const Page = () => {
  const [userCardsDataArr, setUserCardsDataArr] = useState<IUserCardType[]>([]);
  const [userVideoData, setUserVideoData] = useState<VideoGet[]>([]);
  const [routes, setRoutes] = useState<GetRoutes[]>([]);
  const [userId, setUserId] = useState(0);
  const [likesCount, setLikesCount] = useState<number>();
  const [isImagePosted, setIsImagePosted] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<string>();
  const [videoId, setVideoId] = useState<number>();
  const [videoLikes, setVideoLikes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const getId = GetLocalStorageId();
        if (getId) setUserId(getId);

        // Fetch routes
        const routesRes = await GetRoute(getId,1,4);
        const sortedRoutes = routesRes.sort(
          (a: { dateCreated: string; }, b: { dateCreated: string ; }) => new Date(b.dateCreated).getTime() - new Date(a.dateCreated).getTime()
        );
        setRoutes(sortedRoutes);

        // Fetch gallery posts
        const galleryRes = await GetGalleryPosts(getId,1,3);
       
        const sortedGallery = galleryRes.sort(
          (a: { dateCreated: string; }, b: { dateCreated: string ; }) => new Date(b.dateCreated).getTime() - new Date(a.dateCreated).getTime()
        );
        
        setUserCardsDataArr(sortedGallery);

        // Fetch videos
        const videoRes = await GetVideo(getId,1,3);
        const sortedVideos = videoRes.sort(
          (a: { dateCreated: string; }, b: { dateCreated: string ; }) => new Date(b.dateCreated).getTime() - new Date(a.dateCreated).getTime()
        );
     
        setUserVideoData(sortedVideos);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [userId]);
  
  useEffect(() => {
    if (isImagePosted) {
      const refetchData = async () => {
        try {
          const galleryRes = await GetGalleryPosts(userId,1,3);
          setUserCardsDataArr(galleryRes);

          const videoRes = await GetVideo(userId,1,3);
          setUserVideoData(videoRes);
        } catch (error) {
          console.error("Error refetching data:", error);
        } finally {
          setIsImagePosted(false);
        }
      };

      refetchData();
    }
  }, [isImagePosted]);

  return (
    <div className="min-h-screen w-full flex flex-col bg-gradient-to-b from-gray-800 to-black">
      {/* Hero Section */}
      <section className="relative w-full h-[40vh] md:h-[60vh] lg:h-[80vh] overflow-hidden">
        <video
          className="w-full h-full object-cover"
          autoPlay
          loop
          playsInline
          muted
        >
          <source
            src="/assets/video/lets_ride_Final_Video.mp4"
            type="video/mp4"
          />
        </video>
        
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 to-transparent" />
        
        <div className="absolute bottom-8 left-0 w-full px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="max-w-3xl"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-2">
              Lets <span className="text-blue-600">Ride</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-200 max-w-lg">
              Share your rides, discover new routes, and connect with fellow riders
            </p>
            
          </motion.div>
        </div>
      </section>

      {isLoading ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
        </div>
      ) : (
        <main className="w-full flex flex-col pb-[80px] lg:pb-0" >
          {/* Routes Section */}
          {routes.length > 0 && (
            <ScrollableSection title={  <>
      Recent{' '}
      <span
        onClick={() => router.push('/home/map')}
        className="text-blue-600 cursor-pointer"
      >
        Routes
      </span>
    </>}>
              {routes.map((route, index) => (
                <motion.div 
                  key={index}
                  className="min-w-[280px] w-[85vw] sm:w-[350px] md:w-[300px] lg:w-[350px] flex-shrink-0 snap-start"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index, duration: 0.3 }}
                >
                  <UserRoutesCard {...route} />
                </motion.div>
              ))}
            </ScrollableSection>
          )}

          {/* Gallery Section */}
          {userCardsDataArr.length > 0 && (
            <ScrollableSection title={  <>
      Recent{' '}
      <span
        onClick={() => router.push('/home/gallery')}
        className="text-blue-600 cursor-pointer"
      >
        Photos
      </span>
    </>}>
              {userCardsDataArr.map((card, index) => (
                <motion.div 
                  key={index}
                  className="min-w-[280px] w-[85vw] sm:w-[350px] md:w-[300px] lg:w-[350px] flex-shrink-0 snap-start"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index, duration: 0.3 }}
                >
                  <UserCards {...card} />
                </motion.div>
              ))}
            </ScrollableSection>
          )}

          {/* Videos Section */}
          {Array.isArray(userVideoData) && userVideoData.length > 0 && (
            <ScrollableSection title="Featured Videos">
              {userVideoData.map((video, index) => (
                <motion.div 
                  key={index}
                  className="min-w-[280px] w-[85vw] sm:w-[350px] md:w-[300px] lg:w-[350px] flex-shrink-0 snap-start"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index, duration: 0.3 }}
                  // onClick={() => {
                  //   setSelectedVideo(video.videoUrl);
                  //   setVideoId(video.id);
                  //   setLikesCount(video.likes.length);
                    
                  // }}
                >
                  <VideoComponent {...video} />
                </motion.div>
              ))}
            </ScrollableSection>
          )}
        </main>
      )}

      {/* Video Modal */}
      {selectedVideo && (
        <VideoModal
          videoUrl={selectedVideo}
          videoId={videoId ?? 0}
          videoLikes={likesCount ?? 0}
          videoLikeArr={videoLikes}
          onClose={() => setSelectedVideo('')}
        />
      )}
    </div>
  );
};

export default Page;