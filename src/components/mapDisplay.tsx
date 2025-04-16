"use client";
import React, { useState } from "react";
import { useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import Image from "next/image";
mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

const MapDisplay = () => {
  const [location, setLocation] = useState<{ latitude: number; longitude: number }>({
    longitude: 0,
    latitude: 0,
  });
 
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [hasStarted, setHasStarted] = useState<boolean>(false);
  const [countDown, setCountDown] = useState<number>(3);
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapzoom: number = 12;

  const startRecord = () => {
    setHasStarted(true);
    let counter = 3;
    const interval = setInterval(() => {
      counter -= 1;
      if (counter > 0) {
        setCountDown(counter);
      }
      if(counter === 0 )
      {
        clearInterval(interval)
        setIsRecording(true);
        setHasStarted(false)
        setCountDown(3)
      }
    }, 1000);
  };

  useEffect(() => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }

    const handleSuccess = (position: { coords: { latitude: number; longitude: number; }; }) => {
      const { latitude, longitude } = position.coords;
      setLocation({ latitude, longitude });
    };
    const handleError = (error: { message: string; }) => {
      setLocation({ longitude: 122.4194,latitude: 37.7749})
      console.error(error.message);
    };
    navigator.geolocation.getCurrentPosition(
      handleSuccess,
      handleError,
      { enableHighAccuracy: true }
    );
    
  }, []);

  useEffect(() => {
    if (!mapContainerRef.current || location.latitude === 0 || location.longitude === 0) return;
    
      new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/chott1/cm82q157o00aq01sjhffp707j",
      center: [location.longitude, location.latitude],
      zoom: mapzoom,
    });
  }, [location]);

  return (
    <div className="w-full h-full relative flex justify-center items-center text-white">
      <div className="w-full h-full" ref={mapContainerRef} />
      <section className="w-full h-[12%] absolute bottom-0 flex justify-center items-start">
        <button
          className={`${
            isRecording ? "hidden" : "block"
          } rounded-full h-15 w-15`}
          onClick={startRecord}
        >
          <Image
            className="w-full h-full"
            src={"/assets/images/record.png"}
            width={1000}
            height={1000}
            alt={"Record Button"}
          />
        </button>
        <button
          className={`${
            isRecording ? "block bg-red-500 " : "hidden"
          } rounded-full h-15 w-15`}
          onClick={() => setIsRecording(false)}
        >
          <Image
            className="w-full h-full"
            src={"/assets/images/stop.png"}
            width={1000}
            height={1000}
            alt={"Record Button"}
          />
        </button>
      </section>
      <div
        className={`${
          hasStarted ? "block" : "hidden"
        } w-[60%] h-[50%] bg-[#2B2B2B]/80 rounded-2xl absolute text-5xl text-white flex justify-center items-center`}
      >
        <p>{countDown}</p>
      </div>
    </div>
  );
};

export default MapDisplay;
