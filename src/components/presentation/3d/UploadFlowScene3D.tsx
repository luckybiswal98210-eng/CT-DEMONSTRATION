import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Float, Html, Stars } from "@react-three/drei";
import { useMemo, useRef, useState, useEffect } from "react";
import * as THREE from "three";
import { Play, RotateCcw, CheckCircle2, ShieldAlert, Sparkles, Laptop, KeyRound, Database, FileText } from "lucide-react";

// 3D Procedural Futuristic Laptop Model
function LaptopModel({ onClick, isSelected }: { onClick: () => void; isSelected: boolean }) {
  return (
    <group position={[-2.4, -0.4, 0]} rotation={[0.15, 0.45, 0]} onClick={onClick}>
      {/* Laptop Base */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[1.4, 0.06, 1.0]} />
        <meshStandardMaterial color="#0E1726" metalness={0.9} roughness={0.2} />
      </mesh>
      {/* Keyboard Bed */}
      <mesh position={[0, 0.035, 0.08]}>
        <boxGeometry args={[1.2, 0.02, 0.6]} />
        <meshStandardMaterial color="#050914" roughness={0.4} emissive="#00F0FF" emissiveIntensity={0.15} />
      </mesh>
      {/* Trackpad */}
      <mesh position={[0, 0.035, 0.38]}>
        <boxGeometry args={[0.38, 0.01, 0.24]} />
        <meshStandardMaterial color="#1E293B" metalness={0.8} />
      </mesh>

      {/* Screen Hinge & Tilted Display */}
      <group position={[0, 0.04, -0.48]} rotation={[-0.42, 0, 0]}>
        {/* Screen Back Lid */}
        <mesh position={[0, 0.45, 0]}>
          <boxGeometry args={[1.4, 0.9, 0.04]} />
          <meshStandardMaterial
            color="#0E1726"
            metalness={0.9}
            roughness={0.2}
            emissive={isSelected ? "#00F0FF" : "#000000"}
            emissiveIntensity={isSelected ? 0.3 : 0}
          />
        </mesh>
        {/* Glowing Display Screen */}
        <mesh position={[0, 0.45, 0.025]}>
          <planeGeometry args={[1.3, 0.8]} />
          <meshStandardMaterial color="#020817" emissive="#00F0FF" emissiveIntensity={0.65} roughness={0.1} />
        </mesh>

        {/* 3D Floating Certificate File above display */}
        <Float speed={2} rotationIntensity={0.2} floatIntensity={0.4}>
          <mesh position={[0, 0.6, 0.15]} rotation={[0, 0, 0.05]}>
            <planeGeometry args={[0.6, 0.75]} />
            <meshStandardMaterial
              color="#00F0FF"
              emissive="#00F0FF"
              emissiveIntensity={1.8}
              transparent
              opacity={0.85}
              side={THREE.DoubleSide}
            />
          </mesh>
        </Float>
      </group>

      {/* Holographic Tooltip Label */}
      <Html position={[0, 1.1, 0]} center distanceFactor={4.5}>
        <div className="drei-label drei-label-cyan">
          <span className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-cyan-400 animate-ping" />
          STUDENT CLIENT
        </div>
      </Html>
    </group>
  );
}

