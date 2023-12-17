import { ReactNode } from "react";
import { useStreetViewImageViewerContext } from "../../../../contexts/streetview-context";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../../../utils/cn";

const variants = cva("z-[1000] shadow-lg", {
  variants: {
    variant: {
      isFull: "fixed top-0 left-0 right-0 bottom-0",
      isNotFull:
        "absolute bottom-10 right-0 md:right-14  aspect-video w-full max-w-md rounded-lg",
    },
  },
  defaultVariants: {
    variant: "isNotFull",
  },
});

export type ImageViewerProps = {
  children: ReactNode;
  topContainer: React.ReactNode;
} & VariantProps<typeof variants> &
  React.ButtonHTMLAttributes<HTMLDivElement>;

export const ViewerContainer = ({
  children,
  topContainer,
  variant,
  className,
}: ImageViewerProps) => {
  const { isFullscreen } = useStreetViewImageViewerContext();

  return (
    <div className={cn(variants({ variant, className }))}>
      {topContainer}
      {isFullscreen ? (
        <div className="relative h-full w-full">{children}</div>
      ) : (
        <div className="relative h-full w-full overflow-hidden rounded-lg">
          {children}
        </div>
      )}
    </div>
  );
};
