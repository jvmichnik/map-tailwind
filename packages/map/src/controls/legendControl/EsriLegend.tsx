/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { Skeleton } from "../../components/skeleton";
import { useEffect, useState } from "react";

type Props = {
  url: string;
};

type Category = {
  nome: string;
  legends: Legend[];
};

type Legend = {
  image: string;
  label: string;
};

const MAPSERVER = "mapserver";
export const EsriLegend = ({ url }: Props) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const index = url.toLowerCase().indexOf(MAPSERVER);
  const urlBase = url.substring(0, index + MAPSERVER.length);
  const layerIndex = url
    .substring(index + MAPSERVER.length, url.length)
    .replaceAll("/", "");
  const urlLegend = `${urlBase}/legend?f=pjson`;

  useEffect(() => {
    async function getLegend() {
      try {
        setIsLoading(true);
        const response = await fetch(urlLegend);
        const data = await response.json();
        const newCategories: Category[] = [];

        data.layers.forEach((x: any) => {
          if (x.layerId != layerIndex) return;

          const category: Category = {
            nome: x.layerName,
            legends: x.legend.map((element: any) => {
              return {
                image: element.imageData,
                label: element.label,
              };
            }),
          };

          newCategories.push(category);
        });
        setCategories(newCategories);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
    getLegend();
  }, [urlLegend, layerIndex]);

  if (isLoading) {
    return (
      <div className="w-full">
        <Skeleton className="h-[1.875rem] w-full" />
      </div>
    );
  }

  return (
    <div>
      {categories.map((c) => (
        <div key={c.nome}>
          <span className="font-medium">{c.nome}</span>
          {c.legends.map((l) => (
            <div key={l.image} className="w-full items-center">
              <img src={`data:image/png;base64, ${l.image}`} />
              <span className="bg-gray-800 pl-2">{l.label}</span>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};
