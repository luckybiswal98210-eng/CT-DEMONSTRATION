import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stars, Float, Html } from "@react-three/drei";
import { useRef, useState, useMemo } from "react";
import * as THREE from "three";
import { RotateCcw, Play, Pause, Sparkles, Box, ShieldCheck, Database, Lock } from "lucide-react";

// Procedural 3D S3 Core Vault Mesh with Multi-Layer Geometry
function VaultCoreModel() {
  const outerCubeRef = useRef<THREE.Group>(null);
  const innerCoreRef = useRef<THREE.Mesh>(null);
  const ring1Ref = useRef<THREE.Group>(null);
  const ring2Ref = useRef<THREE.Group>(null);
  const ring3Ref = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    // Subtle gentle float and independent sub-component rotations
    if (innerCoreRef.current) {
      innerCoreRef.current.rotation.y = -t * 0.8;
      innerCoreRef.current.rotation.x = Math.sin(t * 0.5) * 0.2;
      const s = 1 + Math.sin(t * 2.5) * 0.04;
      innerCoreRef.current.scale.set(s, s, s);
    }

    if (ring1Ref.current) {
      ring1Ref.current.rotation.z = t * 0.7;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.z = -t * 0.5;
      ring2Ref.current.rotation.x = Math.PI / 4 + Math.sin(t * 0.6) * 0.15;
    }
    if (ring3Ref.current) {
      ring3Ref.current.rotation.y = t * 0.9;
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* 1. OUTER METALLIC FRAME: Beveled Vault Cage with Heat Sinks & Brackets */}
      <group ref={outerCubeRef}>
        {/* Main Vault Housing */}
        <mesh castShadow receiveShadow>
          <boxGeometry args={[2.2, 2.2, 2.2]} />
          <meshStandardMaterial
            color="#0B1220"
            metalness={0.92}
            roughness={0.2}
            envMapIntensity={1.5}
          />
        </mesh>

        {/* Outer Edge Corner Brackets (Titanium / Graphite) */}
        {[-1.12, 1.12].map((x, i) =>
          [-1.12, 1.12].map((y, j) =>
            [-1.12, 1.12].map((z, k) => (
              <mesh key={`${i}-${j}-${k}`} position={[x, y, z]}>
                <boxGeometry args={[0.3, 0.3, 0.3]} />
                <meshStandardMaterial
                  color="#1E293B"
                  metalness={0.95}
                  roughness={0.15}
                  emissive="#FF9900"
                  emissiveIntensity={0.2}
                />
              </mesh>
            ))
          )
        )}

        {/* Outer Glowing Circuit Wireframe Traces */}
        <mesh>
          <boxGeometry args={[2.24, 2.24, 2.24]} />
          <meshStandardMaterial
            color="#080F1D"
            emissive="#00F0FF"
            emissiveIntensity={0.8}
            wireframe
            transparent
            opacity={0.35}
          />
        </mesh>

        {/* 2. TRANSPARENT GLASS SIDES: Glowing Viewing Ports into Inner Storage Chamber */}
        <mesh>
          <boxGeometry args={[2.08, 2.08, 2.08]} />
          <meshPhysicalMaterial
            color="#00F0FF"
            transparent
            opacity={0.28}
            roughness={0.08}
            metalness={0.15}
            transmission={0.8}
            ior={1.4}
            thickness={0.5}
          />
        </mesh>
      </group>

      {/* 3. INNER GLOWING DATA STORAGE CHAMBER: Pulsing Crystalline Plasma Core */}
      <mesh ref={innerCoreRef}>
        <octahedronGeometry args={[0.85, 2]} />
        <meshStandardMaterial
          color="#FF9900"
          emissive="#FF9900"
          emissiveIntensity={3.2}
          roughness={0.2}
          metalness={0.5}
        />
      </mesh>

      {/* Inner Energy Core Halo */}
      <mesh scale={1.25}>
        <sphereGeometry args={[0.65, 32, 32]} />
        <meshStandardMaterial
          color="#00F0FF"
          emissive="#00F0FF"
          emissiveIntensity={2.5}
          transparent
          opacity={0.4}
        />
      </mesh>

      {/* 4. CIRCULAR NEON CYBER RINGS (Equatorial & Orbital Rings) */}
      {/* Ring 1: Primary Amber High-Intensity Outer Ring */}
      <group ref={ring1Ref} rotation={[Math.PI / 3, Math.PI / 6, 0]}>
        <mesh>
          <torusGeometry args={[1.75, 0.045, 16, 100]} />
          <meshStandardMaterial
            color="#FFD700"
            emissive="#FF9900"
            emissiveIntensity={4.2}
            toneMapped={false}
          />
        </mesh>
        {/* Orbital Satellite Node */}
        <mesh position={[1.75, 0, 0]}>
          <boxGeometry args={[0.15, 0.15, 0.15]} />
          <meshStandardMaterial
            color="#FFFFFF"
            emissive="#FFD700"
            emissiveIntensity={5.0}
            toneMapped={false}
          />
        </mesh>
      </group>

      {/* Ring 2: Secondary Cyan Counter-Rotating Ring */}
      <group ref={ring2Ref} rotation={[-Math.PI / 4, 0, 0]}>
        <mesh>
          <torusGeometry args={[1.5, 0.035, 16, 100]} />
          <meshStandardMaterial
            color="#00F0FF"
            emissive="#00F0FF"
            emissiveIntensity={3.8}
            toneMapped={false}
          />
        </mesh>
        <mesh position={[-1.5, 0, 0]}>
          <sphereGeometry args={[0.09, 16, 16]} />
          <meshStandardMaterial
            color="#FFFFFF"
            emissive="#00F0FF"
            emissiveIntensity={4.0}
          />
        </mesh>
      </group>

      {/* Ring 3: Vertical Axis Cyber Ring */}
      <group ref={ring3Ref} rotation={[0, 0, Math.PI / 2]}>
        <mesh>
          <torusGeometry args={[1.9, 0.025, 16, 100]} />
          <meshStandardMaterial
            color="#00F0FF"
            emissive="#00F0FF"
            emissiveIntensity={2.5}
            transparent
            opacity={0.7}
          />
        </mesh>
      </group>

      {/* 5. 3D FLOATING AMAZON S3 STORAGE LOGO EMBLEM ON TOP CAP */}
      <group position={[0, 1.45, 0]} rotation={[0, 0, 0]}>
        <Float speed={2} rotationIntensity={0.4} floatIntensity={0.6}>
          {/* Glowing S3 Cylinder / Bucket Platform */}
          <mesh>
            <cylinderGeometry args={[0.55, 0.45, 0.35, 32]} />
            <meshStandardMaterial
              color="#FF9900"
              emissive="#FF9900"
              emissiveIntensity={2.4}
              metalness={0.8}
              roughness={0.2}
            />
          </mesh>
          <mesh position={[0, 0.2, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.55, 0.04, 16, 48]} />
            <meshStandardMaterial
              color="#FFD700"
              emissive="#FFD700"
              emissiveIntensity={3.5}
            />
          </mesh>
        </Float>
      </group>

      {/* 6. HOLOGRAPHIC TECHNICAL DATA PANELS (3D Floating Labels) */}
      <Html position={[-1.6, 1.3, 0.8]} center distanceFactor={4.5}>
        <div className="drei-label drei-label-cyan">
          <span className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-cyan-400 animate-ping" />
          S3 CORE VAULT: ONLINE
        </div>
      </Html>

      <Html position={[1.6, -1.2, -0.6]} center distanceFactor={4.5}>
        <div className="drei-label drei-label-amber">
          <span className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-aws animate-pulse" />
          11 9s DURABILITY · SSE-KMS
        </div>
      </Html>

      <Html position={[0, -1.6, 1.2]} center distanceFactor={4.5}>
        <div className="drei-label drei-label-emerald">
          OBJECT STORAGE · UNLIMITED SCALING
        </div>
      </Html>
    </group>
  );
}

