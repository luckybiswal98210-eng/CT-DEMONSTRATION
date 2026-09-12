import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Stars } from "@react-three/drei";
import { useMemo, useRef, type ReactNode } from "react";
import * as THREE from "three";

const PACKET_COUNT = 12;

function Rig({ children }: { children: ReactNode }) {
  const ref = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = THREE.MathUtils.lerp(
      ref.current.rotation.y,
      state.pointer.x * 0.4,
      0.04,
    );
    ref.current.rotation.x = THREE.MathUtils.lerp(
      ref.current.rotation.x,
      -state.pointer.y * 0.18,
      0.04,
    );
  });
  return <group ref={ref}>{children}</group>;
}

function Bucket() {
  return (
    <group position={[0, -0.9, 0]}>
      <mesh>
        <cylinderGeometry args={[1.2, 1.0, 1.6, 48, 1, true]} />
        <meshStandardMaterial
          color="#131D33"
          emissive="#FF9900"
          emissiveIntensity={0.14}
          transparent
          opacity={0.6}
          side={THREE.DoubleSide}
        />
      </mesh>
      <mesh position={[0, 0.8, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.2, 0.05, 16, 80]} />
        <meshStandardMaterial color="#FF9900" emissive="#FF9900" emissiveIntensity={2.4} toneMapped={false} />
      </mesh>
      <mesh position={[0, -0.8, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[1.0, 48]} />
        <meshStandardMaterial color="#FF9900" emissive="#FF9900" emissiveIntensity={0.4} transparent opacity={0.55} />
      </mesh>
    </group>
  );
}

function CloudNode({
  position,
  scale,
  color = "#00F0FF",
  speed = 1.6,
}: {
  position: [number, number, number];
  scale: number;
  color?: string;
  speed?: number;
}) {
  return (
    <Float speed={speed} rotationIntensity={0.8} floatIntensity={1.4}>
      <group position={position} scale={scale}>
        {/* Wireframe Geodesic Sphere */}
        <mesh>
          <icosahedronGeometry args={[0.5, 1]} />
          <meshStandardMaterial
            color="#080F1D"
            emissive={color}
            emissiveIntensity={0.85}
            wireframe
          />
        </mesh>
        {/* Inner Glowing Core */}
        <mesh scale={0.35}>
          <sphereGeometry args={[0.3, 16, 16]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={2.2}
            transparent
            opacity={0.65}
          />
        </mesh>
      </group>
    </Float>
  );
}

export function HeroScene3D() {
  return (
    <Canvas
      camera={{ position: [0, 1.1, 6.4], fov: 42 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true }}
      className="!absolute inset-0 pointer-events-none"
    >
      <ambientLight intensity={0.4} />
      <pointLight position={[4, 4, 4]} intensity={42} color="#FF9900" />
      <pointLight position={[-5, 2, -2]} intensity={28} color="#00F0FF" />
      <Stars radius={42} depth={30} count={1100} factor={3} saturation={0} fade speed={0.5} />
      <Rig>
        {/* Floating Wireframe Balls across the scene */}
        <CloudNode position={[-2.5, 0.9, -0.6]} scale={1.05} color="#00F0FF" speed={1.4} />
        <CloudNode position={[-1.8, 2.3, -1.5]} scale={0.55} color="#FF9900" speed={2.0} />
        <CloudNode position={[-3.2, -1.0, -1.0]} scale={0.75} color="#00F0FF" speed={1.3} />
        <CloudNode position={[-0.8, 2.7, -1.8]} scale={0.45} color="#00F0FF" speed={1.8} />

        <CloudNode position={[2.6, 1.5, -1.2]} scale={0.8} color="#00F0FF" speed={1.5} />
        <CloudNode position={[2.1, 2.6, -1.6]} scale={0.5} color="#FF9900" speed={2.1} />
        <CloudNode position={[3.2, 0.2, -0.8]} scale={0.65} color="#00F0FF" speed={1.7} />
        <CloudNode position={[2.2, -1.3, 0.4]} scale={0.55} color="#FF9900" speed={1.9} />
        <CloudNode position={[3.0, -1.8, -1.2]} scale={0.85} color="#00F0FF" speed={1.2} />
        <CloudNode position={[1.4, -1.9, -0.6]} scale={0.45} color="#00F0FF" speed={2.2} />
      </Rig>
    </Canvas>
  );
}
