import { ComponentProps } from "react";

type PopupMapProps = {
  children: React.ReactNode;
} & ComponentProps<"div">;

export const PopupMap = ({ children, ...props }: PopupMapProps) => {
  return (
    <div
      className="leaflet-control leaflet-popup-notice absolute bottom-20 left-2/4 z-[2000] -translate-x-2/4 rounded-md px-4 py-2"
      {...props}
    >
      {children}
    </div>
  );
};
