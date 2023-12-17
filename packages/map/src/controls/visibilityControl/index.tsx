import TriggerAreaProvider, {
  useTriggerArea,
} from "./contexts/trigger-area-context";
import { useLayerServicesControl } from "../../contexts/layers-context";

import { LayerConfig } from "./components/layer-config";
import { Badge } from "../../components/badge";

const Container = () => {
  const { isVisibilityOpened, openVisibility, closeVisibility } =
    useTriggerArea();

  const { camadasAtivas } = useLayerServicesControl();

  const qtdCamadas = camadasAtivas.length;

  if (qtdCamadas == 0) return null;

  return (
    <div
      className="leaflet-control rounded-lg bg-white px-4 shadow-sm"
      onMouseEnter={() => openVisibility()}
      onMouseLeave={() => closeVisibility()}
    >
      <div className="flex w-full items-center py-3">
        <Badge variant="secondary" className="mr-2 text-xs">
          {qtdCamadas}
        </Badge>
        <span className="text-sm font-medium text-gray-600">
          Ver camadas ativas
        </span>
      </div>
      <div
        data-visibility={isVisibilityOpened}
        className="-mt-2 data-[visibility=true]:block data-[visibility=false]:hidden data-[visibility=false]:min-w-[12.8125rem] data-[visibility=true]:min-w-[18.75rem] data-[visibility=true]:overflow-auto data-[visibility=true]:overflow-hidden"
      >
        <div className="max-h-[60vh] divide-y px-1 pb-4">
          {camadasAtivas
            .sort((a, b) => b.zIndex - a.zIndex)
            .map((c) => (
              <LayerConfig key={c.id} camada={c} />
            ))}
        </div>
      </div>
    </div>
  );
};

export const VisibilityControl = () => {
  return (
    <TriggerAreaProvider>
      <Container />
    </TriggerAreaProvider>
  );
};
