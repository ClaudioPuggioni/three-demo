import React, { useRef } from "react";
import { useLoader, useFrame } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import * as THREE from "three";

import EarthDayMap from "../../assets/textures/8k_earth_daymap.jpg";
import EarthNormalMap from "../../assets/textures/8k_earth_normal_map.jpg";
import EarthSpecularMap from "../../assets/textures/8k_earth_specular_map.jpg";
import EarthCloudsMap from "../../assets/textures/8k_earth_clouds.jpg";

export default function Earth(props) {
  const [colorMap, normalMap, specularMap, cloudsMap] = useLoader(THREE.TextureLoader, [
    EarthDayMap,
    EarthNormalMap,
    EarthSpecularMap,
    EarthCloudsMap,
  ]);
  const earthRef = useRef();
  const cloudsRef = useRef();

  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime();
    earthRef.current.rotation.y = elapsedTime / 70;
    cloudsRef.current.rotation.y = elapsedTime / 103;
  });

  return (
    <>
      {/* <ambientLight intensity={1.5} /> */}
      <spotLight
        castShadow
        color="#fffef0"
        position={[-10, 0, 11]}
        intensity={7}
        angle={0.17}
        // shadow-mapSize-height={512}
        // shadow-mapSize-width={512}
        // shadow-radius={10}
        // shadow-bias={99999999}
        penumbra={0.7}
      />
      {/* <spotLightHelper /> */}

      <Stars depth={500} count={20000} factor={3} saturation={1000} fade={true} />
      <mesh ref={cloudsRef}>
        <sphereGeometry args={[2.5005, 155, 155]} />
        <meshPhongMaterial map={cloudsMap} opacity={0.47} depthWrite={true} transparent={true} side={THREE.DoubleSide} />
      </mesh>

      <mesh ref={earthRef}>
        <sphereGeometry args={[2.5, 155, 155]} />
        <meshPhongMaterial specularMap={specularMap} />
        <meshStandardMaterial map={colorMap} normalMap={normalMap} metalness={0.7} roughness={1} />
        {/* <axesHelper args={[10, 10, 10]} /> */}
        {/* <OrbitControls enableZoom={true} enablePan={true} enableRotate={true} zoomSpeed={0.6} panSpeed={0.5} rotateSpeed={0.4} /> */}
      </mesh>
    </>
  );
}
