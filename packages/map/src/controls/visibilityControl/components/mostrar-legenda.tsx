import { LayoutList } from "lucide-react";

import { useLayerServicesControl } from "../../../contexts/layers-context";
import { MenubarTrigger } from "../../../components/menubar";
import { Tooltip } from "../../../components/tooltip";
import { TipoServicoCamada } from "../../../enums/tipoServicoCamada";

type Props = {
  id: string;
  idTipoServicoCamada: TipoServicoCamada;
};

export const MostrarLegenda = ({ id, idTipoServicoCamada }: Props) => {
  const { camadasAtivas, toggleLegenda } = useLayerServicesControl();

  if (
    idTipoServicoCamada != TipoServicoCamada.ESRI_REST &&
    idTipoServicoCamada != TipoServicoCamada.WMS
  ) {
    return null;
  }

  const isActive = camadasAtivas.some((x) => x.id == id && x.legendaAtiva);

  const onClick = () => {
    toggleLegenda(id);
  };

  return (
    <Tooltip text="Ver legenda">
      <MenubarTrigger
        onClick={onClick}
        data-active={isActive}
        className="p-1 data-[active=false]:bg-white data-[active=true]:bg-primary/30"
      >
        <LayoutList className="h-4 w-4" />
      </MenubarTrigger>
    </Tooltip>
  );
};
