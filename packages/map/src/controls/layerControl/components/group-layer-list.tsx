import { Layer } from "./layer";
import { GroupLayer, GroupLayerProps } from "./group-layer";
import { normalize } from "../../../utils/stringHelper";
import { Alert } from "../../../components/alert";
import { Skeleton } from "../../../components/skeleton";
import { Accordion } from "../../../components/accordion";

type GroupLayersListProps = {
  isLoading?: boolean;
  search: string;
  groupLayers?: GroupLayerProps[];
};

export const GroupLayersList = ({
  groupLayers = [],
  search,
  isLoading = false,
}: GroupLayersListProps) => {
  if (isLoading) {
    return (
      <div className="space-y-2">
        <Skeleton className="h-[1.875rem]" />
        <Skeleton className="h-[1.875rem]" />
        <Skeleton className="h-[1.875rem]" />
        <Skeleton className="h-[1.875rem]" />
        <Skeleton className="h-[1.875rem]" />
      </div>
    );
  }

  if (groupLayers.length == 0) {
    return (
      <div className="px-4">
        <Alert>Não possui nenhuma camada.</Alert>
      </div>
    );
  }

  if (search) {
    const searchNormalized = normalize(search);

    const layersFiltered = groupLayers
      .map((g) => ({
        ...g,
        camadas: g.camadas.map((c) => ({
          ...c,
          idGrupo: g.id,
          ordemGrupo: g.ordem,
        })),
      }))
      .flatMap((x) => x.camadas)
      .filter((x) => x.nomeNormalized.includes(searchNormalized));

    if (layersFiltered.length == 0) {
      return (
        <div className="px-4">
          <Alert>Nenhum resultado encontrado.</Alert>
        </div>
      );
    }

    return (
      <>
        {layersFiltered.map((l) => (
          <Layer
            key={l.idGrupo + l.id}
            idGrupo={l.idGrupo}
            ordemGrupo={l.ordemGrupo}
            camada={l}
          />
        ))}
      </>
    );
  }

  return (
    <Accordion type="single" collapsible className="border-t">
      {groupLayers.map((g) => (
        <GroupLayer
          key={g.id}
          id={g.id}
          nome={g.nome}
          ordem={g.ordem}
          camadas={g.camadas}
        />
      ))}
    </Accordion>
  );
};
