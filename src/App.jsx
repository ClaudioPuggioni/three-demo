import { Canvas } from "@react-three/fiber";
import React, { Suspense } from "react";
import Earth from "./components/earth";
import Menu from "./components/menu";

export default function App() {
  return (
    <div className="min-h-screen h-screen flex justify-center items-center bg-[#01000f]">
      <Menu />
      <Canvas>
        <Suspense fallback={null}>
          <Earth />
        </Suspense>
      </Canvas>
    </div>
  );
}
