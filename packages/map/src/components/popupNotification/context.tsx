import React, { ReactNode, createContext, useContext, useState } from "react";

interface Context {
  isOpen: boolean;
  open: (element: React.ReactNode) => void;
  close: () => void;
  toggle: (element: React.ReactNode) => void;
  childrenElement: React.ReactNode;
}

const PopupNotificationContext = createContext<Context>({
  isOpen: false,
  childrenElement: null,
  toggle: () => null,
  open: () => null,
  close: () => null,
});

const Provider = ({ children }: { children: ReactNode }) => {
  const [childrenElement, setChildrenElement] = useState<React.ReactNode>(null);
  const [isOpen, setIsOpen] = useState(false);

  const open = (element: React.ReactNode) => {
    setChildrenElement(element);
    setIsOpen(true);
  };

  const close = () => {
    setIsOpen(false);
  };

  const toggle = (element: React.ReactNode) => {
    isOpen ? close() : open(element);
  };

  return (
    <PopupNotificationContext.Provider
      value={{
        childrenElement,
        isOpen,
        open,
        close,
        toggle,
      }}
    >
      {children}
    </PopupNotificationContext.Provider>
  );
};

export const usePopupNotification = (): Context =>
  useContext(PopupNotificationContext);

export default Provider;
