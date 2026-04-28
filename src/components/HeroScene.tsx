import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Sphere, Environment } from "@react-three/drei";
import * as THREE from "three";

const Knot = () => {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.x = state.clock.elapsedTime * 0.15;
    ref.current.rotation.y = state.clock.elapsedTime * 0.2;
  });
  return (
    <Float speed={1.2} rotationIntensity={0.4} floatIntensity={1.2}>
      <mesh ref={ref} scale={1.4}>
        <torusKnotGeometry args={[1, 0.32, 220, 32]} />
        <MeshDistortMaterial
          color="#22d3ee"
          emissive="#0e7490"
          emissiveIntensity={0.4}
          roughness={0.18}
          metalness={0.85}
          distort={0.32}
          speed={1.4}
        />
      </mesh>
    </Float>
  );
};

const Orb = ({ position, color, scale }: { position: [number, number, number]; color: string; scale: number }) => (
  <Float speed={2} rotationIntensity={0.6} floatIntensity={2}>
    <Sphere args={[scale, 32, 32]} position={position}>
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.6} roughness={0.3} />
    </Sphere>
  </Float>
);

const HeroScene = () => {
  return (
    <Canvas
      dpr={[1, 2]}
      camera={{ position: [0, 0, 5], fov: 45 }}
      gl={{ antialias: true, alpha: true }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 5, 5]} intensity={1.2} color="#7dd3fc" />
        <pointLight position={[-5, -3, -2]} intensity={1.5} color="#22d3ee" />
        <Knot />
        <Orb position={[2.4, 1.4, -1]} color="#5eead4" scale={0.18} />
        <Orb position={[-2.6, -1.2, -0.5]} color="#38bdf8" scale={0.14} />
        <Orb position={[2, -1.6, 0]} color="#22d3ee" scale={0.1} />
        <Environment preset="city" />
      </Suspense>
    </Canvas>
  );
};

export default HeroScene;
