import { Suspense, useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

const Shape = ({ position, geo }: { position: [number, number, number]; geo: "ico" | "torus" | "octa" }) => {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((s) => {
    if (!ref.current) return;
    ref.current.rotation.x = s.clock.elapsedTime * 0.1;
    ref.current.rotation.y = s.clock.elapsedTime * 0.15;
  });
  return (
    <Float speed={1} rotationIntensity={0.4} floatIntensity={1}>
      <mesh ref={ref} position={position} scale={0.8}>
        {geo === "ico" && <icosahedronGeometry args={[1, 0]} />}
        {geo === "torus" && <torusGeometry args={[0.8, 0.25, 16, 80]} />}
        {geo === "octa" && <octahedronGeometry args={[1, 0]} />}
        <meshStandardMaterial
          color="#22d3ee"
          emissive="#0e7490"
          emissiveIntensity={0.3}
          metalness={0.85}
          roughness={0.35}
          wireframe
        />
      </mesh>
    </Float>
  );
};

const Particles = ({ count = 80 }: { count?: number }) => {
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 14;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 8;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 4 - 1;
    }
    return arr;
  }, [count]);
  const ref = useRef<THREE.Points>(null);
  useFrame((s) => {
    if (ref.current) ref.current.rotation.y = s.clock.elapsedTime * 0.03;
  });
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.03} color="#7dd3fc" transparent opacity={0.5} sizeAttenuation depthWrite={false} />
    </points>
  );
};

const AmbientScene = () => (
  <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0, 6], fov: 45 }} gl={{ antialias: true, alpha: true }}>
    <Suspense fallback={null}>
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} intensity={1} color="#7dd3fc" />
      <pointLight position={[-4, -2, 2]} intensity={1.2} color="#22d3ee" />
      <Particles count={100} />
      <Shape position={[-3.5, 1.2, -1]} geo="ico" />
      <Shape position={[3.6, -0.8, -1.5]} geo="torus" />
      <Shape position={[0, -1.8, -2]} geo="octa" />
    </Suspense>
  </Canvas>
);

export default AmbientScene;
