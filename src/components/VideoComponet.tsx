import React from "react";
import { VideoGet } from "./utils/Interface";


const VideoComponet = (props: VideoGet & { onClick?: () => void }) => {
  return (
    <main className="w-full h-full overflow-hidden shadow-md rounded-md border-2 border-blue-500">
      <div className="h-full w-full">
        <video
          controls
          src={props.videoUrl}
          className="w-full h-full object-contain"
          playsInline
          loop
          onClick={props.onClick}
        />
      </div>
    </main>
  );
};

export default VideoComponet;
