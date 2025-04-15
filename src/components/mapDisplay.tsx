"use client";
import React, { useState } from "react";
import { useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

const MapDisplay = () => {
  const [location, setLocation] = useState<{ lat: number; lng: number }>({
    lat: 0,
    lng: 0,
  });
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapzoom: number = 12;

  useEffect(() => {
    if (!navigator.geolocation) {
      alert("browser not supported");
      setLocation({ lat: 37.7749, lng: -122.4194 });
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      (error) => {
        console.warn(error);
        setLocation({ lat: 37.7749, lng: -122.4194 });
      },
      {
        enableHighAccuracy: true,
      }
    );
  }, []);

  useEffect(() => {
    if (!location || !mapContainerRef.current) return;
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/chott1/cm82q157o00aq01sjhffp707j",
      center: [location.lng, location.lat],
      zoom: mapzoom,
    });
    new mapboxgl.Marker().setLngLat([location.lng, location.lat]).addTo(map);
    return () => map.remove();
  }, [location]);

  return (
    <div className="w-full h-full relative text-white">
      <div className="w-full h-full" ref={mapContainerRef} />
    </div>
  );
};

export default MapDisplay;
