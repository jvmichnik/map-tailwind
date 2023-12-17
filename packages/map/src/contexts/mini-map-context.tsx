import { Feature } from "geojson";
import { createContext, useContext } from "react";

export type ParamsMap = {
  zoom: number;
  bbox: number[];
};

interface Context {
  pontos?: Feature[];
  onMapMove?: (params: ParamsMap) => void;
}

const MiniMapContext = createContext<Context>({
  pontos: [],
  onMapMove: () => null,
});

const Provider = ({
  children,
  pontos = [],
  onMapMove = () => null,
}: {
  children: React.ReactNode;
  pontos?: Feature[];
  onMapMove?: (params: ParamsMap) => void;
}) => {
  return (
    <MiniMapContext.Provider
      value={{
        pontos,
        onMapMove,
      }}
    >
      {children}
    </MiniMapContext.Provider>
  );
};

export const useMiniMapContext = (): Context => useContext(MiniMapContext);

export default Provider;
