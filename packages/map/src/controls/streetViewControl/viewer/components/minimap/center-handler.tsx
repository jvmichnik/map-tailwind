import { useMap } from "react-leaflet";
import { useEffect } from "react";
import { useStreetViewImageViewerContext } from "../../../../../contexts/streetview-context";

export const CenterHandler = () => {
  const map = useMap();
  const { position } = useStreetViewImageViewerContext();

  useEffect(() => {
    if (position) {
      map.setView(position);
    }
  }, [position?.lat, position?.lng]);

  return null;
};
