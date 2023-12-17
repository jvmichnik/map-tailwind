import { usePopupNotification } from "./context";
import { PopupMap } from "./popup-map";

export const PopupNotification = () => {
  const { isOpen, childrenElement } = usePopupNotification();

  if (!isOpen) {
    return null;
  }

  return <PopupMap>{childrenElement}</PopupMap>;
};
