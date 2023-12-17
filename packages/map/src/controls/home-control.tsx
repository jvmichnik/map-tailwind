import { LatLngBoundsLiteral } from "leaflet";
import { Home } from "lucide-react";
import { useEffect } from "react";
import { useMap } from "react-leaflet";

type HomeControlProps = {
  latLng: LatLngBoundsLiteral;
};

export const HomeControl = ({ latLng }: HomeControlProps) => {
  const map = useMap();

  useEffect(() => {
    if (latLng) {
      map.fitBounds(latLng);
    }
  }, [map, latLng]);

  const goHome = () => {
    map.fitBounds(latLng);
  };

  return (
    <div className="leaflet-control leaflet-bar">
      <a onClick={goHome} title="Posição inicial">
        <div className="flex h-full items-center justify-center">
          <Home className="h-4 w-4" />
        </div>
      </a>
    </div>
  );
};
