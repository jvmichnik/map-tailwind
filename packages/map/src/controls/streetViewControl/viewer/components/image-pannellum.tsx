import Pannellum from "pannellum-react/es/elements/Pannellum";
import { useEffect } from "react";
import { useStreetViewImageViewerContext } from "../../../../contexts/streetview-context";

export const ImagePannellum = () => {
  const {
    isFullscreen,
    imageUrl,
    rotationX,
    inclinationY,
    handleRotateX,
    handleInclinateY,
    imagePannelumRef,
  } = useStreetViewImageViewerContext();

  useEffect(() => {
    if (imagePannelumRef && imagePannelumRef.current && imageUrl) {
      const pannellum = imagePannelumRef.current as any;
      pannellum.forceRender();
    }
  }, [imageUrl, isFullscreen]);

  return (
    <div
      data-fullscreen={isFullscreen}
      className="relative h-full w-full overflow-hidden shadow-lg data-[fullscreen=false]:rounded-none data-[fullscreen=true]:rounded-lg"
    >
      <Pannellum
        ref={imagePannelumRef}
        width="100%"
        height="100%"
        image={imageUrl || ""}
        pitch={inclinationY}
        yaw={rotationX}
        maxPitch={100}
        minPitch={-50}
        hfov={110}
        maxHfov={120}
        autoLoad
        showControls={false}
        compass={false}
        orientationOnByDefault
        onRender={() => {
          if (imagePannelumRef && imagePannelumRef.current) {
            const pannellum = imagePannelumRef.current as any;

            const yaw = pannellum.getViewer().getYaw();
            const pitch = pannellum.getViewer().getPitch();
            handleRotateX(yaw);
            handleInclinateY(pitch);
          }
        }}
      />
    </div>
  );
};
