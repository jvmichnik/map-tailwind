import React, { createContext, useContext, useState } from "react";

interface Context {
  isVisibilityOpened: boolean;
  openVisibility: () => void;
  closeVisibility: () => void;

  isFilterOpened: boolean;
  openFilter: () => void;
  closeFilter: () => void;
}

const TriggerAreaContext = createContext<Context>({
  isVisibilityOpened: false,
  openVisibility: () => null,
  closeVisibility: () => null,

  isFilterOpened: false,
  openFilter: () => null,
  closeFilter: () => null,
});

const Provider = ({ children }: { children: React.ReactNode }) => {
  const [isFilterOpened, setFilterOpened] = useState(false);
  const [isVisibilityOpened, setVisibility] = useState(false);

  function closeVisibility() {
    if (!isFilterOpened) {
      setVisibility(false);
    }
  }

  return (
    <TriggerAreaContext.Provider
      value={{
        isVisibilityOpened: isVisibilityOpened,
        openVisibility: () => setVisibility(true),
        closeVisibility: closeVisibility,
        isFilterOpened: isFilterOpened,
        openFilter: () => setFilterOpened(true),
        closeFilter: () => setFilterOpened(false),
      }}
    >
      {children}
    </TriggerAreaContext.Provider>
  );
};

export const useTriggerArea = (): Context => useContext(TriggerAreaContext);

export default Provider;
