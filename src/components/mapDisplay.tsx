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
  //map ref and marker ref
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const markerRef = useRef<mapboxgl.Marker | null>(null);
  const watchIdRef = useRef<number | null>(null);
  //tracking Refs and array
  const [path, setPath] = useState<[number, number][]>([]);

  const geojsonSourceRef = useRef<mapboxgl.GeoJSONSource | null>(null);
  //map zoom level
  const mapzoom: number = 15;
  mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

  const startRecord = () => {
    if (typeof window === "undefined" || !navigator.geolocation) {
      alert("Geolocation not supported on this device/browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setLatitude(latitude);
        setLongitude(longitude);
        setStartCountDown(true);

        // Start countdown
        let counter = 3;
        const interval = setInterval(() => {
          counter -= 1;
          if (counter > 0) setCountDown(counter);
          if (counter === 0) {
            clearInterval(interval);
            setIsRecording(true);
            setStartCountDown(false);
            setCountDown(3);

            // Start watching position for smooth live tracking
            const watchId = navigator.geolocation.watchPosition(
              (pos) => {
                const { latitude, longitude } = pos.coords;
                setLatitude(latitude);
                setLongitude(longitude);

                const newPoint: [number, number] = [longitude, latitude];
                setPath((prevPath) => {
                  // Optional: filter out tiny GPS noise
                  if (
                    prevPath.length === 0 ||
                    isSignificantChange(prevPath[prevPath.length - 1], newPoint)
                  ) {
                    const updatedPath = [...prevPath, newPoint];

                    if (geojsonSourceRef.current) {
                      geojsonSourceRef.current.setData({
                        type: "Feature",
                        properties: {},
                        geometry: {
                          type: "LineString",
                          coordinates: updatedPath,
                        },
                      });
                    }

                    return updatedPath;
                  }
                  return prevPath;
                });
              },
              handleError,
              {
                enableHighAccuracy: true,
                maximumAge: 1000,
                timeout: 10000,
              }
            );

            watchIdRef.current = watchId;
          }
        }, 1000);
      },
      handleError
    );
  };

  const handleStopButton = () => {
    setIsRecording(false);

    if (watchIdRef.current !== null) {
      navigator.geolocation.clearWatch(watchIdRef.current);
      watchIdRef.current = null;
    }

  };

  const isSignificantChange = (
    prev: [number, number],
    next: [number, number]
  ) => {
    const [prevLng, prevLat] = prev;
    const [nextLng, nextLat] = next;
    const threshold = 0.00005;
    return (
      Math.abs(prevLng - nextLng) > threshold ||
      Math.abs(prevLat - nextLat) > threshold
    );
  };

  const handleError = (error: { message: string }) => {
    alert(
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

    map.on("load", () => {
      map.addSource("route", {
        type: "geojson",
        data: {
          type: "Feature",
          properties: {},
          geometry: {
            type: "LineString",
            coordinates: [],
          },
        },
      });

      map.addLayer({
        id: "route-line",
        type: "line",
        source: "route",
        layout: {
          "line-join": "round",
          "line-cap": "round",
        },
        paint: {
          "line-color": "#FFFFFF", 
          "line-width": 4,
        },
      });

      geojsonSourceRef.current = map.getSource(
        "route"
      ) as mapboxgl.GeoJSONSource;
    });

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
  useEffect(() => {
    console.log(path);
  }, [path]);

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
          onClick={handleStopButton}
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
    </div>
  );
};

export default MapDisplay;
