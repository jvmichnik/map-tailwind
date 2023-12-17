import { ReactNode } from "react";
import { Tooltip } from "../../../../components/tooltip";
import { Button } from "../../../../components/button";

export type ActionBarProps = {
  icon: ReactNode;
  onClick: () => void;
  title: string;
};

export const ActionItem = ({ title, icon, onClick }: ActionBarProps) => {
  return (
    <Tooltip text={title}>
      <Button
        variant="ghost"
        size="icon"
        onClick={onClick}
        className="text-md h-7 w-7 p-1.5 !text-gray-600"
      >
        {icon}
      </Button>
    </Tooltip>
  );
};
