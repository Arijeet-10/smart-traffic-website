"use client";

import React, { useEffect, useState } from 'react';
// Use the maplibre wrapper specifically
import Map from 'react-map-gl/maplibre';
import DeckGL from '@deck.gl/react';
import { ScatterplotLayer } from '@deck.gl/layers';

// MapLibre base CSS
import 'maplibre-gl/dist/maplibre-gl.css';

const INITIAL_VIEW_STATE = {
  longitude: 88.3639, // Kolkata Longitude
  latitude: 22.5726,  // Kolkata Latitude
  zoom: 13,
  pitch: 45,
  bearing: 0
};

interface Vehicle {
  id: string;
  longitude: number;
  latitude: number;
  angle: number;
}

export default function TrafficMap() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);

  useEffect(() => {
    // Connect to the local WebSocket streaming SUMO data
    const ws = new WebSocket('ws://localhost:8080');

    ws.onopen = () => console.log('Connected to SUMO WebSocket server');

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (Array.isArray(data)) {
          setVehicles(data);
        }
      } catch (error) {
        console.error('Failed to parse WebSocket message:', error);
      }
    };

    ws.onerror = (error) => {
      console.error('WebSocket Error:', error);
    };

    return () => {
      // Clean up WebSocket connection when component unmounts
      if (ws.readyState === WebSocket.OPEN) {
        ws.close();
      }
    };
  }, []);

  const layers = [
    // Using ScatterplotLayer to render moving red dots based on coordinates.
    // If you wish to use the 'angle' property for arrow directions, you can later replace this with an IconLayer!
    new ScatterplotLayer({
      id: 'vehicle-scatterplot-layer',
      data: vehicles,
      getPosition: (d: Vehicle) => [d.longitude, d.latitude],
      getFillColor: [255, 0, 0, 200], // Red dots for traffic
      getRadius: 10,
      radiusMinPixels: 4,
      radiusMaxPixels: 15,
      pickable: true,
      transitions: {
        // Optional: Smooth interpolation so cars glide rather than teleport
        getPosition: 100, 
      }
    })
  ];

  return (
    <div className="relative w-full h-full min-h-[500px] rounded-[2rem] overflow-hidden custom-map-wrapper">
      <DeckGL
        initialViewState={INITIAL_VIEW_STATE}
        controller={true}
        layers={layers}
      >
        <Map 
          // Open-source MapLibre Dark Matter basemap (no token required!)
          mapStyle="https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json"
        />
      </DeckGL>
    </div>
  );
}
