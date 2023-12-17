import { ChevronUp } from "lucide-react";
import { useStreetViewImageViewerContext } from "../../../../contexts/streetview-context";

export type ArrowDirectionsProps = {
  onClick?: (id: string) => void;
};

export const ArrowDirections = ({ onClick }: ArrowDirectionsProps) => {
  const { isFullscreen, pontosVizinhos, rotationAngle } =
    useStreetViewImageViewerContext();

  const rotationZ = rotationAngle * -1;
  const scale = isFullscreen ? 1 : 0.5;

  function handleClick(id: string) {
    if (onClick) onClick(id);
  }
  return (
    <div
      data-fullscreen={isFullscreen}
      className="absolute bottom-2 left-2/4 z-10 flex h-36 w-36 items-center justify-center data-[fullscreen=true]:bottom-20"
      style={{
        transform: `translateX(-50%) rotateZ(${rotationZ}deg) scale(${scale})`,
      }}
    >
      {pontosVizinhos.map((p) => (
        <div
          key={p.id}
          className="absolute top-0 z-0"
          style={{
            transform: `translateY(-50%) rotateZ(${p.angulo}deg)`,
            transformOrigin: "50% 160%",
          }}
        >
          <a
            className="block cursor-pointer rounded-full p-1 hover:bg-black/30"
            onClick={() => handleClick(p.id)}
          >
            <ChevronUp className="h-16 w-16 text-white" />
          </a>
        </div>
      ))}
    </div>
  );
};
