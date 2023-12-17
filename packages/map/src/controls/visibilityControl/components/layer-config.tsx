import { useState } from "react";
import * as Slider from "@radix-ui/react-slider";

import {
  CamadaWithLayer,
  useLayerServicesControl,
} from "../../../contexts/layers-context";
import { Menubar, MenubarMenu } from "../../../components/menubar";
import { RemoverLayer } from "./remover-layer";
import { MostrarLegenda } from "./mostrar-legenda";
import { Button } from "../../../components/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../../../components/tooltip";

type Props = {
  camada: CamadaWithLayer;
};

export const LayerConfig = ({ camada }: Props) => {
  const { alterarOpacidade } = useLayerServicesControl();

  const defaultValue = camada.opacity * 100;
  const [sliderValue, setSliderValue] = useState(defaultValue);
  const [showTooltip, setShowTooltip] = useState(false);

  const onChange = (value: number) => {
    setSliderValue(value);
  };

  const onSave = () => {
    const opacity = sliderValue / 100;
    alterarOpacidade(camada.id, opacity);
  };

  return (
    <div className="w-full py-2">
      <div className="flex items-center justify-between">
        <span className="truncate pr-4 text-sm">{camada.nome}</span>
        <Menubar className="h-auto p-0">
          <MenubarMenu>
            <MostrarLegenda
              id={camada.id}
              idTipoServicoCamada={camada.tipoServico}
            />
            <RemoverLayer id={camada.id} />
          </MenubarMenu>
        </Menubar>
      </div>
      <div className="flex w-full space-x-2 pt-1">
        <Slider.Root
          className="relative flex h-5 w-full touch-none select-none items-center"
          defaultValue={[sliderValue]}
          max={100}
          step={1}
          onValueChange={(v) => onChange(v[0])}
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
        >
          <Slider.Track className="relative h-[3px] grow rounded-full bg-gray-300">
            <Slider.Range className="absolute h-full rounded-full bg-gray-500" />
          </Slider.Track>
          <TooltipProvider>
            <Tooltip open={showTooltip}>
              <TooltipTrigger asChild>
                <Slider.Thumb className="block h-3 w-3 cursor-pointer rounded-full border-[1px] border-gray-400 bg-white hover:bg-gray-50" />
              </TooltipTrigger>
              <TooltipContent className="p-1 px-2 text-xs">
                {sliderValue}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </Slider.Root>
        <Button
          variant="secondary"
          className="h-6 px-2 text-xs hover:bg-gray-50"
          onClick={onSave}
        >
          Aplicar
        </Button>
      </div>
    </div>
  );
};
