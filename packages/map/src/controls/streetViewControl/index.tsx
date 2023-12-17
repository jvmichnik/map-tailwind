// @ts-ignore
import glify from "leaflet.glify";
import L from "leaflet";
import { useEffect, useState } from "react";
import { useMap, GeoJSON } from "react-leaflet";
import { Feature, GeoJsonObject } from "geojson";
import { PersonStanding } from "lucide-react";

type StreetViewControlProps = {
  onActive?: () => void;
  onInactive?: () => void;
  pontos?: Feature[];
  onClickFeature?: (feature: Feature) => void;
};

export const StreetViewControl = ({
  onActive,
  onInactive,
  onClickFeature,
  pontos = [],
}: StreetViewControlProps) => {
  const map = useMap();

  const [isActive, setIsActive] = useState<boolean | null>(false);
  const [layer, setLayer] = useState<any>(null);
  const renderWithGeoJson = map.getZoom() >= 19;

  function adicionarLayer(features: Feature[]) {
    const ext = layer?.gl.getExtension("WEBGL_lose_context");
    if (ext) {
      ext.loseContext();
    }
    layer?.remove();

    if (renderWithGeoJson) return;

    const glifyLayer = glify.points({
      map: map,
      size: 10,
      latitudeKey: 1,
      longitudeKey: 0,
      data: {
        type: "FeatureCollection",
        features: features,
      },
      pane: "overlayPane",
      fragmentShaderSource: function () {
        return glify.shader.fragment.simpleCircle;
      },
      //fragmentShaderSource: glify.shader.fragment.squareBorderless,
      color: (i: any, feature: any) => {
        return { r: 21 / 255, g: 76 / 255, b: 199 / 255, a: 1 };
      },
      click: (e: any, pointOrGeoJsonFeature: any, xy: any): boolean | void => {
        if (onClickFeature) onClickFeature(pointOrGeoJsonFeature);
        //console.log(e, pointOrGeoJsonFeature, xy, "click");
      },
      hover: (e: any, pointOrGeoJsonFeature: any, xy: any): boolean | void => {
        //console.log(e, pointOrGeoJsonFeature, xy, "hover");
      },
    });
    setLayer(glifyLayer);
  }

  const removerPontos = () => {
    layer?.remove();
    setLayer(null);
    setIsActive(false);
    if (onInactive) onInactive();
  };

  useEffect(() => {
    if (isActive && pontos.length > 0) {
      adicionarLayer(pontos);
    }
  }, [pontos, isActive]);

  const toggle = () => {
    if (isActive) {
      removerPontos();
      if (onInactive) onInactive();
    } else {
      setIsActive(true);
      if (onActive) onActive();
    }
  };

  return (
    <>
      <div
        className={`leaflet-control leaflet-bar ${
          isActive && "button-enabled"
        }`}
        style={{ fontSize: "0.9rem" }}
      >
        <a title="Fotos 360" onClick={() => toggle()}>
          <div className="flex h-full items-center justify-center">
            <PersonStanding className="h-5 w-5" />
          </div>
        </a>
      </div>
      {renderWithGeoJson && isActive && (
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
    </>
  );
};
