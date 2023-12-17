import L, { ControlPosition } from "leaflet";
import { useEffect } from "react";
import { useMap } from "react-leaflet";

import "leaflet-measure/dist/leaflet-measure.css";
import "leaflet-measure/dist/leaflet-measure.pt_BR";
import "./styles.css";

type Props = {
  position: ControlPosition;
};

export const MeasureMapControl = ({ position }: Props) => {
  const map = useMap();

  useEffect(() => {
    if (map) {
      const leaf: any = L.Control;
      const measureControl = new leaf.Measure({
        position: position,
        activeColor: "blue",
        completedColor: "blue",
        primaryLengthUnit: "meters",
        secondaryLengthUnit: "kilometers",
        primaryAreaUnit: "sqmeters",
        secondaryAreaUnit: undefined,
        units: {
          meters: {
            factor: 1,
            display: "meters",
            decimals: 2,
          },
          sqmeters: {
            factor: 1,
            display: "sqmeters",
            decimals: 2,
          },
        },
      });
      leaf.Measure.include({
        // set icon on the capture marker
        _setCaptureMarkerIcon: function () {
          // disable autopan
          this._captureMarker.options.autoPanOnFocus = false;

          // default function
          this._captureMarker.setIcon(
            L.divIcon({
              iconSize: this._map.getSize().multiplyBy(2),
            })
          );
        },
      });
      measureControl.addTo(map);
    }
  }, []);

  return null;
};
