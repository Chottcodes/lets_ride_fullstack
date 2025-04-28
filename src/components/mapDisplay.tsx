"use client";
import React, { useState } from "react";
import { useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import Image from "next/image";
import { Switch } from "./ui/switch";
import RouteImageInput from "./inputs/RouteImageInput";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "@/lib/firebase";
import PrimaryButton from "./buttons/PrimaryButton";
import { GetProfileById, PostRoute } from "./utils/DataServices";
import { RoutePostTypes } from "./utils/Interface";

const MapDisplay = () => {
  const [latitude, setLatitude] = useState<number>(37.7749);
  const [longitude, setLongitude] = useState<number>(-122.4194);
  const [userId, setUserID] = useState<number>();
  const [countDown, setCountDown] = useState<number>(3);
  const [cityName, setCityName] = useState<string>("");
  const [routeName, setRouteName] = useState<string>("");
  const [routeDescription, setRouteDescription] = useState<string>("");

  const [image, setImage] = useState<string | null>(null);
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [stopedRecording, setStoppedRecording] = useState<boolean>(false);
  const [startCountDown, setStartCountDown] = useState<boolean>(false);
  const [isPrivate, setIsPrivate] = useState<boolean>(false);
  const [isImageFilled, setIsImageFilled] = useState<boolean>(false);

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

  const handleImagePost = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    try {
      if (file) {
        const imageRef = ref(storage, `profilePicture/${userId}_${file?.name}`);
        await uploadBytes(imageRef, file);
        const url = await getDownloadURL(imageRef);
        setImage(url);
        setIsImageFilled(true);
        console.log("Uploaded profile picture URL:", url);
      } else {
        uploadDefaultPicture();
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  const uploadDefaultPicture = async () => {
    const defaultImagePath = "/assets/images/MotoRouteDefault.png";
    const defaultImageRef = ref(
      storage,
      `profilePictures/${userId}_${defaultImagePath}`
    );
    try {
      const defaultImage = await fetch(defaultImagePath);
      const blob = await defaultImage.blob();
      await uploadBytes(defaultImageRef, blob);
      const url = await getDownloadURL(defaultImageRef);
      setImage(url);
    } catch (error) {
      console.error("Error uploading default images:", error);
    }
  };

  const handlePostRoute = async () => {
    try {
      if (userId && image) {
        const routeData: RoutePostTypes = {
          CreatorId: userId,
          RouteName: routeName,
          RouteDescription: routeDescription,
          CityName: cityName,
          IsPrivate: isPrivate,
          IsDeleted: false,
          ImageUrl: image,
          PathCoordinates: path.map(([lng, lat]) => ({
            latitude: lat,
            longitude: lng,
          })),

        };
        const response = await PostRoute(routeData);
        if (response) {
          alert("Route posted successfully!");
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
  const getUserProfile = async (userId: number) => {
    if (userId !== undefined) {
      const res = await GetProfileById(userId);
      console.log(res);
      return res;
    }
  };

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
          "line-color": "#FFFFFF",
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
    if (userId) {
      getUserProfile(userId);
    }  
  }, [userId]);

  return (
    <div className="w-full h-full relative flex justify-center items-center text-white">
      <div
        className={`${stopedRecording ? "hidden" : "block"} w-full h-full`}
        ref={mapContainerRef}
      />
      <section
        className={`${
          stopedRecording ? "hidden" : "block"
        } w-full h-[12%] absolute bottom-0 flex justify-center items-start`}
      >
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
      <section
        className={`${
          stopedRecording ? "block" : "hidden"
        } h-full w-full flex justify-center items-center`}
      >
        <div className="h-full w-[90%] overflow-y-auto">
          <div className="h-[45%] w-full bg-black ">
            <RouteImageInput
              onChange={handleImagePost}
              isFileUploaded={isImageFilled}
              imageURL={image}
            />
          </div>
          <div className="h-[60%] flex flex-col justify-start items-center gap-2">
            <div className="h-[15%] w-full  flex justify-center items-center">
              <input
                className="w-[90%] h-[90%] bg-gray-600 rounded-lg pl-4"
                type="text"
                onChange={(e) => setCityName(e.target.value)}
                placeholder="City Name of Route"
              />
            </div>
            <div className="h-[15%] w-full  flex justify-center items-center">
              <input
                className="w-[90%] h-[90%] bg-gray-600 rounded-lg pl-4"
                type="text"
                onChange={(e) => setRouteName(e.target.value)}
                placeholder="Route Name"
              />
            </div>
            <div className="h-[30%] w-full flex justify-center items-center">
              <textarea
                className="w-[90%] h-[90%] bg-gray-600 rounded-lg pl-4"
                onChange={(e) => setRouteDescription(e.target.value)}
                value={routeDescription}
                placeholder="Description"
              />
            </div>
            <div className="h-[10%] w-[90%] flex justify-end items-center gap-2">
              <label htmlFor="private-switch">
                {isPrivate ? "Private" : "Public"}
              </label>
              <Switch
                id="private-switch"
                checked={isPrivate}
                onCheckedChange={setIsPrivate}
                className="data-[state=checked]:bg-blue-500 data-[state=unchecked]:bg-gray-300"
              />
            </div>
            <div className="w-[50%] h-[15%]">
              <PrimaryButton
                buttonText={"Post"}
                isBackgroundDark={false}
                onClick={handlePostRoute}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MapDisplay;
