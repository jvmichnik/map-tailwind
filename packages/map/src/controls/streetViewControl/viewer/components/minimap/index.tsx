import { MapContainer, GeoJSON } from "react-leaflet";
import { Feature, GeoJsonObject } from "geojson";
import L from "leaflet";

import { RotatedMarker } from "../rotated-mark";
import { CamadasHandler } from "./camadas-handler";
import { MapMoveHandler } from "./map-move-handler";
import { CenterHandler } from "./center-handler";
import { useStreetViewImageViewerContext } from "../../../../../contexts/streetview-context";
import { useMiniMapContext } from "../../../../../contexts/mini-map-context";

type MiniMapProps = {
  onClickFeature?: (feature: Feature) => void;
};

export const MiniMap = ({ onClickFeature }: MiniMapProps) => {
  const { position, isFullscreen } = useStreetViewImageViewerContext();
  const { pontos } = useMiniMapContext();

  if (!isFullscreen) return null;

  return (
    <div className="absolute left-0 top-0 w-full max-w-md p-4 pt-10 md:pt-4 xl:bottom-4 xl:left-auto xl:right-4 xl:top-auto">
      <div className="aspect-video h-full w-full overflow-hidden rounded-lg shadow-md">
        <MapContainer
          center={position || undefined}
          zoom={18}
          style={{ height: "100%", width: "100%" }}
          zoomControl={false}
          preferCanvas={true}
          doubleClickZoom={false}
          touchZoom={false}
          minZoom={17}
        >
          <RotatedMarker />
          <CamadasHandler />
          <MapMoveHandler />
          <CenterHandler />
          {pontos && pontos.length > 0 && (
            <GeoJSON
              key={pontos.length}
              data={
                { type: "FeatureCollection", features: pontos } as GeoJsonObject
              }
              onEachFeature={async (feature, leafletLayer) => {
                leafletLayer.on("click", function (a) {
                  if (onClickFeature) onClickFeature(feature);
                });
              }}
              pointToLayer={(feature, latlng) => {
                return L.circleMarker(latlng, {
                  pane: "markerPane",
                  radius: 5,
                  weight: 0,
                  fillOpacity: 1,
                  fillColor: "rgba(21, 76, 199, 1)",
                  bubblingMouseEvents: false,
                });
              }}
            />
          )}
        </MapContainer>
      </div>
    </div>
  );
};
