import { useLayerServicesControl } from "../../contexts/layers-context";
import { TipoServicoCamada } from "../../enums/tipoServicoCamada";
import { EsriLegend } from "./EsriLegend";
import { WmsLegend } from "./WmsLegend";

export const LegendControl = () => {
  const { camadasAtivas } = useLayerServicesControl();

  const camadasComLegendaAtiva = camadasAtivas.filter(
    (c) =>
      c.legendaAtiva &&
      (c.tipoServico == TipoServicoCamada.WMS ||
        c.tipoServico == TipoServicoCamada.ESRI_REST)
  );

  if (camadasComLegendaAtiva.length == 0) return null;

  return (
    <div className="leaflet-control leaflet-bar min-w-[18.75rem]">
      <div className="bg-white px-4 pb-3 pt-2">
        <span className="text-sm font-medium text-gray-600">Legenda</span>
        <div className="mt-2 max-w-[10rem] items-baseline overflow-y-auto">
          {camadasComLegendaAtiva.map((c) => {
            switch (c.tipoServico) {
              case TipoServicoCamada.WMS:
                return <WmsLegend key={c.id} url={c.url} />;
              case TipoServicoCamada.ESRI_REST:
                return <EsriLegend key={c.id} url={c.url} />;
              default:
                return null;
            }
          })}
        </div>
      </div>
    </div>
  );
};
