import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../../components/accordion";
import { Badge } from "../../../components/badge";
import { useLayerServicesControl } from "../../../contexts/layers-context";
import { Camada, Layer } from "./layer";

export type GroupLayerProps = {
  id: string;
  nome: string;
  ordem: number;
  camadas: Camada[];
};

export const GroupLayer = ({ id, nome, ordem, camadas }: GroupLayerProps) => {
  const { camadasAtivas } = useLayerServicesControl();

  const qtdCamadas = camadas.length;
  const qtdCamadasAtivas = camadasAtivas.filter((x) => x.idGrupo == id).length;
  const hasActive = qtdCamadasAtivas > 0;

  return (
    <AccordionItem value={id}>
      <AccordionTrigger className="group px-4 py-2 hover:bg-gray-50 hover:no-underline">
        <div className="flex flex-1 items-center pr-4">
          <div className="flex flex-1 items-center pr-2">
            <div className="mr-2 min-w-[3rem]">
              <Badge
                variant="secondary"
                className="px-1.5 font-medium text-gray-500"
              >
                {qtdCamadasAtivas}/{qtdCamadas}
              </Badge>
            </div>
            <div className="truncate text-[0.8rem] font-normal group-data-[state=open]:font-medium">
              {nome}
            </div>
          </div>
          {hasActive && (
            <div className="flex items-center">
              <div className="mr-2 h-2 w-2 rounded-full bg-yellow-400" />
            </div>
          )}
        </div>
      </AccordionTrigger>
      <AccordionContent>
        {camadas.map((c) => (
          <Layer key={c.id} idGrupo={id} ordemGrupo={ordem} camada={c} />
        ))}
      </AccordionContent>
    </AccordionItem>
  );
};