// Surrounding Ambient Geodesic Spheres
function AmbientGeodesicNodes() {
  const nodes = useMemo(
    () => [
      { pos: [-3.2, 1.6, -1.5] as [number, number, number], scale: 0.65, color: "#00F0FF" },
      { pos: [3.2, 1.8, -1.2] as [number, number, number], scale: 0.55, color: "#FF9900" },
      { pos: [-2.8, -1.8, -0.8] as [number, number, number], scale: 0.7, color: "#00F0FF" },
      { pos: [3.0, -1.6, -1.0] as [number, number, number], scale: 0.6, color: "#FF9900" },
      { pos: [0, 2.8, -2.0] as [number, number, number], scale: 0.45, color: "#00F0FF" },
    ],
    []
  );

  return (
    <group>
      {nodes.map((n, i) => (
        <Float key={i} speed={1.5 + i * 0.3} rotationIntensity={0.8} floatIntensity={1.2}>
          <group position={n.pos} scale={n.scale}>
            <mesh>
              <icosahedronGeometry args={[0.5, 1]} />
              <meshStandardMaterial
                color="#080F1D"
                emissive={n.color}
                emissiveIntensity={0.8}
                wireframe
              />
            </mesh>
            <mesh scale={0.35}>
              <sphereGeometry args={[0.3, 16, 16]} />
              <meshStandardMaterial
                color={n.color}
                emissive={n.color}
                emissiveIntensity={2.0}
                transparent
                opacity={0.65}
              />
            </mesh>
          </group>
        </Float>
      ))}
    </group>
  );
}

