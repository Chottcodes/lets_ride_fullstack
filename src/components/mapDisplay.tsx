"use client";
import React, { useState } from "react";
import { useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import Image from "next/image";
mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

const MapDisplay = () => {
  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
  }>({
    longitude: -122.4194,
    latitude: 37.7749,
  });

  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [hasStarted, setHasStarted] = useState<boolean>(false);
  const [countDown, setCountDown] = useState<number>(3);
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const markerRef = useRef<mapboxgl.Marker | null>(null);
  const mapzoom: number = 15;

  const startRecord = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }

    const handleError = (error: { message: string }) => {
      setLocation({ longitude: 122.4194, latitude: 37.7749 });
      console.error(error.message);
    };
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        alert(`Latitude: ${latitude}, Longitude: ${longitude}`);
        setLocation({ latitude, longitude });
        setHasStarted(true);
      },
      handleError,
      { enableHighAccuracy: true }
    );

    let counter = 3;
    const interval = setInterval(() => {
      counter -= 1;
      if (counter > 0) {
        setCountDown(counter);
      }
      if (counter === 0) {
        clearInterval(interval);
        setIsRecording(true);
        setHasStarted(false);
        setCountDown(3);
      }
    }, 1000);
  };

  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/chott1/cm82q157o00aq01sjhffp707j",
      center: [location.longitude, location.latitude],
      zoom: mapzoom,
    });

    mapRef.current = map;
    //now I need to create a marker
    const el = document.createElement("div");
    el.className = "custom-marker";
    el.style.backgroundImage = "url(/assets/images/custom-pin.png)";
    el.style.width = "50px";
    el.style.height = "50px";
    el.style.backgroundSize = "contain";
    el.style.backgroundRepeat = "no-repeat";
    el.style.backgroundPosition = "center";

    el.addEventListener("click", () => {
      map.flyTo({
        center: [location.longitude, location.latitude],
        zoom: mapzoom,
        essential: true,
      });
    });

    const marker = new mapboxgl.Marker({ element: el })
      .setLngLat([location.longitude, location.latitude])
      .addTo(map);
    markerRef.current = marker;

    return () => {
      mapRef.current?.remove();
    };
  }, []);

  useEffect(() => {
    if (mapRef.current && markerRef.current) {
      mapRef.current.setCenter([location.longitude, location.latitude]);
      markerRef.current.setLngLat([location.longitude, location.latitude]);
    }
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
