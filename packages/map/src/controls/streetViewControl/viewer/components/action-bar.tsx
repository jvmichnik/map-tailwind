import { ReactNode } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../../../utils/cn";

const variantsContainer = cva("flex relative -top-8 z-[-1] justify-self-end", {
  variants: {
    container: {
      isFull: "right-0 top-0 z-10",
      isNotFull: "",
    },
  },
  defaultVariants: {
    container: "isNotFull",
  },
});

const variantsSubContainer = cva(
  "absolute flex space-x-0.5 right-1 bg-white px-0.5 py-0.5",
  {
    variants: {
      subContainer: {
        isFull: "mr-2 text-md rounded-b-lg",
        isNotFull: "shadow-lg -mb-3 pb-4 text-sm rounded-t-lg",
      },
    },
    defaultVariants: {
      subContainer: "isNotFull",
    },
  }
);

export type ActionBarProps = {
  children: ReactNode;
} & VariantProps<typeof variantsContainer> &
  VariantProps<typeof variantsSubContainer> &
  React.ButtonHTMLAttributes<HTMLDivElement>;

export const ActionBar = ({
  children,
  container,
  subContainer,
  className,
}: ActionBarProps) => {
  return (
    <div className={cn(variantsContainer({ container, className }))}>
      <div className={cn(variantsSubContainer({ subContainer, className }))}>
        {children}
      </div>
    </div>
  );
};
