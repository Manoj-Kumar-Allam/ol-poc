import { useEffect } from "react";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import GeoJSON from "ol/format/GeoJSON";

import countiesData from "../data/us-counties.json";
import statesData from "../data/us-states.json";
import Style from "ol/style/Style";
import Stroke from "ol/style/Stroke";
import Fill from "ol/style/Fill";

var borderLayerKey = "states";

const MapBoarderLayer = ({ map, borderLayer }) => {
  useEffect(() => {
    if (map) {
      removeBorderLayer(map);

      if (borderLayer === "states") {
        borderLayerKey = "states";
        addBorderLayer(map, statesData);
      } else {
        borderLayerKey = "counties";
        addBorderLayer(map, countiesData);
      }
    }
  }, [map, borderLayer]);

  return null; // Since this component doesn't render anything, return null
};

function addBorderLayer(map, data) {
  const vectorSource = new VectorSource({
    features: new GeoJSON().readFeatures(data, {
      dataProjection: "EPSG:4326",
      featureProjection: "EPSG:3857",
    }),
  });

  const vectorLayer = new VectorLayer({
    source: vectorSource,
    opacity: 0.8,
  });

  vectorLayer.set(borderLayerKey, true);

  vectorLayer.setZIndex(0.1);

  map.addLayer(vectorLayer);

  vectorSource.forEachFeature((feature) => {
    feature.setStyle(getStyle());
  });
}

function removeBorderLayer(map) {
  map.getLayers().forEach((layer) => {
    if (layer instanceof VectorLayer) {
      map.removeLayer(layer);
    }
  });
}

function getStyle() {
  const color = ["red", "green", "blue", "orange"];
  const randomColor = color[Math.floor(Math.random() * color.length)];

  return new Style({
    fill: new Fill({
      color: randomColor,
    }),
    stroke: new Stroke({
      color: "black",
      width: 2,
    }),
  });
}

export default MapBoarderLayer;
