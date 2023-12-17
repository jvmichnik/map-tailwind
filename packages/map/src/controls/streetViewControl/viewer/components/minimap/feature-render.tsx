import { useMap } from "react-leaflet";
import { useEffect } from "react";
import { useLayerServicesControl } from "../../../../../contexts/layers-context";
import { addLayerToMap } from "../../../../../utils/map/layers";

export const FeatureRender = () => {
  const map = useMap();
  const { camadasAtivas } = useLayerServicesControl();

  useEffect(() => {
    camadasAtivas.forEach((c) => {
      addLayerToMap({
        id: c.id,
        map: map,
        url: c.url,
        pane: "tilePane",
        zIndex: c.zIndex,
        tipoServico: c.tipoServico,
        opacity: 1,
      });
    });
  }, [camadasAtivas]);

  return null;
};
