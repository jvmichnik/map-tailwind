import L from "leaflet";
import { RefObject, useEffect, useState } from "react";
import { useMapEvents } from "react-leaflet";
import { Portal } from "@radix-ui/react-portal";
import { BadgeInfo, X } from "lucide-react";

import { useLayerServicesControl } from "../../contexts/layers-context";
import { Alert } from "../../components/alert";
import { Button } from "../../components/button";
import {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Table,
} from "../../components/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/select";

type Attribute = {
  key: string;
  value: string;
};

type AttributeControlProps = {
  boxOutsideRef: RefObject<HTMLDivElement>;
};

export const AttributeControl = ({ boxOutsideRef }: AttributeControlProps) => {
  const [attributes, setAttributes] = useState<Attribute[][]>([]);
  const [isActive, setActive] = useState(false);
  const { camadasAtivas } = useLayerServicesControl();
  const [camadaSelecionada, setCamadaSelecionada] = useState("");

  const camadasComAtributos = camadasAtivas.filter((c) => c.pesquisavel);

  useEffect(() => {
    const selectedNotInList = !camadasComAtributos.some(
      (x) => x.url == camadaSelecionada
    );
    if (selectedNotInList && camadasComAtributos.length > 0) {
      setCamadaSelecionada(camadasComAtributos[0].url);
    }
  }, [camadasComAtributos]);

  useEffect(() => {
    setAttributes([]);
  }, [camadaSelecionada]);

  const loadData = async (
    sizeX: number,
    sizeY: number,
    pointX: number,
    pointY: number,
    bbox: string
  ) => {
    const url = camadaSelecionada;

    const urlSplit = url.split("?");
    const urlParams = new URLSearchParams(urlSplit[1]);
    const layers = urlParams.get("layers");

    const params = {
      request: "GetFeatureInfo",
      service: "WMS",
      srs: "EPSG:4326",
      version: "1.1.1",
      transparent: true,
      format: "image/png",
      bbox: bbox,
      height: sizeY,
      width: sizeX,
      layers: layers,
      query_layers: layers,
      info_format: "application/json",
      x: pointX.toFixed(0),
      y: pointY.toFixed(0),
    };

    const featureInfoUrl = url + L.Util.getParamString(params, url, true);

    try {
      const response = await fetch(featureInfoUrl);
      const data = await response.json();
      const features = data.features;
      const propArr: Attribute[][] = [];

      if (features.length > 0) {
        features.forEach((element: any) => {
          const props = element.properties;
          const keys = Object.keys(props);
          const propertiesToAdd: Attribute[] = [];
          keys.forEach((k: any) => {
            const att: Attribute = { key: k, value: props[k] };
            propertiesToAdd.push(att);
          });

          propArr.push(propertiesToAdd);
        });
      }

      setAttributes(propArr);
    } catch {
      setAttributes([]);
    }
  };

  const map = useMapEvents({
    click(evt) {
      const point = map.latLngToContainerPoint(evt.latlng);
      const size = map.getSize();
      const bbox = map.getBounds().toBBoxString();

      loadData(size.x, size.y, point.x, point.y, bbox);
    },
  });
  const hasAnyLayer = camadasComAtributos.length > 0;

  return (
    <>
      <div
        className={`leaflet-control leaflet-bar ${
          isActive && "button-enabled"
        }`}
      >
        <a
          title="Ver atributos"
          className="text-sm"
          onClick={() => {
            setAttributes([]);
            setActive((state) => !state);
          }}
        >
          <div className="flex h-full items-center justify-center">
            <BadgeInfo className="h-4 w-4" />
          </div>
        </a>
      </div>
      {isActive && (
        <Portal container={boxOutsideRef.current} asChild>
          <div className="leaflet-control leaflet-bar !absolute right-[3.5rem] top-[0.7rem] w-screen max-w-[30rem] bg-white px-4 py-3">
            <div className="min-w">
              <div className="flex items-baseline justify-between">
                <span className="font-medium">Atributos</span>
                <Button
                  onClick={() => setActive(false)}
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <div className="mb-2 pt-1">
                <Select disabled={!hasAnyLayer}>
                  <SelectTrigger className="w-full">
                    <SelectValue
                      placeholder={
                        hasAnyLayer
                          ? "Selecione uma camada"
                          : "Nenhum camada pesquisável ativa"
                      }
                    />
                  </SelectTrigger>
                  <SelectContent>
                    {camadasComAtributos.map((x) => (
                      <SelectItem key={x.id} value={x.url}>
                        {x.nome}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              {!hasAnyLayer || attributes.length == 0 ? (
                <Alert>
                  Selecione uma camada e clique sobre o mapa para ler os
                  atributos
                </Alert>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="h-8 w-[100px]">Atributo</TableHead>
                      <TableHead className="h-8">Valor</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {attributes.map((x) => {
                      return x.map((a) => (
                        <TableRow key={a.key}>
                          <TableCell className="max-w-[12.5rem] truncate py-2">
                            {a.key}
                          </TableCell>
                          <TableCell className="w-full truncate py-2">
                            {a.value}
                          </TableCell>
                        </TableRow>
                      ));
                    })}
                  </TableBody>
                </Table>
              )}
            </div>
          </div>
        </Portal>
      )}
    </>
  );
};
