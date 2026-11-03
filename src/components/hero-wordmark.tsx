"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import { Suspense, useEffect, useRef, useState } from "react";
import * as THREE from "three";

function Wordmark() {
  const group = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  const target = useRef(new THREE.Vector3(1, 1, 1));

  useFrame((_, delta) => {
    if (!group.current) return;
    target.current.set(hovered ? 1.025 : 1, hovered ? 0.94 : 1, hovered ? 0.98 : 1);
    group.current.scale.lerp(target.current, 1 - Math.exp(-delta * (hovered ? 14 : 8)));
    group.current.rotation.y = THREE.MathUtils.damp(group.current.rotation.y, hovered ? -0.035 : 0, 5, delta);
  });

  return (
    <group
      ref={group}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onClick={() => setHovered(value => !value)}
    >
      {/* Layered faces create a crisp, readable extruded-metal effect. */}
      <Text position={[0, -0.075, -0.13]} fontSize={0.66} letterSpacing={-0.065} anchorX="center" anchorY="middle" color="#07122f">
        AQSHAIDEV
      </Text>
      <Text position={[0, -0.052, -0.09]} fontSize={0.66} letterSpacing={-0.065} anchorX="center" anchorY="middle" color="#163b9a">
        AQSHAIDEV
      </Text>
      <Text
        position={[0, 0, 0]}
        fontSize={0.66}
        letterSpacing={-0.065}
        anchorX="center"
        anchorY="middle"
        color="#dce9ff"
        outlineWidth={0.012}
        outlineColor="#6e9dff"
        outlineOpacity={0.95}
        strokeColor="#7daaff"
        strokeWidth={0.008}
      >
        AQSHAIDEV
        <meshStandardMaterial color="#dce9ff" metalness={0.58} roughness={0.19} emissive="#315dce" emissiveIntensity={0.28} />
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
          <Canvas dpr={[1, 1.75]} camera={{ position: [0, 0, 4.25], fov: 34 }} gl={{ antialias: true, alpha: true }}>
            <ambientLight intensity={1.15} />
            <directionalLight position={[1.8, 2.5, 3]} intensity={3.8} color="#e7f0ff" />
            <pointLight position={[-2, -1, 2]} intensity={2.8} color="#326bff" />
            <pointLight position={[2, 0.5, 1]} intensity={1.4} color="#82b3ff" />
            <Suspense fallback={null}><Wordmark /></Suspense>
          </Canvas>
        ) : <div className="wordmark-fallback">AQSHAIDEV</div>}
      </div>
    </div>
  );
}
