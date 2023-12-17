import { X } from "lucide-react";

import { MenubarTrigger } from "../../../components/menubar";
import { Tooltip } from "../../../components/tooltip";
import { useLayerServicesControl } from "../../../contexts/layers-context";

type Props = {
  id: string;
};

export const RemoverLayer = ({ id }: Props) => {
  const { desativarCamada } = useLayerServicesControl();

  const onRemove = () => {
    desativarCamada(id);
  };

  return (
    <Tooltip text="Remover da lista" _content={{ side: "top", align: "end" }}>
      <MenubarTrigger className="p-1" onClick={onRemove}>
        <X className="h-4 w-4" />
      </MenubarTrigger>
    </Tooltip>
  );
};
