import { useEffect, useRef } from "react";
import { Marker } from "react-leaflet";
import { Marker as LeafletMarker } from "leaflet";
import "leaflet-rotatedmarker";
import L from "leaflet";
import { useStreetViewImageViewerContext } from "../../../../contexts/streetview-context";

const markerIcon = L.divIcon({
  html: `<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
  <g clip-path="url(#clip0_519_46)">
  <mask id="mask0_519_46" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="40" height="40">
  <path d="M40 0H0V40H40V0Z" fill="white"/>
  </mask>
  <g mask="url(#mask0_519_46)">
  <path d="M16.3125 21.5L9.66497 -1.5H31.3097L23.7625 21.5H16.3125Z" fill="url(#paint0_linear_519_46)" fill-opacity="0.21" stroke="#EEEEEE"/>
  <g filter="url(#filter0_d_519_46)">
  <path d="M20 32C24.4183 32 28 28.4183 28 24C28 19.5817 24.4183 16 20 16C15.5817 16 12 19.5817 12 24C12 28.4183 15.5817 32 20 32Z" fill="#F1528B"/>
  <path d="M20 31C23.866 31 27 27.866 27 24C27 20.134 23.866 17 20 17C16.134 17 13 20.134 13 24C13 27.866 16.134 31 20 31Z" stroke="white" stroke-width="2"/>
  </g>
  </g>
  </g>
  <defs>
  <filter id="filter0_d_519_46" x="10" y="15" width="20" height="20" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
  <feFlood flood-opacity="0" result="BackgroundImageFix"/>
  <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
  <feOffset dy="1"/>
  <feGaussianBlur stdDeviation="1"/>
  <feComposite in2="hardAlpha" operator="out"/>
  <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
  <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_519_46"/>
  <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_519_46" result="shape"/>
  </filter>
  <linearGradient id="paint0_linear_519_46" x1="20.5" y1="-2" x2="20.5" y2="22" gradientUnits="userSpaceOnUse">
  <stop stop-opacity="0"/>
  <stop offset="0.46875"/>
  </linearGradient>
  <clipPath id="clip0_519_46">
  <rect width="40" height="40" fill="white"/>
  </clipPath>
  </defs>
  </svg>
  `,
  className: "",
  iconSize: [40, 40],
  iconAnchor: [20, 24],
});

type Props = {
  children?: React.ReactNode;
};

export const RotatedMarker = ({ children }: Props) => {
  const markerRef = useRef<LeafletMarker>(null);
  const { position, rotationAngle } = useStreetViewImageViewerContext();

  useEffect(() => {
    const marker = markerRef.current as any;
    if (marker) {
      marker.setRotationAngle(rotationAngle);
    }
  }, [rotationAngle]);

  if (!position) return null;

  return (
    <Marker
      ref={markerRef}
      icon={markerIcon}
      position={position}
      interactive={false}
    >
      {children}
    </Marker>
  );
};
