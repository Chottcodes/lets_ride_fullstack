"use client";
import React, { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";

interface MapProps {
  StartingPointcoordinates: [number, number];
  trailCoordinates?: [number, number][];
  zoom: number;
}
const MapsUserCards = (props: MapProps) => {
  const { StartingPointcoordinates, zoom, trailCoordinates } = props;
  const mapContainerRef = useRef<HTMLDivElement>(null);
  
  mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

  useEffect(() => {
    if (!mapContainerRef.current) return;

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/chott1/cm82q157o00aq01sjhffp707j",
      center: StartingPointcoordinates || [-122.4194, 47.2529],
      zoom: 12,
      attributionControl: false,
    });

    map.on("load", () => {
      map.addSource("trail", {
        type: "geojson",
        data: {
          type: "Feature",
          properties: {},
          geometry: {
            type: "LineString",
            coordinates: trailCoordinates || [[-122.4194, 47.2529]],
          },
        },
      });

      map.addLayer({
        id: "trail-line",
        type: "line",
        source: "trail",
        layout: {
          "line-join": "round",
          "line-cap": "round",
        },
        paint: {
          "line-color": "#90EE90",
          "line-width": 4,
        },
      });

      new mapboxgl.Marker().setLngLat(StartingPointcoordinates).addTo(map);
    });

    return () => map.remove();
  }, [StartingPointcoordinates,zoom]);

  return (
    <div className="w-full h-full">
      <div ref={mapContainerRef} className="w-full h-full" />
    </div>
  );
};

export default MapsUserCards;
