"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import { Suspense, useEffect, useRef, useState } from "react";
import * as THREE from "three";

const WORDMARK = "AQSHAIDEV";

function Wordmark() {
  const group = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  const target = useRef(new THREE.Vector3(1, 1, 1));

  useFrame((_, delta) => {
    if (!group.current) return;
    target.current.set(hovered ? 1.045 : 1, hovered ? 0.96 : 1, hovered ? 1.025 : 1);
    group.current.scale.lerp(target.current, 1 - Math.exp(-delta * (hovered ? 13 : 7)));
    group.current.rotation.y = THREE.MathUtils.damp(group.current.rotation.y, hovered ? -0.055 : 0, 4, delta);
    group.current.rotation.x = THREE.MathUtils.damp(group.current.rotation.x, hovered ? 0.018 : 0, 4, delta);
  });

  const layers = [
    { z: -0.19, y: -0.105, color: "#07122f" },
    { z: -0.15, y: -0.082, color: "#10265f" },
    { z: -0.11, y: -0.058, color: "#173d9d" },
    { z: -0.07, y: -0.034, color: "#2859ce" },
  ];

  return (
    <group
      ref={group}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onClick={() => setHovered((value) => !value)}
    >
      {layers.map((layer) => (
        <Text
          key={layer.z}
          position={[0, layer.y, layer.z]}
          fontSize={0.72}
          letterSpacing={-0.055}
          anchorX="center"
          anchorY="middle"
          color={layer.color}
          outlineWidth={0.006}
          outlineColor="#0b1d50"
        >
          {WORDMARK}
        </Text>
      ))}

      <Text
        position={[0, 0.006, 0]}
        fontSize={0.72}
        letterSpacing={-0.055}
        anchorX="center"
        anchorY="middle"
        color="#f4f8ff"
        outlineWidth={0.014}
        outlineColor="#8db8ff"
        outlineOpacity={1}
        strokeColor="#9bc4ff"
        strokeWidth={0.012}
      >
        {WORDMARK}
        <meshPhysicalMaterial
          color="#eaf2ff"
          metalness={0.72}
          roughness={0.16}
          clearcoat={1}
          clearcoatRoughness={0.12}
          emissive="#2457d6"
          emissiveIntensity={0.42}
        />
      </Text>
    </group>
  );
}

export function HeroWordmark() {
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);

  return (
    <div className="wordmark-wrap">
      <div className="wordmark-canvas">
        {ready ? (
          <Canvas
            dpr={[1, 2]}
            camera={{ position: [0, 0, 4.05], fov: 31 }}
            gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
          >
            <ambientLight intensity={0.8} />
            <directionalLight position={[0, 3, 4]} intensity={4.2} color="#ffffff" />
            <pointLight position={[-2.5, 0.5, 2]} intensity={4.2} color="#326bff" />
            <pointLight position={[2.5, -0.8, 1.5]} intensity={2.8} color="#8bc4ff" />
            <pointLight position={[0, 1.5, -1]} intensity={1.5} color="#244de0" />
            <Suspense fallback={null}>
              <Wordmark />
            </Suspense>
          </Canvas>
        ) : (
          <div className="wordmark-fallback">{WORDMARK}</div>
        )}
      </div>
    </div>
  );
}
