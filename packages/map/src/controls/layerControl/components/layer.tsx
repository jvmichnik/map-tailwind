import { useCallback, useMemo } from "react";
import { useLayerServicesControl } from "../../../contexts/layers-context";
import { Checkbox } from "../../../components/checkbox";
import { TipoServicoCamada } from "../../../enums/tipoServicoCamada";

export type Camada = {
  id: string;
  nome: string;
  nomeNormalized: string;
  url: string;
  ativo: boolean;
  publico: boolean;
  ordem: number;
  pesquisavel: boolean;
  tipoServico: {
    value: TipoServicoCamada;
    name: string;
  };
};

type Props = {
  idGrupo: string;
  ordemGrupo: number;
  camada: Camada;
};

export const Layer = ({ idGrupo, ordemGrupo, camada }: Props) => {
  const { ativarCamada, desativarCamada, camadasAtivas } =
    useLayerServicesControl();

  const thisLayerIsActive = useMemo(() => {
    return camadasAtivas.some((x) => x.id == camada.id);
  }, [camadasAtivas]);

  const selecionar = () => {
    ativarCamada({
      id: camada.id,
      nome: camada.nome,
      idGrupo: idGrupo,
      tipoServico: camada.tipoServico.value,
      url: camada.url,
      pesquisavel: camada.pesquisavel,
      ordemGrupo: ordemGrupo,
      ordemCamada: camada.ordem,
    });
  };

  const onChange = useCallback(() => {
    if (thisLayerIsActive) {
      desativarCamada(camada.id);
      return;
    }

    selecionar();
  }, [thisLayerIsActive]);

  return (
    <label
      htmlFor={camada.id}
      className="flex cursor-pointer items-center px-5 py-3 hover:bg-gray-50"
    >
      <Checkbox
        id={camada.id}
        onCheckedChange={onChange}
        checked={thisLayerIsActive}
      />
      <span className="ml-2 truncate text-[0.8rem] leading-tight">
        {camada.nome}
      </span>
    </label>
  );
};