// 3D Procedural Glowing Presigned Key Token in the Center
function PresignedKeyToken({ onClick, isSelected, activeState }: { onClick: () => void; isSelected: boolean; activeState: boolean }) {
  const ringRef = useRef<THREE.Group>(null);
  const keyRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (ringRef.current) ringRef.current.rotation.z = t * 1.2;
    if (keyRef.current) keyRef.current.rotation.y = Math.sin(t * 0.8) * 0.2;
  });

  return (
    <group position={[0, 0.35, 0]} onClick={onClick}>
      <Float speed={2.5} rotationIntensity={0.4} floatIntensity={0.6}>
        {/* Central Glowing Key / Cryptographic Token */}
        <group ref={keyRef}>
          {/* Key Ring Head */}
          <mesh position={[-0.35, 0, 0]}>
            <torusGeometry args={[0.26, 0.06, 16, 32]} />
            <meshStandardMaterial
              color="#FFD700"
              emissive="#FF9900"
              emissiveIntensity={activeState ? 4.5 : 2.0}
              metalness={0.9}
              roughness={0.1}
            />
          </mesh>
          {/* Key Shaft */}
          <mesh position={[0.15, 0, 0]} rotation={[0, 0, -Math.PI / 2]}>
            <cylinderGeometry args={[0.06, 0.06, 0.75, 16]} />
            <meshStandardMaterial
              color="#FFD700"
              emissive="#FF9900"
              emissiveIntensity={activeState ? 4.0 : 2.0}
              metalness={0.9}
            />
          </mesh>
          {/* Key Teeth */}
          <mesh position={[0.35, -0.12, 0]}>
            <boxGeometry args={[0.12, 0.16, 0.06]} />
            <meshStandardMaterial color="#FFD700" emissive="#FF9900" emissiveIntensity={activeState ? 4.0 : 2.0} />
          </mesh>
          <mesh position={[0.48, -0.09, 0]}>
            <boxGeometry args={[0.1, 0.12, 0.06]} />
            <meshStandardMaterial color="#FFD700" emissive="#FF9900" emissiveIntensity={activeState ? 4.0 : 2.0} />
          </mesh>
        </group>

        {/* Outer Rotating Holographic Encryption Orbit Ring */}
        <group ref={ringRef} rotation={[Math.PI / 3, 0, 0]}>
          <mesh>
            <torusGeometry args={[0.95, 0.025, 16, 64]} />
            <meshStandardMaterial
              color="#FF9900"
              emissive="#FF9900"
              emissiveIntensity={activeState ? 3.5 : 1.5}
              transparent
              opacity={0.8}
            />
          </mesh>
          <mesh position={[0.95, 0, 0]}>
            <sphereGeometry args={[0.06, 16, 16]} />
            <meshStandardMaterial color="#FFFFFF" emissive="#FFD700" emissiveIntensity={5} />
          </mesh>
        </group>

        {/* Floating Tooltip */}
        <Html position={[0, 0.9, 0]} center distanceFactor={4.5}>
          <div className="drei-label drei-label-amber">
            <span className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-aws animate-pulse" />
            AWS PRESIGNED URL
          </div>
        </Html>
      </Float>
    </group>
  );
}

// 3D Procedural Amazon S3 Storage Bucket Cube on the Right
function S3BucketCube({ isUploaded }: { isUploaded: boolean }) {
  const cubeRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (cubeRef.current) {
      cubeRef.current.rotation.y = t * 0.3;
    }
  });

  return (
    <group position={[2.4, 0.2, 0]} ref={cubeRef}>
      {/* Outer Metallic Vault Frame */}
      <mesh>
        <boxGeometry args={[1.7, 1.7, 1.7]} />
        <meshStandardMaterial
          color={isUploaded ? "#052e16" : "#0B1220"}
          metalness={0.92}
          roughness={0.2}
          emissive={isUploaded ? "#10B981" : "#FF9900"}
          emissiveIntensity={isUploaded ? 0.6 : 0.2}
        />
      </mesh>

      {/* Cyber Grid Wireframe */}
      <mesh>
        <boxGeometry args={[1.74, 1.74, 1.74]} />
        <meshStandardMaterial
          color={isUploaded ? "#10B981" : "#FF9900"}
          emissive={isUploaded ? "#10B981" : "#FF9900"}
          emissiveIntensity={isUploaded ? 2.5 : 1.2}
          wireframe
        />
      </mesh>

      {/* Glowing Top Ingestion Portal where certificate enters */}
      <mesh position={[0, 0.88, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.55, 0.05, 16, 48]} />
        <meshStandardMaterial
          color={isUploaded ? "#34D399" : "#FFD700"}
          emissive={isUploaded ? "#10B981" : "#FF9900"}
          emissiveIntensity={isUploaded ? 4.5 : 3.0}
        />
      </mesh>

      {/* Holographic Tooltip */}
      <Html position={[0, 1.35, 0]} center distanceFactor={4.5}>
        <div className="drei-label drei-label-emerald">
          <span className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
          AMAZON S3 STORAGE
        </div>
      </Html>
    </group>
  );
}

