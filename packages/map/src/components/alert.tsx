import { ReactNode } from "react";

type AlertProps = {
  children: ReactNode;
  className?: string;
};

export function Alert({ children, className }: AlertProps) {
  return (
    <div className={"bg-gray-100 px-4 py-2 text-sm text-gray-700"}>
      {children}
    </div>
  );
}
