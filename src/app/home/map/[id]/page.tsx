"use client";

import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import { useParams, useRouter } from "next/navigation";
import { GetRouteCoordsByID } from "@/components/utils/DataServices";
import { RouteCoordinate } from "@/components/utils/Interface";
import "mapbox-gl/dist/mapbox-gl.css";
import { useProfilePicture } from "@/hooks/useProfilePicture";

const accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;
if (accessToken) mapboxgl.accessToken = accessToken;

interface UserLocation {
  latitude: number;
  longitude: number;
}

export default function RoutePage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id;
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const userMarkerRef = useRef<mapboxgl.Marker | null>(null);

  const [coordinates, setCoordinates] = useState<RouteCoordinate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userLocation, setUserLocation] = useState<UserLocation | null>(null);
  const [locationPermission, setLocationPermission] = useState<
    "pending" | "granted" | "denied"
  >("pending");
  const [isNavigating, setIsNavigating] = useState(false);
  const [distanceToStart, setDistanceToStart] = useState<number | null>(null);
  const [isOnRoute, setIsOnRoute] = useState(false);
  const [panelExpanded, setPanelExpanded] = useState(true);
  const retractTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const profilePicture = useProfilePicture();

  const handleBack = () => {
    if (isNavigating) {
      setIsNavigating(false);
    }
    router.back();
  };

  const createUserMarker = (profilePictureUrl?: string): HTMLElement => {
    const el = document.createElement("div");
    el.style.cssText = `
      width: 44px; height: 44px; border-radius: 50%;
      border: 3px solid #3B82F6; 
      cursor: pointer; background-size: cover; background-position: center;
      position: relative; transition: all 0.3s ease;
    `;

    if (profilePictureUrl) {
      el.style.backgroundImage = `url(${profilePictureUrl})`;
    } else {
      el.style.background = "linear-gradient(135deg, #3B82F6, #1D4ED8)";
      el.innerHTML =
        '<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;color:white;font-size:18px;">👤</div>';
    }

    return el;
  };

  const requestLocation = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
        setLocationPermission("granted");
      },
      (error) => {
        setLocationPermission("denied");
        setError("Location access required for navigation.");
        console.error("Geolocation error:", error);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 30000 }
    );
  };

  const calculateDistance = (
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ): number => {
    const R = 6371;
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) ** 2;
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  };

  const checkIfOnRoute = (
    userLoc: UserLocation,
    routeCoords: RouteCoordinate[]
  ): boolean => {
    return routeCoords.some(
      (coord) =>
        calculateDistance(
          userLoc.latitude,
          userLoc.longitude,
          coord.latitude,
          coord.longitude
        ) < 0.05
    );
  };

  const updateUserToStartLine = (map: mapboxgl.Map) => {
    if (!userLocation || coordinates.length === 0 || !map.isStyleLoaded()) return;

    const startCoord = coordinates[0];
    const distance = calculateDistance(
      userLocation.latitude,
      userLocation.longitude,
      startCoord.latitude,
      startCoord.longitude
    );
    setDistanceToStart(distance * 1000); // Convert to meters

    // Remove existing line if it exists
    if (map.getSource("user-to-start")) {
      map.removeLayer("user-to-start");
      map.removeSource("user-to-start");
    }

    // Only add line if user is not on route
    if (!checkIfOnRoute(userLocation, coordinates)) {
      const lineCoords = [
        [userLocation.longitude, userLocation.latitude],
        [startCoord.longitude, startCoord.latitude]
      ];

      map.addSource("user-to-start", {
        type: "geojson",
        data: {
          type: "Feature",
          properties: {},
          geometry: { type: "LineString", coordinates: lineCoords },
        },
      });

      map.addLayer({
        id: "user-to-start",
        type: "line",
        source: "user-to-start",
        layout: { "line-join": "round", "line-cap": "round" },
        paint: {
          "line-color": "#3B82F6",
          "line-width": 3,
          "line-dasharray": [2, 2],
          "line-opacity": 0.8,
        },
      });
    }
  };

  // Watch user location
  useEffect(() => {
    if (locationPermission === "granted" && navigator.geolocation) {
      const watchId = navigator.geolocation.watchPosition(
        (position) => {
          const newLocation = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          };
          setUserLocation(newLocation);

          if (coordinates.length > 0) {
            const onRoute = checkIfOnRoute(newLocation, coordinates);
            setIsOnRoute(onRoute);
          }
        },
        (error) => console.error("Location watch error:", error),
        { enableHighAccuracy: true, maximumAge: 3000, timeout: 10000 }
      );
      return () => navigator.geolocation.clearWatch(watchId);
    }
  }, [locationPermission, coordinates]);

  // Fetch route data
  useEffect(() => {
    const fetchRouteData = async () => {
      try {
        setLoading(true);
        setError(null);

        if (typeof id === "string") {
          const numericId = Number(id);
          if (!isNaN(numericId)) {
            const res = await GetRouteCoordsByID(numericId);
            if (res?.length > 0) {
              setCoordinates(res);
            } else {
              setError("Route not found");
            }
          } else {
            setError("Invalid route ID");
          }
        } else {
          setError("Route ID is required");
        }
      } catch (error) {
        setError("Failed to load route");
        console.error("Error fetching route data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchRouteData();
  }, [id]);

  // Initialize map
  useEffect(() => {
    if (!mapContainerRef.current || !accessToken || coordinates.length === 0)
      return;

    if (mapRef.current) {
      mapRef.current.remove();
      mapRef.current = null;
    }

    const mappedCoords = coordinates.map(
      (coord) => [coord.longitude, coord.latitude] as [number, number]
    );
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/chott1/cm82q157o00aq01sjhffp707j",
      center: mappedCoords[0],
      zoom: 14,
      attributionControl: false,
    });

    mapRef.current = map;

    map.on("load", () => {
      // Add route
      map.addSource("route", {
        type: "geojson",
        data: {
          type: "Feature",
          properties: {},
          geometry: { type: "LineString", coordinates: mappedCoords },
        },
      });

      map.addLayer({
        id: "route-glow",
        type: "line",
        source: "route",
        layout: { "line-join": "round", "line-cap": "round" },
        paint: {
          "line-color": "#FFFF00",
          "line-width": 8,
          "line-opacity": 0.4,
          "line-blur": 2,
        },
      });

      map.addLayer({
        id: "route",
        type: "line",
        source: "route",
        layout: { "line-join": "round", "line-cap": "round" },
        paint: { "line-color": "#008000", "line-width": 4 },
      });

      // Add markers
      const createMarker = (
        coords: [number, number],
        color: string,
        symbol: string,
        label: string
      ) => {
        const el = document.createElement("div");
        el.innerHTML = `<div style="width:32px;height:32px;background:${color};border-radius:50%;display:flex;align-items:center;justify-content:center;box-shadow:0 4px 12px ${color}40;color:white;font-weight:bold;">${symbol}</div>`;
        return new mapboxgl.Marker({ element: el })
          .setLngLat(coords)
          .setPopup(
            new mapboxgl.Popup({ offset: 25 }).setHTML(
              `<strong>${label}</strong>`
            )
          )
          .addTo(map);
      };

      createMarker(
        mappedCoords[0],
        "linear-gradient(135deg, #10B981, #059669)",
        "▶",
        "Route Start"
      );
      if (mappedCoords.length > 1) {
        createMarker(
          mappedCoords[mappedCoords.length - 1],
          "linear-gradient(135deg, #EF4444, #DC2626)",
          "⬛",
          "Route End"
        );
      }

      // Add user marker
      if (userLocation) {
        if (userMarkerRef.current) userMarkerRef.current.remove();
        const userMarkerEl = createUserMarker(profilePicture ?? undefined);
        userMarkerRef.current = new mapboxgl.Marker({ element: userMarkerEl })
          .setLngLat([userLocation.longitude, userLocation.latitude])
          .setPopup(
            new mapboxgl.Popup({ offset: 25 }).setHTML(
              "<strong>Your Location</strong>"
            )
          )
          .addTo(map);

        // Add line from user to start
        updateUserToStartLine(map);
      }

      // Fit bounds
      const bounds = new mapboxgl.LngLatBounds();
      mappedCoords.forEach((coord) => bounds.extend(coord));
      if (userLocation)
        bounds.extend([userLocation.longitude, userLocation.latitude]);
      map.fitBounds(bounds, { padding: 80, maxZoom: 16 });
    });

    return () => {
      mapRef.current?.remove();
      userMarkerRef.current?.remove();
      mapRef.current = null;
      userMarkerRef.current = null;
    };
  }, [coordinates, accessToken, userLocation, profilePicture]);

  // Update user-to-start line when user location changes
  useEffect(() => {
    if (mapRef.current && userLocation && coordinates.length > 0) {
      // Wait for style to load if it hasn't already
      if (mapRef.current.isStyleLoaded()) {
        updateUserToStartLine(mapRef.current);
      } else {
        mapRef.current.once('styledata', () => {
          updateUserToStartLine(mapRef.current!);
        });
      }
      
      // Update user marker position
      if (userMarkerRef.current) {
        userMarkerRef.current.setLngLat([userLocation.longitude, userLocation.latitude]);
      }
    }
  }, [userLocation, coordinates, isOnRoute]);

  const startNavigation = () => {
    if (userLocation && coordinates.length > 0) {
      setIsNavigating(true);
    }
  };

  const stopNavigation = () => {
    setIsNavigating(false);
  };

  const expandPanel = () => {
    setPanelExpanded(true);
    // Clear any existing timeout
    if (retractTimeoutRef.current) {
      clearTimeout(retractTimeoutRef.current);
    }
    // Set new timeout to retract after 2 seconds
    retractTimeoutRef.current = setTimeout(() => {
      setPanelExpanded(false);
    }, 2000);
  };

  const togglePanel = () => {
    if (panelExpanded) {
      setPanelExpanded(false);
      if (retractTimeoutRef.current) {
        clearTimeout(retractTimeoutRef.current);
      }
    } else {
      expandPanel();
    }
  };

  // Auto-expand panel when navigation starts
  useEffect(() => {
    if (isNavigating) {
      expandPanel();
    }
  }, [isNavigating]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (retractTimeoutRef.current) {
        clearTimeout(retractTimeoutRef.current);
      }
    };
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <div className="text-lg font-medium text-gray-700">
            Loading route...
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
          <div className="text-5xl mb-4">⚠️</div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">
            Unable to Load Route
          </h2>
          <p className="text-gray-600 mb-6">{error}</p>
          {error.includes("Location") && (
            <button
              onClick={requestLocation}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition-colors"
            >
              Enable Location
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-screen">
      <div ref={mapContainerRef} className="w-full h-full" />

      {/* Back Button */}
      <button
        onClick={handleBack}
        className="absolute top-4 left-4 z-50 bg-white bg-opacity-90 backdrop-blur-sm hover:bg-opacity-100 text-gray-700 rounded-2xl p-4 shadow-lg border transition-all duration-300 hover:scale-105"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      {/* Location Permission Prompt */}
      {locationPermission === "pending" && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full">
            <div className="text-4xl mb-4 text-center">🚗</div>
            <h3 className="text-xl font-bold text-gray-800 mb-3 text-center">
              Enable Location for Navigation
            </h3>
            <p className="text-gray-600 mb-6 text-center text-sm">
              Share your location to see your position on the route and get distance information.
            </p>

            <button
              onClick={requestLocation}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-4 px-6 rounded-xl transition-all hover:scale-105"
            >
              🚗 Share Location
            </button>
          </div>
        </div>
      )}

      {/* Navigation Panel */}
      {locationPermission === "granted" && userLocation && (
        <div className="absolute top-4 left-24 right-4 md:right-auto md:max-w-sm z-40">
          {/* Collapsed state - just a small button */}
          {!panelExpanded && (
            <button
              onClick={togglePanel}
              className="bg-white bg-opacity-95 backdrop-blur-sm rounded-2xl shadow-xl border p-4 hover:scale-105 transition-all duration-300"
            >
              <div className="flex items-center gap-2">
                <div
                  className={`w-3 h-3 rounded-full ${
                    isNavigating ? "bg-green-500 animate-pulse" : "bg-blue-500"
                  }`}
                ></div>
                <span className="text-sm font-medium text-gray-700">
                  {isNavigating ? "Navigating" : "🚗 Navigation"}
                </span>
                <svg
                  className="w-4 h-4 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </button>
          )}

          {/* Expanded panel */}
          {panelExpanded && (
            <div className="bg-white bg-opacity-95 backdrop-blur-sm rounded-2xl shadow-xl border transition-all duration-300 ease-out">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-gray-800">
                    {isNavigating ? "🚗 Navigation Active" : "🚗 Ready to Navigate"}
                  </h3>
                  <button
                    onClick={togglePanel}
                    className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                  >
                    <svg
                      className="w-4 h-4 text-gray-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 15l7-7 7 7"
                      />
                    </svg>
                  </button>
                </div>

                {!isNavigating ? (
                  <>
                    <div
                      className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium mb-4 ${
                        isOnRoute
                          ? "bg-green-100 text-green-800"
                          : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {isOnRoute ? "✅ On Route" : "📍 Go to Start"}
                    </div>

                    {!isOnRoute && distanceToStart && (
                      <div className="bg-blue-50 rounded-xl p-4 mb-4">
                        <p className="text-blue-800 font-semibold">
                          Distance to Route Start
                        </p>
                        <p className="text-blue-600 text-sm">
                          {distanceToStart > 1000
                            ? `${Math.round((distanceToStart / 1000) * 10) / 10} km`
                            : `${Math.round(distanceToStart)} m`} away
                        </p>
                      </div>
                    )}

                    <button
                      onClick={startNavigation}
                      className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold py-3 px-6 rounded-xl transition-all"
                    >
                      🚗 Start Navigation
                    </button>
                  </>
                ) : (
                  <>
                    {isOnRoute ? (
                      <div className="text-center py-4">
                        <div className="text-3xl mb-2">🎯</div>
                        <p className="text-green-600 font-semibold text-lg">
                          Following Route
                        </p>
                        <p className="text-gray-600 text-sm">
                          Stay on the path
                        </p>
                      </div>
                    ) : (
                      <div className="text-center py-4">
                        <div className="text-3xl mb-2">🚗</div>
                        <p className="text-blue-600 font-semibold text-lg">
                          Head to Route Start
                        </p>
                        {distanceToStart && (
                          <p className="text-gray-600 text-sm">
                            {distanceToStart > 1000
                              ? `${Math.round((distanceToStart / 1000) * 10) / 10} km`
                              : `${Math.round(distanceToStart)} m`} away
                          </p>
                        )}
                      </div>
                    )}

                    <button
                      onClick={stopNavigation}
                      className="w-full mt-4 bg-gray-500 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded-xl transition-colors"
                    >
                      Stop Navigation
                    </button>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Location Denied Message */}
      {locationPermission === "denied" && (
        <div className="absolute bottom-4 left-4 right-4 z-40">
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 shadow-lg">
            <div className="flex items-start">
              <div className="text-2xl mr-3">⚠️</div>
              <div>
                <h3 className="font-bold text-amber-800 mb-1">
                  Location Access Required
                </h3>
                <p className="text-amber-700 text-sm">
                  Enable location services to see your position and distance to route start.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}