import React, { createContext, useContext, useState } from "react";
import { useMap } from "react-leaflet";
import { convertToCqlString } from "../utils/map/cqlFilter";
import {
  addLayerToMap,
  removeLayerMap,
  updateLayerMap,
} from "../utils/map/layers";
import { TipoServicoCamada } from "../enums/tipoServicoCamada";

export type CqlFilter = {
  key: string;
  value: string;
  propertyType: string;
  active: boolean;
};

type Camada = {
  id: string;
  idGrupo: string;
  nome: string;
  tipoServico: TipoServicoCamada;
  url: string;
  zIndex: number;
  pesquisavel: boolean;
};

export type CamadaWithLayer = Camada & {
  opacity: number;
  legendaAtiva: boolean;
  cqlFilter?: CqlFilter[];
};

export type CamadaToAdd =
  | (Omit<Camada, "zIndex"> & { ordemGrupo: number; ordemCamada: number })
  | (Omit<CamadaWithLayer, "zIndex"> & {
      ordemGrupo: number;
      ordemCamada: number;
    });

interface Context {
  ativarCamada: (camada: CamadaToAdd) => void;
  desativarCamada: (idCamada: string) => void;
  toggleLegenda: (idCamada: string) => void;
  camadasAtivas: CamadaWithLayer[];
  alterarFiltro: (idCamada: string, cqlFilter: CqlFilter[]) => void;
  alterarOpacidade: (idCamada: string, opacity: number) => void;
  limparFiltro: (idCamada: string) => void;
}

const LayersContext = createContext<Context>({
  ativarCamada: () => null,
  desativarCamada: () => null,
  toggleLegenda: () => null,
  camadasAtivas: [],
  alterarFiltro: () => null,
  alterarOpacidade: () => null,
  limparFiltro: () => null,
});

const Provider = ({ children }: { children: React.ReactNode }) => {
  const map = useMap();
  const [layers, setLayers] = useState<CamadaWithLayer[]>([]);

  const ativarCamada = (camada: CamadaToAdd) => {
    if (layers.some((x) => x.id == camada.id)) return;

    const zIndex = 2147483647 - (camada.ordemGrupo * 100 + camada.ordemCamada);
    const layerAdded = addLayerToMap({
      id: camada.id,
      map: map,
      url: camada.url,
      pane: "tilePane",
      zIndex: zIndex,
      tipoServico: camada.tipoServico,
      opacity: 1,
    });
    if (layerAdded) {
      setLayers((state) => [
        ...state,
        { opacity: 1, legendaAtiva: false, ...camada, zIndex },
      ]);
    }
  };

  const desativarCamada = (idCamada: string) => {
    const wasRemoved = removeLayerMap(idCamada, map);
    if (wasRemoved) {
      setLayers((state) => state.filter((x) => x.id != idCamada));
    }
  };

  const toggleLegenda = (idCamada: string) => {
    const alterada = layers.find((x) => x.id == idCamada);
    if (alterada) {
      const newState = [
        ...layers.filter((x) => x.id != idCamada),
        { ...alterada, legendaAtiva: !alterada?.legendaAtiva },
      ];
      setLayers(newState);
    }
  };

  const alterarFiltro = (idCamada: string, cqlFilter: CqlFilter[]) => {
    const layer = layers.find((x) => x.id == idCamada);
    if (layer) {
      const cql_filter = convertToCqlString(cqlFilter);

      updateLayerMap(
        layer.id,
        map,
        layer.tipoServico,
        layer.opacity,
        layer.zIndex,
        cql_filter
      );

      const newState = [
        ...layers.filter((x) => x.id != idCamada),
        { ...layer, cqlFilter },
      ];
      setLayers(newState);
    }
  };

  const alterarOpacidade = (idCamada: string, opacity: number) => {
    const layer = layers.find((x) => x.id == idCamada);
    if (layer) {
      const cql_filter = convertToCqlString(layer.cqlFilter);
      updateLayerMap(
        layer.id,
        map,
        layer.tipoServico,
        opacity,
        layer.zIndex,
        cql_filter
      );

      const newState = [
        ...layers.filter((x) => x.id != idCamada),
        { ...layer, opacity: opacity },
      ];
      setLayers(newState);
    }
  };

  const limparFiltro = (idCamada: string) => {
    const layer = layers.find((x) => x.id == idCamada);
    if (layer) {
      const newState = [
        ...layers.filter((x) => x.id != idCamada),
        { ...layer, cql_filter: "1=1" },
      ];
      setLayers(newState);
    }
  };

  return (
    <LayersContext.Provider
      value={{
        ativarCamada,
        desativarCamada,
        toggleLegenda,
        camadasAtivas: layers,
        alterarFiltro,
        alterarOpacidade,
        limparFiltro,
      }}
    >
      {children}
    </LayersContext.Provider>
  );
};

export const useLayerServicesControl = (): Context => useContext(LayersContext);

export default Provider;
