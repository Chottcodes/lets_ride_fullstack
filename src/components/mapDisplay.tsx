"use client";
import React, { useState } from "react";
import { useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import Image from "next/image";

const MapDisplay = () => {
  const [latitude, setLatitude] = useState<number>(37.7749);
  const [longitude, setLongitude] = useState<number>(-122.4194);
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [startCountDown, setStartCountDown] = useState<boolean>(false);
  const [countDown, setCountDown] = useState<number>(3);
  const [debugMsg, setDebugMsg] = useState<string | null>(null);

  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const markerRef = useRef<mapboxgl.Marker | null>(null);

  const mapzoom: number = 15;

  mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

  const startRecord = () => {
    if (typeof window === "undefined" || !navigator.geolocation) {
      setDebugMsg("Geolocation not supported on this device/browser.");
      return;
    }
    if (navigator.permissions) {
      navigator.permissions
        .query({ name: "geolocation" })
        .then((result) => {
          setDebugMsg(`Permission state: ${result.state}`);
          if (result.state === "denied") {
            setDebugMsg(
              "Location permission was denied. Check browser and iOS settings."
            );
          }
        })
        .catch((err) => {
          setDebugMsg(`Permissions API error: ${err}`);
        });
    }

    navigator.geolocation.watchPosition((pos) => {
      const { latitude, longitude } = pos.coords;
      setLatitude(latitude);
      setLongitude(longitude);
      setStartCountDown(true);
      if (!startCountDown) {
        let counter = 3;
        const interval = setInterval(() => {
          counter -= 1;
          if (counter > 0) {
            setCountDown(counter);
          }
          if (counter === 0) {
            clearInterval(interval);
            setIsRecording(true);
            setStartCountDown(false);
            setCountDown(3);
          }
        }, 1000);
      }
    }, handleError);
  };

  const handleError = (error: { message: string }) => {
    setDebugMsg(
      `Error: ${error.message} Longitude: ${longitude}, Latitude: ${latitude}`
    );
  };

  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/chott1/cm82q157o00aq01sjhffp707j",
      center: [longitude, latitude],
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
        center: [longitude, latitude],
        zoom: mapzoom,
        essential: true,
      });
    });

    const marker = new mapboxgl.Marker({ element: el })
      .setLngLat([longitude, latitude])
      .addTo(map);
    markerRef.current = marker;

    return () => {
      map.remove();
    };
  }, []);

  useEffect(() => {
    if (mapRef.current && markerRef.current && longitude && latitude) {
      mapRef.current.setCenter([longitude, latitude]);
      markerRef.current.setLngLat([longitude, latitude]);

      if (markerRef.current) markerRef.current.remove();

      const el = document.createElement("div");
      el.className = "custom-marker";
      el.style.backgroundImage = "url(/assets/images/custom-pin.png)";
      el.style.width = "50px";
      el.style.height = "50px";
      el.style.backgroundSize = "contain";
      el.style.backgroundRepeat = "no-repeat";
      el.style.backgroundPosition = "center";

      el.addEventListener("click", () => {
        mapRef.current?.flyTo({
          center: [longitude, latitude],
          zoom: mapzoom,
          essential: true,
        });
      });
      const newMarker = new mapboxgl.Marker({ element: el })
        .setLngLat([longitude, latitude])
        .addTo(mapRef.current);
      markerRef.current = newMarker;
    }
  }, [latitude, longitude]);


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
          startCountDown ? "block" : "hidden"
        } w-[60%] h-[50%] bg-[#2B2B2B]/80 rounded-2xl absolute text-5xl text-white flex justify-center items-center`}
      >
        <p>{countDown}</p>
      </div>
      {debugMsg && (
        <div className="absolute bottom-4 left-4 bg-black/80 text-green-400 p-3 rounded-md text-xs z-50 max-w-xs">
          {debugMsg}
        </div>
      )}
    </div>
  );
};

export default MapDisplay;
