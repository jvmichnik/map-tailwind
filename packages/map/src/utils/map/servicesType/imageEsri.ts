import L from "leaflet";
import * as esri from "esri-leaflet";

type AddLayerProps = {
  id: string;
  map: L.Map;
  url: string;
  pane: string;
  zIndex: number;
  opacity: number;
};

export const addImageEsri = ({
  id,
  map,
  url,
  pane,
  zIndex,
  opacity,
}: AddLayerProps): L.Layer => {
  const esriSevice: any = esri;
  const layerAdded: any = esriSevice
    .imageMapLayer({
      url,
      zIndex,
      pane,
      opacity,
    })
    .addTo(map);
  layerAdded.id = id;

  return layerAdded;
};
