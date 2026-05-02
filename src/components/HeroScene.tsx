import { Suspense, useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Sphere, Icosahedron, Torus } from "@react-three/drei";
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
      <mesh ref={ref} scale={0.85} position={[2.4, 0.2, -0.5]}>
        <torusKnotGeometry args={[1, 0.32, 220, 32]} />
        <MeshDistortMaterial
          color="#22d3ee"
          emissive="#0e7490"
          emissiveIntensity={0.2}
          roughness={0.35}
          metalness={0.85}
          distort={0.32}
          speed={1.4}
        />
      </mesh>
    </Float>
  );
};

const FloatingIco = () => {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((s) => {
    if (!ref.current) return;
    ref.current.rotation.x = s.clock.elapsedTime * 0.25;
    ref.current.rotation.z = s.clock.elapsedTime * 0.18;
  });
  return (
    <Float speed={1.6} rotationIntensity={0.8} floatIntensity={1.6}>
      <mesh ref={ref} position={[-2.8, -0.4, -1]} scale={0.55}>
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial
          color="#5eead4"
          emissive="#0d9488"
          emissiveIntensity={0.35}
          metalness={0.9}
          roughness={0.25}
          wireframe
        />
      </mesh>
    </Float>
  );
};

const SpinningRing = () => {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((s) => {
    if (!ref.current) return;
    ref.current.rotation.x = s.clock.elapsedTime * 0.3;
    ref.current.rotation.y = s.clock.elapsedTime * 0.4;
  });
  return (
    <mesh ref={ref} position={[2.4, 0.2, -0.5]} scale={1.6}>
      <torusGeometry args={[1, 0.012, 16, 120]} />
      <meshStandardMaterial color="#38bdf8" emissive="#38bdf8" emissiveIntensity={1.2} />
    </mesh>
  );
};

const Particles = ({ count = 120 }: { count?: number }) => {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 12;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 7;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 6 - 1;
    }
    return arr;
  }, [count]);

  useFrame((s) => {
    if (!ref.current) return;
    ref.current.rotation.y = s.clock.elapsedTime * 0.04;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        color="#7dd3fc"
        transparent
        opacity={0.7}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
};

const Orb = ({ position, color, scale }: { position: [number, number, number]; color: string; scale: number }) => (
  <Float speed={2} rotationIntensity={0.6} floatIntensity={2}>
    <Sphere args={[scale, 32, 32]} position={position}>
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.7} roughness={0.3} />
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
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1.4} color="#7dd3fc" />
        <pointLight position={[-5, -3, -2]} intensity={1.8} color="#22d3ee" />
        <pointLight position={[3, -2, 2]} intensity={1.2} color="#5eead4" />
        <Particles count={140} />
        <Knot />
        <SpinningRing />
        <FloatingIco />
        <Orb position={[2.4, 1.6, -1]} color="#5eead4" scale={0.18} />
        <Orb position={[-2.6, -1.2, -0.5]} color="#38bdf8" scale={0.14} />
        <Orb position={[2, -1.8, 0]} color="#22d3ee" scale={0.1} />
        <Orb position={[-1.4, 1.8, -0.8]} color="#7dd3fc" scale={0.12} />
      </Suspense>
    </Canvas>
  );
};

export default HeroScene;
