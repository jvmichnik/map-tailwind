/* eslint-disable @typescript-eslint/no-explicit-any */
import L from "leaflet";
import pt from "./locales/pt";

export const languages: Language[] = ["pt"];

export const drawLocales = (): DrawLocal => {
  const locale = pt;

  // Automatically defines Leaflet.draw locale
  try {
    const leaflet: any = L;
    if (leaflet && leaflet.drawLocal) {
      leaflet.drawLocal = locale;
    }
  } catch {
    // Did not modify Leaflet.draw global
  }
  return locale;
};

export default drawLocales;

export type Language = "pt";

export interface DrawLocal {
  draw: Draw;
  edit: Edit;
}

export interface Draw {
  toolbar: DrawToolbar;
  handlers: DrawHandlers;
}

export interface Edit {
  toolbar: EditToolbar;
  handlers: EditHandlers;
}

export interface Action {
  title: string;
  text: string;
}

export interface DrawToolbar {
  actions: Action;
  finish: Action;
  undo: Action;
  buttons: {
    polyline: string;
    polygon: string;
    rectangle: string;
    circle: string;
    marker: string;
    circlemarker: string;
  };
}

export interface Tooltip {
  start?: string;
  cont?: string;
  end?: string;
}

export interface DrawHandlers {
  circle: {
    tooltip: {
      start: string;
    };
    radius: string;
  };
  circlemarker: {
    tooltip: {
      start: string;
    };
  };
  marker: {
    tooltip: {
      start: string;
    };
  };
  polygon: {
    tooltip: {
      start: string;
      cont: string;
      end: string;
    };
  };
  polyline: {
    error: string;
    tooltip: {
      start: string;
      cont: string;
      end: string;
    };
  };
  rectangle: {
    tooltip: {
      start: string;
    };
  };
  simpleshape: {
    tooltip: {
      end: string;
    };
  };
}

export interface EditToolbar {
  actions: {
    save: Action;
    cancel: Action;
    clearAll: Action;
  };
  buttons: {
    edit: string;
    editDisabled: string;
    remove: string;
    removeDisabled: string;
  };
}

export interface EditHandlers {
  edit: {
    tooltip: {
      text: string;
      subtext: string;
    };
  };
  remove: {
    tooltip: {
      text: string;
    };
  };
}
