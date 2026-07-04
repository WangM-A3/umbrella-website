"use client";

import { useEffect, useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const PARTICLE_COUNT = 6000;
const NEBULA_RADIUS = 8;

function ParticleNebula({ mouse }: { mouse: React.MutableRefObject<{ x: number; y: number }> }) {
  const meshRef = useRef<THREE.Points>(null);
  const geometryRef = useRef<THREE.BufferGeometry>(null);

  const { positions, colors, sizes } = useMemo(() => {
    const pos = new Float32Array(PARTICLE_COUNT * 3);
    const col = new Float32Array(PARTICLE_COUNT * 3);
    const siz = new Float32Array(PARTICLE_COUNT);

    const color1 = new THREE.Color("#00d4ff");
    const color2 = new THREE.Color("#7b2ffc");

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const radius = Math.pow(Math.random(), 1.5) * NEBULA_RADIUS;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      pos[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta) * 0.6;
      pos[i * 3 + 2] = radius * Math.cos(phi);

      const mixFactor = (pos[i * 3 + 1] / NEBULA_RADIUS + 0.5) * 0.8 + 0.2 * Math.random();
      const color = color1.clone().lerp(color2, mixFactor);

      col[i * 3] = color.r;
      col[i * 3 + 1] = color.g;
      col[i * 3 + 2] = color.b;

      siz[i] = 0.02 + Math.random() * 0.06;
    }

    return { positions: pos, colors: col, sizes: siz };
  }, []);

  useEffect(() => {
    if (!geometryRef.current) return;
    const geo = geometryRef.current;
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    geo.setAttribute("size", new THREE.BufferAttribute(sizes, 1));
  }, [positions, colors, sizes]);

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.elapsedTime;
    const posAttr = meshRef.current.geometry.getAttribute("position") as THREE.BufferAttribute;
    if (!posAttr) return;
    const array = posAttr.array as Float32Array;

    const rotY = time * 0.03;
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const idx = i * 3;
      const x = positions[idx];
      const y = positions[idx + 1];
      const z = positions[idx + 2];
      const cosY = Math.cos(rotY);
      const sinY = Math.sin(rotY);
      array[idx] = x * cosY - z * sinY;
      array[idx + 1] = y + Math.sin(time * 0.5 + i * 0.01) * 0.003;
      array[idx + 2] = x * sinY + z * cosY;
    }
    posAttr.needsUpdate = true;

    const mx = mouse.current.x * 0.3;
    const my = mouse.current.y * 0.2;
    meshRef.current.rotation.x += (my - meshRef.current.rotation.x) * 0.01;
    meshRef.current.rotation.y += (mx - meshRef.current.rotation.y) * 0.01;
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry ref={geometryRef} />
      <pointsMaterial
        size={0.04}
        vertexColors
        transparent
        opacity={0.85}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

export default function ParticleBackground() {
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      };
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 z-0" style={{ pointerEvents: "none" }}>
      <Canvas
        camera={{ position: [0, 0, 12], fov: 60, near: 0.1, far: 100 }}
        dpr={[0.5, 1.5]}
        gl={{ antialias: false, powerPreference: "high-performance", alpha: true, stencil: false }}
      >
        <ParticleNebula mouse={mouseRef} />
      </Canvas>
    </div>
  );
}
