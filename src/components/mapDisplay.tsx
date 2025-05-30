"use client";
// All commented out code is for adding image to routes. Don't forget to check the "RoutePostTypes" interface aswell!

import React, { useState } from "react";
import { useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

import { Switch } from "./ui/switch";
// import RouteImageInput from "./inputs/RouteImageInput";
// import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
// import { storage } from "@/lib/firebase";
import PrimaryButton from "./buttons/PrimaryButton";
import {  PostRoute } from "./utils/DataServices";
import { RoutePostTypes } from "./utils/Interface";

const MapDisplay = () => {
  const [latitude, setLatitude] = useState<number>(37.7749);
  const [longitude, setLongitude] = useState<number>(-122.4194);
  const [userId, setUserID] = useState<number>();
  const [countDown, setCountDown] = useState<number>(3);
  const [cityName, setCityName] = useState<string>("");
  const [routeName, setRouteName] = useState<string>("");
  const [routeDescription, setRouteDescription] = useState<string>("");

  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [stopedRecording, setStoppedRecording] = useState<boolean>(false);
  const [startCountDown, setStartCountDown] = useState<boolean>(false);
  const [isPrivate, setIsPrivate] = useState<boolean>(false);

  // const [image, setImage] = useState<string | null>(null);
  // const [isImageFilled, setIsImageFilled] = useState<boolean>(false);

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

    navigator.geolocation.getCurrentPosition((pos) => {
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
    }, handleError);
  };

  const handleStopButton = () => {
    setIsRecording(false);
    setStoppedRecording(true);

    if (watchIdRef.current !== null) {
      navigator.geolocation.clearWatch(watchIdRef.current);
      watchIdRef.current = null;
    }
  };

  // const handleImagePost = async (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = e.target.files?.[0];

  //   try {
  //     if (file) {
  //       const imageRef = ref(storage, `profilePicture/${userId}_${file?.name}`);
  //       await uploadBytes(imageRef, file);
  //       const url = await getDownloadURL(imageRef);
  //       // setImage(url);
  //       // setIsImageFilled(true);
  //       console.log("Uploaded profile picture URL:", url);
  //     } else {
  //       uploadDefaultPicture();
  //     }
  //   } catch (error) {
  //     console.error("Error uploading file:", error);
  //   }
  // };

  // const uploadDefaultPicture = async () => {
  //   const defaultImagePath = "/assets/images/MotoRouteDefault.png";
  //   const defaultImageRef = ref(
  //     storage,
  //     `profilePictures/${userId}_${defaultImagePath}`
  //   );
  //   try {
  //     const defaultImage = await fetch(defaultImagePath);
  //     const blob = await defaultImage.blob();
  //     await uploadBytes(defaultImageRef, blob);
  //     const url = await getDownloadURL(defaultImageRef);
  //     setImage(url);
  //   } catch (error) {
  //     console.error("Error uploading default images:", error);
  //   }
  // };

  const handlePostRoute = async () => {
    try {
      if(userId){ //&& image inside the parameter here for adding image
        
        const routeData:RoutePostTypes = {
          CreatorId: userId,
          RouteName: routeName,
          RouteDescription: routeDescription,
          CityName: cityName,
          IsPrivate: isPrivate,
          IsDeleted: false,
          // ImageUrl: image,
          PathCoordinates: path.map(([lng, lat]) => ({
            latitude: lat,
            longitude: lng,
          })),
        };
        const response = await PostRoute(routeData);
        if (response) {
          alert("Route posted successfully!");
          setStoppedRecording(false);
        } else {
          alert("Failed to post route.");
        }
      }
    } catch (error) {
      console.error("Error posting route:", error);
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

  // const getUserProfile = async (userId: number) => {
  //   if (userId !== undefined) {
  //     const res = await GetProfileById(userId);
  //     return res;
  //   }
  // };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const userId = localStorage.getItem("ID");
      if (userId) {
        setUserID(Number(userId));
      }
    }
    if (!mapContainerRef.current || mapRef.current) return;

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/chott1/cm82q157o00aq01sjhffp707j",
      center: [longitude, latitude],
      zoom: mapzoom,
      attributionControl: false,
    });

    map.on("load", () => {
      mapRef.current = map;

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
          "line-color": "#FF3B30",
          "line-width": 4,
        },
      });

      geojsonSourceRef.current = map.getSource(
        "route"
      ) as mapboxgl.GeoJSONSource;

      // Create initial marker only after map is loaded
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
    });

    return () => {
      if (map) map.remove();
    };
  }, []);

  useEffect(() => {
    if (mapRef.current && longitude && latitude) {
      mapRef.current.setCenter([longitude, latitude]);

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

      if (markerRef.current) {
        markerRef.current.remove();
      }

      const newMarker = new mapboxgl.Marker({ element: el })
        .setLngLat([longitude, latitude])
        .addTo(mapRef.current);
      markerRef.current = newMarker;
    }
  }, [latitude, longitude]);

  useEffect(() => {
    console.log(path);
  }, [path]);
  useEffect(() => {
    console.log("City Name: ", cityName);
    console.log("Route Name: ", routeName);
    console.log("Route Description: ", routeDescription);
    console.log("Is Private: ", isPrivate);
  }, [cityName, routeName, routeDescription, isPrivate]);

  return (
    <div className="w-full h-full relative flex justify-center items-center text-white overflow-hidden">
      {/* Map Container */}
      <div
        className={`${
          stopedRecording ? "hidden" : "block"
        } w-full h-full relative`}
        ref={mapContainerRef}
      >
        {/* Modern overlay gradient for better button visibility */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/40 via-black/20 to-transparent pointer-events-none z-10" />
      </div>

      {/* Recording Controls - Mobile Only */}
      <section
        className={`${
          stopedRecording ? "hidden" : "flex"
        } absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20 md:hidden`}
      >
        {/* Start Recording Button */}
        <button
          className={`${
            isRecording ? "hidden" : "flex"
          } items-center justify-center w-20 h-20 bg-white/10 backdrop-blur-md rounded-full border border-white/20 shadow-2xl hover:bg-white/20 transition-all duration-300 active:scale-95`}
          onClick={startRecord}
        >
          <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center shadow-lg">
            <div className="w-6 h-6 bg-white rounded-full" />
          </div>
        </button>

        {/* Stop Recording Button */}
        <button
          className={`${
            isRecording
              ? "flex animate-pulse"
              : "hidden"
          } items-center justify-center w-20 h-20 bg-red-500/20 backdrop-blur-md rounded-full border border-red-500/30 shadow-2xl hover:bg-red-500/30 transition-all duration-300 active:scale-95`}
          onClick={handleStopButton}
        >
          <div className="w-8 h-8 bg-red-500 rounded-sm shadow-lg" />
        </button>
      </section>

      {/* Countdown Overlay */}
      <div
        className={`${
          startCountDown ? "flex" : "hidden"
        } absolute inset-0 bg-black/70 backdrop-blur-sm z-30 items-center justify-center`}
      >
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-12 border border-white/20 shadow-2xl">
          <div className="text-8xl font-bold text-white text-center animate-pulse">
            {countDown}
          </div>
          <div className="text-xl text-white/80 text-center mt-4">
            Starting recording...
          </div>
        </div>
      </div>

      {/* Route Details Form */}
      <section
        className={`${
          stopedRecording ? "flex" : "hidden"
        } absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 z-20 flex-col`}
      >
        {/* Header */}
        <div className="flex-shrink-0 px-4 py-6 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              Share Your Route
            </h2>
            <p className="text-gray-300 text-sm sm:text-base">
              Add details to make your route discoverable
            </p>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-4 sm:px-6 lg:px-8 pb-6">
          <div className="max-w-2xl mx-auto space-y-6">
            
            {/* Image Upload Section */}
            {/* <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden">
              <div className="aspect-video relative">
                <RouteImageInput
                  onChange={handleImagePost}
                  isFileUploaded={isImageFilled}
                  imageURL={image}
                />
              </div>
            </div> */}

            {/* Form Fields */}
            <div className="space-y-4">
              
              {/* City Name */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300 block">
                  City
                </label>
                <input
                  className="w-full h-12 sm:h-14 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all duration-200"
                  type="text"
                  onChange={(e) => setCityName(e.target.value)}
                  placeholder="Enter city name"
                  value={cityName}
                />
              </div>

              {/* Route Name */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300 block">
                  Route Name
                </label>
                <input
                  className="w-full h-12 sm:h-14 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all duration-200"
                  type="text"
                  onChange={(e) => setRouteName(e.target.value)}
                  placeholder="Give your route a name"
                  value={routeName}
                />
              </div>

              {/* Description */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300 block">
                  Description
                </label>
                <textarea
                  className="w-full h-24 sm:h-32 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all duration-200 resize-none"
                  onChange={(e) => setRouteDescription(e.target.value)}
                  value={routeDescription}
                  placeholder="Describe your route, highlights, difficulty level..."
                />
              </div>

              {/* Privacy Toggle */}
              <div className="flex items-center justify-between p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
                <div className="flex-1">
                  <div className="font-medium text-white text-sm sm:text-base">
                    Route Visibility
                  </div>
                  <div className="text-xs sm:text-sm text-gray-400 mt-1">
                    {isPrivate 
                      ? "Only you can see this route" 
                      : "Everyone can discover this route"
                    }
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <span className={`text-sm ${isPrivate ? 'text-gray-400' : 'text-white font-medium'}`}>
                    Public
                  </span>
                  <Switch
                    id="private-switch"
                    checked={isPrivate}
                    onCheckedChange={setIsPrivate}
                    className="data-[state=checked]:bg-blue-500 data-[state=unchecked]:bg-gray-500"
                  />
                  <span className={`text-sm ${isPrivate ? 'text-white font-medium' : 'text-gray-400'}`}>
                    Private
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Action Area */}
        <div className="flex-shrink-0 p-4 sm:p-6 lg:p-8 bg-gradient-to-t from-black/20 to-transparent">
          <div className="max-w-2xl mx-auto">
            <PrimaryButton
              buttonText="Share Route"
              isBackgroundDark={false}
              onClick={handlePostRoute}
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default MapDisplay;