// True 3D Animated Flowing Data Packets moving along 3D CatmullRomCurve3
function AnimatedDataFlowCurves({ isPlaying, stage }: { isPlaying: boolean; stage: number }) {
  // 3D Path 1: Laptop to Presigned Token
  const curve1 = useMemo(() => {
    return new THREE.CatmullRomCurve3([
      new THREE.Vector3(-2.2, -0.1, 0),
      new THREE.Vector3(-1.4, 0.6, 0.3),
      new THREE.Vector3(-0.6, 0.45, 0.1),
      new THREE.Vector3(0, 0.35, 0),
    ]);
  }, []);

  // 3D Path 2: Presigned Token to Amazon S3 Bucket
  const curve2 = useMemo(() => {
    return new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, 0.35, 0),
      new THREE.Vector3(0.8, 0.8, -0.2),
      new THREE.Vector3(1.6, 0.95, 0.1),
      new THREE.Vector3(2.4, 0.88, 0),
    ]);
  }, []);

  // Packet meshes references
  const packet1Refs = useRef<THREE.Mesh[]>([]);
  const packet2Refs = useRef<THREE.Mesh[]>([]);

  const offsets = [0.0, 0.2, 0.4, 0.6, 0.8];

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const speed = isPlaying ? 1.2 : 0.6;

    // Move packets along Curve 1
    packet1Refs.current.forEach((mesh, i) => {
      if (!mesh) return;
      const progress = ((t * speed + offsets[i]) % 1);
      const point = curve1.getPointAt(progress);
      mesh.position.copy(point);
    });

    // Move packets along Curve 2
    packet2Refs.current.forEach((mesh, i) => {
      if (!mesh) return;
      const progress = ((t * speed + offsets[i]) % 1);
      const point = curve2.getPointAt(progress);
      mesh.position.copy(point);
    });
  });

  return (
    <group>
      {/* 3D Glowing Electrical Cables (Tube Geometries) */}
      <mesh>
        <tubeGeometry args={[curve1, 64, 0.025, 8, false]} />
        <meshStandardMaterial
          color="#00F0FF"
          emissive="#00F0FF"
          emissiveIntensity={2.5}
          transparent
          opacity={0.65}
        />
      </mesh>

      <mesh>
        <tubeGeometry args={[curve2, 64, 0.025, 8, false]} />
        <meshStandardMaterial
          color={stage >= 3 ? "#10B981" : "#FF9900"}
          emissive={stage >= 3 ? "#10B981" : "#FF9900"}
          emissiveIntensity={3.0}
          transparent
          opacity={0.7}
        />
      </mesh>

      {/* Animated Traveling Data Packets along Path 1 (Cyan) */}
      {offsets.map((_, i) => (
        <mesh
          key={`p1-${i}`}
          ref={(el) => {
            if (el) packet1Refs.current[i] = el;
          }}
        >
          <sphereGeometry args={[0.07, 16, 16]} />
          <meshStandardMaterial
            color="#FFFFFF"
            emissive="#00F0FF"
            emissiveIntensity={5.0}
            toneMapped={false}
          />
        </mesh>
      ))}

      {/* Animated Traveling Data Packets along Path 2 (Amber or Emerald) */}
      {offsets.map((_, i) => (
        <mesh
          key={`p2-${i}`}
          ref={(el) => {
            if (el) packet2Refs.current[i] = el;
          }}
        >
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshStandardMaterial
            color="#FFFFFF"
            emissive={stage >= 3 ? "#34D399" : "#FF9900"}
            emissiveIntensity={5.5}
            toneMapped={false}
          />
        </mesh>
      ))}
    </group>
  );
}

