import React from "react";
import { VideoGet } from "./utils/Interface";
import Image from "next/image";


const VideoComponet = (props: VideoGet & { onClick?: () => void }) => {

  return (
    <main className="w-full h-full overflow-hidden shadow-md rounded-md border-2 border-blue-500">
      <div className="h-[90%] w-full">
        <video
          controls
          src={props.videoUrl}
          className="w-full h-full object-contain"
          muted
          playsInline
          loop
          onClick={props.onClick}
        />
      </div>
      <div className="h-[10%] w-full flex justify-between items-center relative">
        <div className="pl-2 w-[30%] flex justify-start items-center text-white">
        <Image src={props.profilePicture} width={1000} height={1000} className="w-[20px] h-[20px] rounded-full " alt={"Profile picture"}/>
        <p className="text-[15px]">{props.creatorName}</p>
        </div>
        <div className="w-full h-full text-white flex justify-center items-center absolute">
          <p>{props.title}</p>
        </div>
        

      </div>
    </main>
  );
};

export default VideoComponet;
