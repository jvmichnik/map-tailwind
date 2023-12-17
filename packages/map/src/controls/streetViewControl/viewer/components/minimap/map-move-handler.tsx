import { useMapEvents } from "react-leaflet";
import { useEffect } from "react";
import { useMiniMapContext } from "../../../../../contexts/mini-map-context";

export const MapMoveHandler = () => {
  const { onMapMove } = useMiniMapContext();

  const map = useMapEvents({
    moveend: (e) => {
      carregarParams();
    },
  });

  useEffect(() => {
    carregarParams();
  }, []);

  function carregarParams() {
    const bound = map.getBounds();
    const bbox = bound.toBBoxString().split(",");
    const zoom = map.getZoom();
    if (onMapMove) {
      onMapMove({
        zoom: zoom,
        bbox: bbox.map((x) => Number(x)),
      });
    }
  }

  return null;
};
