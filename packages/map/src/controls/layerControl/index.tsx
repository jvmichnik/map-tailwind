import React, { useEffect, useState } from "react";

import { GroupLayersList } from "./components/group-layer-list";
import { GroupLayerProps } from "./components/group-layer";
import { useLayerServicesControl } from "../../contexts/layers-context";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../components/popover";
import { Button } from "../../components/button";
import { InputSearch } from "../../components/input-search";

type LayerControlProps = {
  grupos: GroupLayerProps[];
};

export function LayerControl({ grupos }: LayerControlProps) {
  const { ativarCamada } = useLayerServicesControl();
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (grupos.length > 0) {
      grupos.forEach((g) => {
        g.camadas.forEach((c) => {
          if (c.ativo) {
            ativarCamada({
              id: c.id,
              nome: c.nome,
              idGrupo: g.id,
              tipoServico: c.tipoServico.value,
              url: c.url,
              ordemGrupo: g.ordem,
              ordemCamada: c.ordem,
              pesquisavel: c.pesquisavel,
            });
          }
        });
      });
    }
  }, [grupos]);

  return (
    <div className="leaflet-control">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            size="sm"
            className="leaflet-bar bg-white px-4 text-gray-600  hover:bg-gray-50"
          >
            Ver camadas
          </Button>
        </PopoverTrigger>
        <PopoverContent
          forceMount
          className="w-80 px-0 py-2 shadow-none bg-white"
          align="start"
        >
          <div className="text-md px-4 pb-1 font-medium">Camadas</div>
          <div className="px-4 pb-2">
            <InputSearch
              className="h-8"
              size={20}
              placeholder="Procurar camadas"
              onChangeValue={(e) => setSearch(e)}
            />
          </div>
          <div className="h-screen max-h-[50vh] overflow-auto">
            <GroupLayersList
              search={search}
              isLoading={false}
              groupLayers={grupos}
            />
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
