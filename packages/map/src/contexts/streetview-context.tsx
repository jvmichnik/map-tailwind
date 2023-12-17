import { LatLngLiteral } from "leaflet";
import { createContext, createRef, useContext, useState } from "react";

export type PontosVizinhos = {
  id: string;
  angulo: number;
};

interface Context {
  imageUrl: string | null;
  isFullscreen: boolean;
  toggleFullscreen: () => void;
  rotationX: number;
  handleRotateX: (rotation: number) => void;
  inclinationY: number;
  handleInclinateY: (inclination: number) => void;
  pontosVizinhos: PontosVizinhos[];
  rotationAngle: number;
  position: LatLngLiteral | null;
  imagePannelumRef: React.RefObject<unknown> | null;
}

const StreetViewImageViewerContext = createContext<Context>({
  imageUrl: null,
  isFullscreen: false,
  rotationX: 0,
  inclinationY: 0,
  toggleFullscreen: () => null,
  handleRotateX: () => null,
  handleInclinateY: () => null,
  pontosVizinhos: [],
  rotationAngle: 0,
  position: null,
  imagePannelumRef: null,
});

const imagePannelumRef = createRef();

const Provider = ({
  children,
  pontosVizinhos = [],
  position,
  imageUrl = null,
}: {
  imageUrl: string | null;
  children: React.ReactNode;
  pontosVizinhos?: PontosVizinhos[];
  position: LatLngLiteral | null;
}) => {
  const [isFullscreen, setIsFullScreen] = useState(false);
  const [rotationX, setRotationX] = useState<number>(0);
  const [inclinationY, setInclinationY] = useState<number>(0);

  const grausPrimeiroPonto =
    pontosVizinhos.length > 0 ? pontosVizinhos[0].angulo : 0;
  const rotationAngle = grausPrimeiroPonto + rotationX;

  const toggleFullscreen = () => {
    setIsFullScreen((state) => !state);
  };

  const handleRotateX = (rotate: number) => {
    setRotationX(rotate);
  };

  const handleInclinateY = (inclinate: number) => {
    setInclinationY(inclinate);
  };

  return (
    <StreetViewImageViewerContext.Provider
      value={{
        imageUrl,
        isFullscreen,
        toggleFullscreen,
        rotationX,
        handleRotateX,
        inclinationY,
        handleInclinateY,
        pontosVizinhos,
        rotationAngle,
        position,
        imagePannelumRef,
      }}
    >
      {children}
    </StreetViewImageViewerContext.Provider>
  );
};

export const useStreetViewImageViewerContext = (): Context =>
  useContext(StreetViewImageViewerContext);

export default Provider;
