import React, { useEffect, useState, useRef } from "react";
import Map from "ol/Map";
import View from "ol/View";
import { fromLonLat } from "ol/proj";
import OSM from "ol/source/OSM";
import TileLayer from "ol/layer/Tile";
import { defaults as defaultControls } from "ol/control";
import "ol/ol.css";

import './MapComponent.css'

import Sidebar from "./Sidebar";
import MapBoarderLayer from "./MapBoarderLayer";

const MapComponent = () => {
  const [selectedLayer, setSelectedLayer] = useState("states");
  const mapRef = useRef(null);

  const handleLayerChange = (event) => {
    setSelectedLayer(event.target.value);
  };

  useEffect(() => {
    const map = new Map({
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      view: new View({
        enableRotation: false,
        multiWorld: false,
        constrainResolution: true,
        center: fromLonLat([-96, 37.8]),
        zoom: 4,
      }),
      controls: defaultControls({
        zoom: true,
        attribution: true,
      }),
    });

    mapRef.current = map;
    map.setTarget("map"); 

    return () => {
      map.setTarget(null); 
    };
  }, []);

  useEffect(() => {
    const map = mapRef.current;
    if (map) {
      map.updateSize(); 
    }
  }, [selectedLayer]);

  return (
    <>
      <div id="map"></div>
      <Sidebar handleLayerChange={handleLayerChange} />
      {/* {mapRef.current && (
        
      )} */}
      <MapBoarderLayer map={mapRef.current} borderLayer={selectedLayer} />
    </>
  );
};

export default MapComponent;
