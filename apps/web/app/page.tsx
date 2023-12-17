"use client";

import { MapProps } from "map-tailwind";
import dynamic from "next/dynamic";

const Map = dynamic<MapProps>(() => import("map-tailwind"), {
  ssr: false,
});

export default function Page(): JSX.Element {
  return (
    <main
      className="bg-gray-900 text-lg"
      style={{ height: "100vh", width: "100vw" }}
    >
      <Map
        showTileBase
        boundDefault={[
          [-15.7184948, -47.9840269],
          [-15.8306081, -47.8414749],
        ]}
        grupoCamadas={[]}
      />
    </main>
  );
}