export function UploadFlowScene3D() {
  const [stage, setStage] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  // 10-Second Upload Animation Sequencer
  useEffect(() => {
    if (!isPlaying) return;
    const t1 = setTimeout(() => setStage(1), 1500); // 1.5s: Backend Auth
    const t2 = setTimeout(() => setStage(2), 3500); // 3.5s: Presigned URL active
    const t3 = setTimeout(() => setStage(3), 6000); // 6.0s: Data packets streaming
    const t4 = setTimeout(() => {
      setStage(4);
      setIsPlaying(false);
    }, 9500); // 9.5s: Upload Successful

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [isPlaying]);

  const handlePlay = () => {
    setStage(0);
    setIsPlaying(true);
  };

  const getStageDescription = () => {
    switch (stage) {
      case 0:
        return "Step 1: Student selects Student_Certificate.pdf on laptop";
      case 1:
        return "Step 2: Backend validates credentials & permissions";
      case 2:
        return "Step 3: Presigned PUT URL generated (AWS SigV4 Token)";
      case 3:
        return "Step 4: Direct browser-to-S3 upload stream active (~850ms)";
      case 4:
        return "Step 5: UPLOAD SUCCESSFUL ✓ (Encrypted at rest in S3)";
      default:
        return "Continuous live presigned URL upload pipeline";
    }
  };

  return (
    <div 
      className="relative w-full rounded-3xl border border-aws/35 card-opaque p-2 shadow-[0_0_90px_rgba(255,153,0,0.25)] overflow-hidden select-none"
      style={{ width: "100%", height: "560px", minHeight: "520px" }}
    >
      {/* 3D Real-time WebGL Canvas */}
      <Canvas
        camera={{ position: [0, 1.2, 5.2], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
        className="cursor-grab active:cursor-grabbing"
      >
        <ambientLight intensity={0.45} />
        <pointLight position={[-3, 4, 3]} intensity={35} color="#00F0FF" />
        <pointLight position={[3, 4, 3]} intensity={45} color="#FF9900" />
        <pointLight position={[0, -2, 2]} intensity={25} color="#10B981" />
        <Stars radius={30} depth={20} count={600} factor={2} saturation={0} fade speed={0.4} />

        {/* 1. Left Student Laptop */}
        <LaptopModel onClick={() => setSelectedItem("laptop")} isSelected={selectedItem === "laptop"} />

        {/* 2. Center Presigned URL Key Token */}
        <PresignedKeyToken
          onClick={() => setSelectedItem("key")}
          isSelected={selectedItem === "key"}
          activeState={stage >= 2}
        />

        {/* 3. Right S3 Storage Cube */}
        <S3BucketCube isUploaded={stage === 4} />

        {/* 4. Real 3D Animated Traveling Data Packets along 3D Curves */}
        <AnimatedDataFlowCurves isPlaying={isPlaying} stage={stage} />

        {/* Subtle OrbitControls */}
        <OrbitControls
          enableZoom={true}
          minDistance={3.5}
          maxDistance={7.5}
          enablePan={false}
          maxPolarAngle={Math.PI / 2 + 0.2}
          minPolarAngle={Math.PI / 3 - 0.2}
          dampingFactor={0.06}
        />
      </Canvas>

      {/* Top Status HUD */}
      <div className="hud-top">
        <div className="hud-badge hud-badge-cyan">
          <span className="h-2 w-2 rounded-full bg-cyan-400 animate-ping" />
          <span>{getStageDescription()}</span>
        </div>
      </div>

      {/* Bottom Interactive Play / Restart Controls */}
      <div className="hud-bottom">
        <button
          onClick={handlePlay}
          disabled={isPlaying}
          className="flex items-center gap-2 rounded-full bg-aws px-5 py-2 font-heading text-xs font-semibold text-ink shadow-[0_0_20px_rgba(255,153,0,0.5)] hover:scale-105 active:scale-95 transition-all disabled:opacity-60"
        >
          {isPlaying ? <RotateCcw className="h-3.5 w-3.5 animate-spin" /> : <Play className="h-3.5 w-3.5" />}
          <span>{isPlaying ? "UPLOADING TO S3…" : "▶ PLAY UPLOAD SIMULATION"}</span>
        </button>

        <div className="flex items-center gap-2 rounded-full border border-white/10 card-opaque px-3 py-1 font-mono text-[10px] text-slate-400">
          <span>Click objects to inspect</span>
          <span>·</span>
          <span>Drag to rotate</span>
        </div>
      </div>
    </div>
  );
}
