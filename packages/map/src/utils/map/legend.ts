import L, { Control } from "leaflet";

type Props = {
  options: {
    position: string;
    uri: string;
  };
  container: HTMLDivElement | null;
  img: HTMLImageElement | null;
  height: number | null;
  width: number | null;
  displayStyle: string;
  onAdd?(): HTMLElement;
  _click(e: Event): void;
};

const legendControlProps: Props = {
  options: {
    position: "topright",
    uri: ""
  },
  container: null,
  img: null,
  height: null,
  width: null,
  displayStyle: "",
  _click: function (e: Event): void {
    L.DomEvent.stopPropagation(e);
    L.DomEvent.preventDefault(e);
    // toggle legend visibility
    if (this.container && this.img) {
      const style = window.getComputedStyle(this.img);
      if (style.display === "none") {
        this.container.style.height = this.height + "px";
        this.container.style.width = this.width + "px";
        this.img.style.display = this.displayStyle;
      } else {
        if (this.width === null && this.height === null) {
          // Only do inside the above check to prevent the container
          // growing on successive uses
          this.height = this.container.offsetHeight;
          this.width = this.container.offsetWidth;
        }
        this.displayStyle = this.img.style.display;
        this.img.style.display = "none";
        this.container.style.height = "20px";
        this.container.style.width = "20px";
      }
    }
  },
  onAdd: function () {
    const controlClassName = "leaflet-control-wms-legend",
      legendClassName = "wms-legend",
      stop = L.DomEvent.stopPropagation;
    this.container = L.DomUtil.create("div", controlClassName);
    this.img = L.DomUtil.create("img", legendClassName, this.container);
    this.img.src = this.options.uri;
    this.img.alt = "Legend";

    L.DomEvent.on(this.img, "click", this._click, this)
      .on(this.container, "click", this._click, this)
      .on(this.img, "mousedown", stop)
      .on(this.img, "dblclick", stop)
      .on(this.img, "click", L.DomEvent.preventDefault)
      .on(this.img, "click", stop);
    this.height = null;
    this.width = null;
    return this.container;
  }
};

export const addLegend = (uri: string, map: L.Map) => {
  const instance = Control.extend(legendControlProps);
  const wmsLegendControl = new instance();
  wmsLegendControl.options.uri = uri;
  map.addControl(wmsLegendControl);
  return wmsLegendControl;
};
