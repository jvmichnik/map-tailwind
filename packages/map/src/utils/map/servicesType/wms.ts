import L from "leaflet";
import "../extends/leaflet.wms";

type AddLayerProps = {
  id: string;
  map: L.Map;
  url: string;
  pane: string;
  zIndex: number;
  opacity: number;
  cql_filter?: string;
};

export const addWms = ({
  id,
  map,
  url,
  pane,
  zIndex,
  opacity,
  cql_filter = "1=1",
}: AddLayerProps): L.Layer => {
  const urlSplit = url.split("?");
  const urlParams = new URLSearchParams(urlSplit[1]);
  const layers = urlParams.get("layers");
  const format = urlParams.get("format");

  const leaflet: any = L;
  const layerAdded: any = new leaflet.wmsSource(url, {
    maxZoom: 24,
    format: format ?? "image/png",
    transparent: true,
    identify: false,
    layers: layers ?? undefined,
    zIndex: zIndex,
    pane: pane,
    opacity: opacity,
    cql_filter: cql_filter,
  });

  layerAdded.id = id;

  layerAdded.getLayer(layers ?? "").addTo(map);

  return layerAdded;
};
