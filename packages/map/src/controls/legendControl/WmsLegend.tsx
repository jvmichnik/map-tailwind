type Props = {
  url: string;
};

export const WmsLegend = ({ url }: Props) => {
  const urlSplit = url.split("?");
  const urlParams = new URLSearchParams(urlSplit[1]);
  const layers = urlParams.get("layers");
  const urlLegenda = `${urlSplit[0]}?layer=${layers}&service=WMS&request=GetLegendGraphic&format=image/jpeg&LEGEND_OPTIONS=fontSize:10;fontAntiAliasing:true;fontName:Roboto;dpi:100`;

  return <img src={urlLegenda} />;
};
