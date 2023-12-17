import { BBox } from "geojson";
import { LatLngBounds, LatLngBoundsLiteral } from "leaflet";

export const ToLatLngBound = (bbox: BBox): LatLngBoundsLiteral => {
  const latLngBound: LatLngBoundsLiteral = [
    [bbox[1], bbox[0]],
    [bbox[3], bbox[2]]
  ];
  return latLngBound;
};

export const ToBBox = (latLngBounds: LatLngBounds) => {
  return latLngBounds
    .toBBoxString()
    .split(",")
    .map((x) => Number(x)) as [number, number, number, number];
};
