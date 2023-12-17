import Cropper, { ReactCropperElement } from "react-cropper";
import { useRef, useState } from "react";
import { ActionItem } from "./action-item";
import { Camera } from "lucide-react";
import { useStreetViewImageViewerContext } from "../../../../contexts/streetview-context";
import { TakePictureProps } from "./take-photo";

export const TakePicture = ({ onFinishCrop }: TakePictureProps) => {
  const cropperRef = useRef<ReactCropperElement>(null);
  const { imagePannelumRef } = useStreetViewImageViewerContext();
  const [isOpen, setIsOpen] = useState(false);
  const [image, setImage] = useState("");
  const [cropData, setCropData] = useState("");
  const hasCroppedImage = !!cropData;

  function cropImage() {
    if (typeof cropperRef.current?.cropper !== "undefined") {
      setCropData(cropperRef.current?.cropper.getCroppedCanvas().toDataURL());
    }
  }

  function onOpen() {
    setIsOpen(true);
  }

  function onClose() {
    setIsOpen(false);
  }

  function clearImage() {
    setCropData("");
  }

  function getImage() {
    if (imagePannelumRef && imagePannelumRef.current) {
      const pannellum = imagePannelumRef.current as any;
      const viewer = pannellum.getViewer();

      return viewer
        .getRenderer()
        .render(
          (viewer.getPitch() / 180) * Math.PI,
          (viewer.getYaw() / 180) * Math.PI,
          (viewer.getHfov() / 180) * Math.PI,
          { returnImage: true }
        );
    }
  }

  function abrir() {
    onOpen();

    var img = getImage();
    clearImage();
    setImage(img);
  }

  function close() {
    clearImage();
    onClose();
  }

  function finish() {
    fetch(cropData)
      .then((res) => res.blob())
      .then((res) => {
        onFinishCrop(res);
        onClose();
      });
  }

  return (
    <>
      <ActionItem
        title="Tirar foto"
        icon={<Camera />}
        onClick={() => abrir()}
      />
      <Dialog
        open={isOpen}
        onOpenChange={(open) => {
          if (!open) onClose();
        }}
      >
        <DialogContent className="w-full max-w-2xl">
          <DialogHeader>
            <DialogTitle>Recortar foto</DialogTitle>
          </DialogHeader>
          <div>
            {hasCroppedImage && (
              <>
                <div
                  className={`h-[24rem] bg-gray-100 bg-contain bg-center bg-no-repeat`}
                />
                <Button className="mt-2 w-full" onClick={clearImage}>
                  Ir para área de recorte
                </Button>
              </>
            )}
            {!hasCroppedImage && (
              <>
                <div className="w-full">
                  <Cropper
                    ref={cropperRef}
                    style={{ width: "100%", minHeight: "24rem" }}
                    autoCropArea={1}
                    initialAspectRatio={16 / 9}
                    src={image}
                    viewMode={1}
                    minCropBoxHeight={10}
                    minCropBoxWidth={10}
                    background={false}
                    responsive={true}
                    checkOrientation={false}
                    guides={true}
                    dragMode="crop"
                  />
                </div>
                <div className="mt-2 w-full">
                  <Button
                    className="w-full"
                    variant="ghost"
                    onClick={cropImage}
                  >
                    Cortar imagem
                  </Button>
                </div>
              </>
            )}
          </div>

          <DialogFooter>
            {hasCroppedImage && (
              <Button className="mr-2" onClick={finish}>
                Concluir
              </Button>
            )}
            <DialogClose asChild>
              <Button variant="ghost" onClick={close}>
                Cancelar e fechar
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
