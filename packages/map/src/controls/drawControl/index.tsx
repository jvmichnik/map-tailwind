import L from "leaflet";
import { ControlPosition } from "leaflet";
import "leaflet-draw/dist/leaflet.draw.css";
import { FeatureGroup } from "react-leaflet";
import { EditControl } from "react-leaflet-draw";
import { drawLocales } from "./index.locales";
import "./style.css";

type Props = {
  position: ControlPosition;
};

drawLocales();

const leaflet: any = L;
delete leaflet.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

export const DrawControl = ({ position }: Props) => {
  return (
    <FeatureGroup pane="overlayPane">
      <EditControl
        position={position}
        draw={{
          polyline: true,
          rectangle: true,
          circlemarker: false,
          circle: true,
          polygon: true,
        }}
      />
    </FeatureGroup>
  );
};
