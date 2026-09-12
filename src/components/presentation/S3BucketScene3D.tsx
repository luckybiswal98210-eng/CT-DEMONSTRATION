import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Stars } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

function RotatingGoldBucket() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const t = clock.getElapsedTime();
    groupRef.current.rotation.y = t * 0.35;
  });

  return (
    <group ref={groupRef} position={[0, -0.65, 0]} rotation={[0.22, 0, 0]}>
      {/* Tapered Amber/Bronze Cylinder Body */}
      <mesh>
        <cylinderGeometry args={[1.38, 1.05, 1.65, 54, 1, true]} />
        <meshStandardMaterial
          color="#131D33"
          emissive="#FF9900"
          emissiveIntensity={0.28}
          transparent
          opacity={0.65}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Radiant Glowing Golden Yellow Rim */}
      <mesh position={[0, 0.825, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.38, 0.07, 20, 80]} />
        <meshStandardMaterial
          color="#FFD700"
          emissive="#FFB800"
          emissiveIntensity={3.2}
          toneMapped={false}
        />
      </mesh>

      {/* Base of the Bucket */}
      <mesh position={[0, -0.825, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[1.05, 48]} />
        <meshStandardMaterial
          color="#FF9900"
          emissive="#FF9900"
          emissiveIntensity={0.5}
          transparent
          opacity={0.6}
        />
      </mesh>
    </group>
  );
}

function FloatingWireframeNode({
  position,
  scale,
  color = "#00F0FF",
}: {
  position: [number, number, number];
  scale: number;
  color?: string;
}) {
  return (
    <Float speed={1.8} rotationIntensity={0.9} floatIntensity={1.2}>
      <group position={position} scale={scale}>
        <mesh>
          <icosahedronGeometry args={[0.5, 1]} />
          <meshStandardMaterial
            color="#080F1D"
            emissive={color}
            emissiveIntensity={0.85}
            wireframe
          />
        </mesh>
        <mesh scale={0.35}>
          <sphereGeometry args={[0.3, 16, 16]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={2.0}
            transparent
            opacity={0.65}
          />
        </mesh>
      </group>
    </Float>
  );
}

export function S3BucketScene3D() {
  return (
    <div className="absolute inset-0 select-none">
      <Canvas
        camera={{ position: [0, 0.9, 4.8], fov: 42 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        className="!absolute inset-0 pointer-events-none"
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[3, 4, 3]} intensity={45} color="#FF9900" />
        <pointLight position={[-4, 2, -2]} intensity={25} color="#00F0FF" />
        <Stars radius={35} depth={20} count={600} factor={2.5} saturation={0} fade speed={0.4} />

        <RotatingGoldBucket />

        {/* Ambient floating wireframe nodes */}
        <FloatingWireframeNode position={[-1.9, 1.3, -0.6]} scale={0.65} color="#00F0FF" />
        <FloatingWireframeNode position={[1.8, 1.6, -0.8]} scale={0.55} color="#FF9900" />
        <FloatingWireframeNode position={[1.9, -1.2, -0.5]} scale={0.7} color="#00F0FF" />
        <FloatingWireframeNode position={[-1.7, -1.3, -0.7]} scale={0.5} color="#FF9900" />
      </Canvas>
    </div>
  );
}
