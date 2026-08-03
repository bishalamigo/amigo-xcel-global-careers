import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const Knot = () => {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.x = state.clock.elapsedTime * 0.15;
    ref.current.rotation.y = state.clock.elapsedTime * 0.2;
    ref.current.position.y = 0.2 + Math.sin(state.clock.elapsedTime * 0.8) * 0.12;
  });
  return (
    <mesh ref={ref} scale={0.8} position={[2.4, 0.2, -0.5]}>
      <torusKnotGeometry args={[1, 0.32, 180, 32]} />
      <meshStandardMaterial
        color="#22d3ee"
        emissive="#0e7490"
        emissiveIntensity={0.15}
        roughness={0.45}
        metalness={0.7}
      />
    </mesh>
  );
};

const Orb = ({
  position,
  color,
  scale,
  offset,
}: {
  position: [number, number, number];
  color: string;
  scale: number;
  offset: number;
}) => {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + offset) * 0.25;
  });
  return (
    <mesh ref={ref} position={position}>
      <sphereGeometry args={[scale, 32, 32]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.6} roughness={0.3} />
    </mesh>
  );
};

const HeroScene = () => {
  return (
    <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 5], fov: 45 }} gl={{ antialias: true, alpha: true }}>
      <Suspense fallback={null}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={1.2} color="#7dd3fc" />
        <pointLight position={[-5, -3, -2]} intensity={1.5} color="#22d3ee" />
        <Knot />
        <Orb position={[2.4, 1.4, -1]} color="#5eead4" scale={0.18} offset={0} />
        <Orb position={[-2.6, -1.2, -0.5]} color="#38bdf8" scale={0.14} offset={1.5} />
        <Orb position={[2, -1.6, 0]} color="#22d3ee" scale={0.1} offset={3} />
      </Suspense>
    </Canvas>
  );
};

export default HeroScene;
