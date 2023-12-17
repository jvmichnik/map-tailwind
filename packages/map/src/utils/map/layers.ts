import L from "leaflet";
import { addEsriService } from "./servicesType/esri";
import { addImageEsri } from "./servicesType/imageEsri";
import { addWms } from "./servicesType/wms";
import { TipoServicoCamada } from "../../enums/tipoServicoCamada";

export const getLayerMap = (id: string, map: L.Map): L.Layer | null => {
  let result = null;
  map.eachLayer((l) => {
    const layer: any = l;
    if (layer.id == id) {
      result = layer;
      return false;
    }
  });
  return result;
};

type AddLayerProps = {
  id: string;
  map: L.Map;
  tipoServico: TipoServicoCamada;
  url: string;
  pane: string;
  zIndex: number;
  opacity: number;
  cql_filter?: string;
};

export const addLayerToMap = ({
  id,
  map,
  tipoServico,
  url,
  pane,
  zIndex,
  opacity,
  cql_filter = "1=1",
}: AddLayerProps): L.Layer | null => {
  const layerAlreadyAdded = getLayerMap(id, map);

  if (layerAlreadyAdded) return null;

  switch (tipoServico) {
    case TipoServicoCamada.WMS: {
      return addWms({
        id,
        map,
        url,
        pane,
        zIndex,
        opacity,
        cql_filter,
      });
    }
    case TipoServicoCamada.ESRI_REST: {
      return addEsriService({
        id,
        map,
        url,
        pane,
        zIndex,
        opacity,
      });
    }
    case TipoServicoCamada.IMAGEM: {
      return addImageEsri({
        id,
        map,
        url,
        pane,
        zIndex,
        opacity,
      });
    }
  }
};

export const removeLayerMap = (id: string, map: L.Map): boolean => {
  const layer = getLayerMap(id, map);
  if (layer) {
    layer.remove();
    return true;
  }
  return false;
};

export const updateLayerMap = (
  id: string,
  map: L.Map,
  tipoServico: TipoServicoCamada,
  opacity: number,
  zIndex: number,
  cql_filter?: string
) => {
  const layer: any = getLayerMap(id, map);

  let options: AddLayerProps | null = null;
  if (tipoServico == TipoServicoCamada.ESRI_REST) {
    options = {
      id: layer.id,
      map,
      tipoServico: tipoServico,
      url: layer.options.url,
      pane: layer.options.pane,
      zIndex: zIndex,
      opacity: opacity,
    };
  } else if (tipoServico == TipoServicoCamada.WMS) {
    options = {
      id: layer.id,
      map,
      tipoServico: tipoServico,
      url: layer._url,
      pane: layer.options.pane,
      zIndex: zIndex,
      opacity: opacity,
      cql_filter,
    };
  } else if (tipoServico == TipoServicoCamada.IMAGEM) {
    options = {
      id: layer.id,
      map,
      tipoServico: tipoServico,
      url: layer.options.url,
      pane: layer.options.pane,
      zIndex: zIndex,
      opacity: opacity,
    };
  }

  if (options) {
    layer.remove();
    addLayerToMap(options);
  }
};
