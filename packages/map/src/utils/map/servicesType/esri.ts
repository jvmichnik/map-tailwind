import "leaflet.markercluster";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import * as esri from "esri-leaflet";
import L from "leaflet";
import "../renderer/EsriLeafletRenderers";
import EsriLeafletCluster from "esri-leaflet-cluster";

L.esri = esri;

type AddLayerProps = {
  id: string;
  map: L.Map;
  url: string;
  pane: string;
  zIndex: number;
  opacity: number;
};

export const addEsriService = ({
  id,
  map,
  url,
  opacity,
  pane,
  zIndex,
}: AddLayerProps): L.Layer => {
  const layerAdded: any = EsriLeafletCluster({
    url: url,
    disableClusteringAtZoom: 8,
    pane: pane,
    onEachFeature: function (feature: any, layer: any) {
      // if (
      //   feature.geometry.type !== "Point" &&
      //   feature.geometry.type !== "MultiPoint"
      // ) {
      layerAdded.resetStyle(feature.id);
      // }
    },
    style: function (feature: any, layer: any) {
      return { opacity, zIndex };
    },
  });

  layerAdded.addTo(map);

  layerAdded.id = id;

  return layerAdded;
};
