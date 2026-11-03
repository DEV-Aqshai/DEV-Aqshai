"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import { Suspense, useEffect, useRef, useState } from "react";
import * as THREE from "three";

function Wordmark() {
  const group = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  const target = useRef(new THREE.Vector3(1, 1, 1));
  const pointer = useRef(new THREE.Vector2(0, 0));
  useFrame((_, delta) => {
    if (!group.current) return;
    target.current.set(hovered ? 1.035 : 1, hovered ? 0.91 : 1, hovered ? 0.96 : 1);
    group.current.scale.lerp(target.current, 1 - Math.exp(-delta * (hovered ? 13 : 8)));
    group.current.position.x = THREE.MathUtils.damp(group.current.position.x, pointer.current.x * 0.035, 5, delta);
    group.current.position.y = THREE.MathUtils.damp(group.current.position.y, 0, 5, delta);
  });
  return (
    <group ref={group} onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)}
      onPointerMove={e => { pointer.current.set(e.point.x, e.point.y); }}
      onClick={() => { setHovered(v => !v); }}>
      <Text position={[0, -0.018, -0.09]} fontSize={0.64} letterSpacing={-0.075} anchorX="center" anchorY="middle" color="#101c42">
        AQSHAIDEV
      </Text>
      <Text position={[0, 0, 0]} fontSize={0.64} letterSpacing={-0.075} anchorX="center" anchorY="middle" color="#8eb5ff">
        AQSHAIDEV
        <meshStandardMaterial color="#8eb5ff" metalness={0.72} roughness={0.24} />
      </Text>
    </group>
  );
}

export function HeroWordmark() {
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);
  return (
    <div className="wordmark-wrap">
      <div className="wordmark-hint"><span className="pulse-dot"/> INTERACTIVE OBJECT <span>· HOVER / PRESS</span></div>
      <div className="wordmark-canvas">
        {ready ? <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0, 4.6], fov: 36 }} gl={{ antialias: true, alpha: true }}>
          <ambientLight intensity={1.7}/>
          <directionalLight position={[1.8, 2.5, 3]} intensity={3.2} color="#dbe8ff"/>
          <pointLight position={[-2, -1, 2]} intensity={1.8} color="#315dff"/>
          <Suspense fallback={null}><Wordmark/></Suspense>
        </Canvas> : <div className="wordmark-fallback">AQSHAIDEV</div>}
      </div>
      <p className="wordmark-caption">A personal mark. Built to respond, not to drift.</p>
    </div>
  );
}