export function S3CoreVault3D() {
  const controlsRef = useRef<any>(null);
  const [autoRotate, setAutoRotate] = useState(true);

  const handleResetCamera = () => {
    if (controlsRef.current) {
      controlsRef.current.reset();
    }
  };

  return (
    <div className="relative select-none" style={{ width: "100%", height: "100%", minHeight: "520px" }}>
      {/* Real-time WebGL Three.js Canvas */}
      <Canvas
        camera={{ position: [0, 0.8, 5.2], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
        className="cursor-grab active:cursor-grabbing"
      >
        <ambientLight intensity={0.4} />
        {/* Key Lighting for Cyber Neon Reflection */}
        <pointLight position={[4, 5, 4]} intensity={50} color="#FF9900" />
        <pointLight position={[-4, 3, -3]} intensity={35} color="#00F0FF" />
        <pointLight position={[0, -4, 2]} intensity={20} color="#FFD700" />
        <Stars radius={40} depth={25} count={800} factor={2.5} saturation={0} fade speed={0.4} />

        {/* 3D Central Vault Model */}
        <VaultCoreModel />

        {/* Surrounding Ambient Geodesic Spheres */}
        <AmbientGeodesicNodes />

        {/* Full Interactive OrbitControls with Angle Constraints */}
        <OrbitControls
          ref={controlsRef}
          enableZoom={true}
          minDistance={3.2}
          maxDistance={8.5}
          enablePan={false}
          enableRotate={true}
          autoRotate={autoRotate}
          autoRotateSpeed={1.4}
          dampingFactor={0.06}
          maxPolarAngle={Math.PI / 2 + 0.35}
          minPolarAngle={Math.PI / 3 - 0.35}
        />
      </Canvas>

      {/* Floating Interactive Controls & Status HUD */}
      <div className="hud-bottom">
        {/* 360 Live Core Label */}
        <div className="hud-badge hud-badge-amber">
          <span className="h-2 w-2 rounded-full bg-aws animate-ping" />
          <span className="font-bold">360° LIVE CORE</span>
          <span className="text-slate-500">·</span>
          <span className="text-slate-300">Drag to Rotate</span>
          <span className="text-slate-500">·</span>
          <span className="text-slate-400">Scroll to Zoom</span>
        </div>

        {/* Interactive Buttons */}
        <div className="pointer-events-auto flex items-center gap-2">
          <button
            onClick={() => setAutoRotate(!autoRotate)}
            title={autoRotate ? "Pause Auto-Rotate" : "Resume Auto-Rotate"}
            className="flex h-8 items-center gap-1.5 rounded-full border border-white/15 card-opaque px-3 font-mono text-[10px] text-slate-300 hover:border-aws/50 hover:text-aws transition-all shadow-md"
          >
            {autoRotate ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3" />}
            <span>{autoRotate ? "Pause Spin" : "Auto Spin"}</span>
          </button>
          <button
            onClick={handleResetCamera}
            title="Reset 3D Camera"
            className="flex h-8 w-8 items-center justify-center rounded-full border border-white/15 card-opaque text-slate-300 hover:border-cyan-400/50 hover:text-cyan-300 transition-all shadow-md"
          >
            <RotateCcw className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
