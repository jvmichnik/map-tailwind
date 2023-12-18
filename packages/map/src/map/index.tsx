import { memo, useRef } from "react";
import {
  MapContainer,
  MapContainerProps,
  ScaleControl,
  TileLayer,
  ZoomControl,
} from "react-leaflet";
import { Portal } from "@radix-ui/react-portal";
import { LatLngBoundsLiteral } from "leaflet";

import "leaflet/dist/leaflet.css";

import { ZoomBoxControl } from "../controls/zoomBox";
import { ControlPortal } from "../controls/_base/control-portal";
import { HomeControl } from "../controls/home-control";
import { MeasureMapControl } from "../controls/measureMap";
import { DrawControl } from "../controls/drawControl";
import { LayerControl } from "../controls/layerControl";
import LayerProvider from "../contexts/layers-context";
import PopupNotificationProvider from "../components/popupNotification/context";
import { PopupNotification } from "../components/popupNotification";
import { normalize } from "../utils/stringHelper";
import { Camada } from "../controls/layerControl/components/layer";
import { AttributeControl } from "../controls/attributeControl";
import { VisibilityControl } from "../controls/visibilityControl";
import { LegendControl } from "../controls/legendControl";

export type GrupoCamadas = {
  id: string;
  nome: string;
  ordem: number;
  camadas: Omit<Camada, "nomeNormalized">[];
};

export type MapProps = {
  children?: React.ReactNode;
  boundDefault?: LatLngBoundsLiteral;
  noStreetView?: boolean;
  noHome?: boolean;
  noAttribute?: boolean;
  noPrint?: boolean;
  noClickPoint?: boolean;
  noLabel?: boolean;
  noLayers?: boolean;
  noZoom?: boolean;
  // noZoomBox?: boolean;
  noScale?: boolean;
  noDraw?: boolean;
  noMeasureMap?: boolean;
  noVisibility?: boolean;
  noLegend?: boolean;
  grupoCamadas?: GrupoCamadas[];
  showTileBase?: boolean;
} & MapContainerProps;

function MapContent({
  children,
  boundDefault,
  noStreetView = false,
  noHome = false,
  noAttribute = false,
  noPrint = false,
  noClickPoint = false,
  noLabel = false,
  noLayers = false,
  noZoom = false,
  // noZoomBox = false,
  noScale = false,
  noDraw = false,
  noMeasureMap = false,
  noVisibility = false,
  noLegend = false,
  showTileBase = false,
  grupoCamadas = [],
  ...props
}: MapProps) {
  const boxOutsideMap = useRef<HTMLDivElement>(null);
  const gruposWithLayersNormalized = grupoCamadas.map((g) => ({
    ...g,
    camadas: g.camadas.map((c) => ({
      ...c,
      nomeNormalized: normalize(c.nome),
    })),
  }));

  return (
    <div className="relative h-full w-full outline-none">
      <PopupNotificationProvider>
        <MapContainer
          className="z-10 h-full w-full !bg-gray-100"
          zoomControl={false}
          preferCanvas={true}
          doubleClickZoom={false}
          {...props}
        >
          <LayerProvider>
            {!noZoom && (
              <ZoomControl
                position="bottomright"
                zoomInTitle="Aumentar zoom"
                zoomOutTitle="Diminuir zoom"
              />
            )}
            {!noScale && (
              <ScaleControl position="bottomleft" imperial={false} />
            )}
            {!noDraw && <DrawControl position="topright" />}
            {!noMeasureMap && <MeasureMapControl position="topright" />}
            {/* {!noZoomBox && <ZoomBoxControl position="bottomright" />} */}

            <ControlPortal position="bottomrightSecondary">
              {!noVisibility && <VisibilityControl />}
            </ControlPortal>

            <ControlPortal prepend position="bottomright">
              {!noHome && boundDefault && <HomeControl latLng={boundDefault} />}
              {!noAttribute && (
                <AttributeControl boxOutsideRef={boxOutsideMap} />
              )}
            </ControlPortal>

            <ControlPortal position="bottomleftSecondary">
              {!noLegend && <LegendControl />}
            </ControlPortal>

            <ControlPortal prepend position="bottomleft">
              {!noLayers && (
                <LayerControl grupos={gruposWithLayersNormalized} />
              )}
            </ControlPortal>

            {showTileBase && (
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
            )}
            <Portal>{children}</Portal>
          </LayerProvider>
        </MapContainer>
        <div
          ref={boxOutsideMap}
          className="pointer-events-none absolute inset-0 z-20"
        />
        <PopupNotification />
      </PopupNotificationProvider>
    </div>
  );
}

const Map = memo(MapContent);
export default Map;
