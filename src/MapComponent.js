import React, { useEffect, useRef, useState } from 'react';
import 'ol/ol.css';
import { Map as OlMap, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import OSM from 'ol/source/OSM';
import VectorSource from 'ol/source/Vector';
import GeoJSON from 'ol/format/GeoJSON';
import { Fill, Stroke, Style } from 'ol/style';
import { defaults as defaultControls } from 'ol/control';

import './MapComponent.css';


const usaCounties = require('./USACounties.json');
const usaStates = require('./USAStates.json');



const MapComponent = () => {
  const mapContainerRef = useRef(null);
  const [selectedLayer, setSelectedLayer] = useState('counties');

  useEffect(() => {
    const map = new OlMap({
      target: mapContainerRef.current,
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
        new VectorLayer({
          source: new VectorSource({
            features: new GeoJSON().readFeatures(selectedLayer === 'counties' ? usaCounties : usaStates, {
              dataProjection: 'EPSG:4326',
              featureProjection: 'EPSG:3857',
            }),
          }),
          style: (feature) => {
            const color = ['red', 'green', 'blue', 'orange'];
            const randomColor = color[Math.floor(Math.random() * color.length)];

            return new Style({
              fill: new Fill({
                color: randomColor,
              }),
              stroke: new Stroke({
                color: 'black',
                width: 2,
              }),
            });
          },
        }),
      ],
      controls: defaultControls({
        zoomOptions: {
          className: 'custom-zoom-controls',
        },
      }),
      view: new View({
        center: [-11000000, 5000000],
        zoom: 4,
      }),
    });

    return () => {
      map.setTarget(null);
    };
  }, [selectedLayer]);

  const handleLayerChange = (event) => {
    setSelectedLayer(event.target.value);
  };

  return (
    <div className="map-container">
      <div ref={mapContainerRef} className="map" />
      <div className="sidebar-overlay">
        <div className="sidebar">
          <div className="dropdown">
            <label htmlFor="layerSelect">Select Layer:</label>
            <select id="layerSelect" value={selectedLayer} onChange={handleLayerChange}>
              <option value="counties">US Counties</option>
              <option value="states">US States</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapComponent;
