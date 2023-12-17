/* eslint-disable react-hooks/rules-of-hooks */
import { createControlComponent } from "@react-leaflet/core";
import L, { Control, ControlOptions, Map, Polygon } from "leaflet";
import { useMemo } from "react";
import { ZoomBoxMessage } from "./message";
import { usePopupNotification } from "../../components/popupNotification/context";

type ControlProps = {
  _isActive: boolean;
  _isHolding: boolean;
  _startLatLng: { lat: number; lng: number } | null;
  _drawPolygon: Polygon<any> | null;
  _map?: Map;
  _sticky: boolean;
  _boxZoomButton: HTMLAnchorElement | null;
  _divButton: HTMLDivElement;
  onAdd?(map: Map): HTMLElement;
  onRemove?(map: Map): void;
  _start(map: Map, boxZoomButton: HTMLAnchorElement): void;
  _stop(map: Map, boxZoomButton: HTMLAnchorElement): void;
  _handleMouseDown(e: any): void;
  _handleMouseMove(e: any): void;
  _handleMouseUp(e: any): void;
};

const messageElement = <ZoomBoxMessage />;
const createZoomBoxContainer = (props: ControlOptions) => {
  const { open, close } = usePopupNotification();

  const zoomBoxProps: ControlProps = useMemo(() => {
    console.log("---- Iniciado ZoomBox");
    const funcProps: ControlProps = {
      _isActive: false,
      _isHolding: false,
      _startLatLng: null,
      _drawPolygon: null,
      _sticky: false,
      _boxZoomButton: null,
      _divButton: L.DomUtil.create("div"),
      onAdd: function (map: Map) {
        const div = L.DomUtil.create("div", "leaflet-control leaflet-bar");

        const link = L.DomUtil.create("a", "control-custom", div);

        link.onclick = () => {
          if (this._isActive) {
            this._stop(map, link);
          } else {
            this._start(map, link);
          }
        };

        link.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-crop"><path d="M6 2v14a2 2 0 0 0 2 2h14"/><path d="M18 22V8a2 2 0 0 0-2-2H2"/></svg>`;
        link.title = "Seleção de zoom";

        this._boxZoomButton = link;
        this._divButton = div;
        this._map = map;

        return div;
      },
      _start: function (map: Map) {
        open(messageElement);

        L.DomUtil.addClass(this._divButton, "button-enabled");
        map.dragging.disable();

        const container = map.getContainer();
        L.DomUtil.addClass(container, "crosshair-cursor-enabled");

        this._isActive = true;
        this._startLatLng = null;

        map.addEventListener("mousedown", this._handleMouseDown, this);
        map.addEventListener("mousemove", this._handleMouseMove, this);
        map.addEventListener("mouseup", this._handleMouseUp, this);
      },
      _stop: function (map: Map) {
        close();

        map.dragging.enable();
        L.DomUtil.removeClass(this._divButton, "button-enabled");

        const container = map.getContainer();
        L.DomUtil.removeClass(container, "crosshair-cursor-enabled");

        this._isActive = false;
        this._startLatLng = null;

        map.removeEventListener("mousedown", this._handleMouseDown, this);
        map.removeEventListener("mousemove", this._handleMouseMove, this);
        map.removeEventListener("mouseup", this._handleMouseUp, this);
      },
      _handleMouseDown: function (e) {
        this._startLatLng = e.latlng;
        this._isHolding = true;
      },
      _handleMouseMove: function (e) {
        const map = this._map;
        if (
          this._startLatLng === null ||
          this._startLatLng === undefined ||
          !map
        ) {
          return;
        }

        if (!this._isHolding && this._boxZoomButton) {
          return;
        }

        const ne = this._startLatLng;
        const nw = new L.LatLng(this._startLatLng.lat, e.latlng.lng);
        const sw = e.latlng;
        const se = new L.LatLng(e.latlng.lat, this._startLatLng.lng);

        if (this._drawPolygon === null || this._drawPolygon === undefined) {
          this._drawPolygon = new L.Polygon([ne, nw, sw, se]);
          map.addLayer(this._drawPolygon);
        } else {
          this._drawPolygon.setLatLngs([ne, nw, sw, se]);
        }
      },
      _handleMouseUp: function (e) {
        this._isHolding = false;
        const map = this._map;
        if (!map) return;

        if (
          this._startLatLng === null ||
          this._startLatLng === undefined ||
          this._startLatLng.lat === e.latlng.lat ||
          this._startLatLng.lng === e.latlng.lng ||
          this._isActive === false
        ) {
          return;
        }

        const ne = this._startLatLng;
        const sw = e.latlng;

        const bounds = L.latLngBounds([ne, sw]);
        map.fitBounds(bounds, { animate: false });

        this._startLatLng = null;
        if (this._drawPolygon) {
          map.removeLayer(this._drawPolygon);
        }
        this._drawPolygon = null;

        if (this._sticky) {
          this._startLatLng = null;
        } else {
          if (this._boxZoomButton) {
            this._boxZoomButton.click();
          }
        }
      },
    };

    return funcProps;
  }, []);

  const instance = Control.extend(zoomBoxProps);

  return new instance(props);
};

export const ZoomBoxControl = createControlComponent(createZoomBoxContainer);
