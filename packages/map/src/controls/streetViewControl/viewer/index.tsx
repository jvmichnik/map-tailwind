import StreetViewImageViewerContextProvider, {
  PontosVizinhos,
  useStreetViewImageViewerContext,
} from "../../../contexts/streetview-context";
import { LatLngLiteral } from "leaflet";
import { Feature } from "geojson";
import { Expand, Shrink, X } from "lucide-react";
import { Portal } from "@radix-ui/react-portal";

import { ViewerContainer } from "./components/viewer-container";
import MiniMapProvider, { ParamsMap } from "../../../contexts/mini-map-context";
import { ActionBar } from "./components/action-bar";
import { RotatedMarker } from "./components/rotated-mark";
import { ActionItem } from "./components/action-item";
import { TakePicture } from "./components/TakePicture";
import { ImagePannellum } from "./components/image-pannellum";
import { ArrowDirections } from "./components/arrow-directions";
import { MiniMap } from "./components/minimap";

export type StreetViewViewerProps = {
  imageUrl: string | null;
  position: LatLngLiteral | null;
  onClose: () => void;
  onTakePicture?: (img: Blob) => void;
  pontosVizinhos?: PontosVizinhos[];
  onMove?: (idImage: string) => void;
  pontosMiniMap?: Feature[];
  onMiniMapMove?: (params: ParamsMap) => void;
};

const Component = ({
  onClose,
  onTakePicture,
  pontosVizinhos = [],
  onMove = () => null,
}: StreetViewViewerProps) => {
  const { isFullscreen, toggleFullscreen } = useStreetViewImageViewerContext();
  return (
    <>
      <ViewerContainer
        variant={isFullscreen ? "isFull" : "isNotFull"}
        topContainer={
          <ActionBar
            container={isFullscreen ? "isFull" : "isNotFull"}
            subContainer={isFullscreen ? "isFull" : "isNotFull"}
          >
            {onTakePicture && <TakePicture onFinishCrop={onTakePicture} />}
            <ActionItem
              title={
                isFullscreen ? "Sair de tela cheia" : "Abrir em tela cheia"
              }
              icon={isFullscreen ? <Shrink /> : <Expand />}
              onClick={toggleFullscreen}
            />
            <ActionItem title="Fechar" icon={<X />} onClick={onClose} />
          </ActionBar>
        }
      >
        {pontosVizinhos.length > 0 && <ArrowDirections onClick={onMove} />}
        <ImagePannellum />

        <MiniMap onClickFeature={(f) => onMove(String(f.id))} />
      </ViewerContainer>
      <RotatedMarker />
    </>
  );
};

export const StreetViewViewer = (props: StreetViewViewerProps) => {
  return (
    <StreetViewImageViewerContextProvider
      imageUrl={props.imageUrl}
      pontosVizinhos={props.pontosVizinhos || []}
      position={props.position}
    >
      <MiniMapProvider
        pontos={props.pontosMiniMap || []}
        onMapMove={props.onMiniMapMove}
      >
        <Component {...props} />
      </MiniMapProvider>
    </StreetViewImageViewerContextProvider>
  );
};
