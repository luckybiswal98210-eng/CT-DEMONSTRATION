import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Float, Html, Stars } from "@react-three/drei";
import { useMemo, useRef, useState, useEffect } from "react";
import * as THREE from "three";
import { Play, RotateCcw, Activity, Server, Radio, Cpu, Network, CheckCircle2 } from "lucide-react";

// 3D Procedural Workstation / Client Device at Bottom-Left
function ClientWorkstation() {
  return (
    <group position={[-2.8, -1.0, 0.4]} rotation={[0.2, 0.5, 0]}>
      {/* Desk Base */}
      <mesh position={[0, -0.4, 0]}>
        <boxGeometry args={[1.5, 0.1, 0.9]} />
        <meshStandardMaterial color="#0B132B" metalness={0.9} roughness={0.2} />
      </mesh>
      {/* Terminal Screen Stand */}
      <mesh position={[0, -0.15, -0.2]}>
        <cylinderGeometry args={[0.04, 0.04, 0.4, 16]} />
        <meshStandardMaterial color="#1E293B" metalness={0.8} />
      </mesh>
      {/* Dual Curved Displays */}
      <mesh position={[0, 0.2, -0.2]} rotation={[0, 0, 0]}>
        <boxGeometry args={[1.2, 0.6, 0.05]} />
        <meshStandardMaterial color="#020617" emissive="#00F0FF" emissiveIntensity={0.6} />
      </mesh>

      {/* Holographic Tooltip */}
      <Html position={[0, 0.8, 0]} center distanceFactor={4.5}>
        <div className="drei-label drei-label-cyan">
          <span className="mr-1 inline-block h-1.5 w-1.5 rounded-full bg-cyan-400 animate-ping" />
          STUDENT CLIENT
        </div>
      </Html>
    </group>
  );
}

// 3D Network Node (Core Router or Edge Gateway)
function NetworkNodeMesh({
  position,
  label,
  color,
  subLabel,
}: {
  position: [number, number, number];
  label: string;
  color: string;
  subLabel: string;
}) {
  const nodeRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (!nodeRef.current) return;
    const t = clock.getElapsedTime();
    nodeRef.current.rotation.y = t * 0.4;
  });

  return (
    <group position={position}>
      <group ref={nodeRef}>
        {/* Node Chassis */}
        <mesh>
          <cylinderGeometry args={[0.42, 0.48, 0.28, 6]} />
          <meshStandardMaterial color="#0F172A" metalness={0.9} roughness={0.15} emissive={color} emissiveIntensity={0.2} />
        </mesh>
        {/* Glowing Rim */}
        <mesh position={[0, 0.15, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.42, 0.035, 16, 32]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={3.5} />
        </mesh>
        {/* Antenna Post */}
        <mesh position={[0, 0.35, 0]}>
          <cylinderGeometry args={[0.02, 0.02, 0.4, 8]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={2.0} />
        </mesh>
      </group>

      <Html position={[0, 0.75, 0]} center distanceFactor={4.5}>
        <div className="drei-label" style={{ border: `1px solid ${color}`, background: "rgba(7,12,24,0.92)", color: "#fff" }}>
          <span className="mr-1 inline-block h-1.5 w-1.5 rounded-full" style={{ backgroundColor: color }} />
          <span className="font-bold">{label}</span>
          <span className="ml-1 text-slate-400">({subLabel})</span>
        </div>
      </Html>
    </group>
  );
}

// 3D Latency Check Node with Floating Holographic MS Metric
function LatencyNode({
  position,
  num,
  ms,
  isPulsing,
}: {
  position: [number, number, number];
  num: number;
  ms: string;
  isPulsing: boolean;
}) {
  return (
    <group position={position}>
      <Float speed={2} rotationIntensity={0.2} floatIntensity={0.4}>
        {/* Hexagonal Platform */}
        <mesh>
          <cylinderGeometry args={[0.32, 0.36, 0.16, 6]} />
          <meshStandardMaterial
            color="#0F172A"
            metalness={0.85}
            roughness={0.2}
            emissive={isPulsing ? "#FFD700" : "#FF9900"}
            emissiveIntensity={isPulsing ? 3.0 : 1.2}
          />
        </mesh>

        {/* Holographic Latency Readout Banner */}
        <Html position={[0, 0.65, 0]} center distanceFactor={4.5}>
          <div className={`drei-label transition-all duration-300 ${
            isPulsing ? "drei-label-amber scale-110" : "drei-label-cyan"
          }`}>
            <span className="font-bold">NODE {num}</span>
            <span className="ml-1 text-slate-400">·</span>
            <span className="ml-1 font-bold">{ms}</span>
          </div>
        </Html>
      </Float>
    </group>
  );
}

// 3D Mega Amazon S3 Storage Cube Server on Right
function S3StorageMegaServer({ percent }: { percent: number }) {
  const cubeRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (!cubeRef.current) return;
    const t = clock.getElapsedTime();
    cubeRef.current.rotation.y = t * 0.25;
  });

  return (
    <group position={[2.6, 0.3, -0.2]}>
      <group ref={cubeRef}>
        {/* Main Server Block */}
        <mesh>
          <boxGeometry args={[1.9, 2.2, 1.9]} />
          <meshStandardMaterial color="#0B1329" metalness={0.95} roughness={0.15} emissive="#00F0FF" emissiveIntensity={0.2} />
        </mesh>
        {/* Glowing Server Drive Bays / Ribs */}
        {[-0.6, -0.2, 0.2, 0.6].map((y, i) => (
          <mesh key={i} position={[0, y, 0.96]}>
            <boxGeometry args={[1.5, 0.18, 0.05]} />
            <meshStandardMaterial color="#050B14" emissive="#00F0FF" emissiveIntensity={1.8} />
          </mesh>
        ))}
        {/* Glowing Wireframe Perimeter */}
        <mesh>
          <boxGeometry args={[1.95, 2.25, 1.95]} />
          <meshStandardMaterial color="#00F0FF" emissive="#00F0FF" emissiveIntensity={1.5} wireframe />
        </mesh>
      </group>

      {/* Syncing Percentage HUD */}
      <Html position={[0, 1.6, 0]} center distanceFactor={4.5}>
        <div className="drei-label drei-label-cyan text-center">
          <div className="flex items-center justify-center gap-1.5 font-bold">
            <span className="inline-block h-2 w-2 rounded-full bg-cyan-400 animate-ping" />
            <span>AMAZON S3 STORAGE</span>
          </div>
          <div className="mt-0.5 text-amber-300 font-bold">
            {percent >= 100 ? "STORED IN S3 ✓ (100%)" : `SYNCING IN PROGRESS... ${percent}%`}
          </div>
        </div>
      </Html>
    </group>
  );
}

// Bidirectional Flowing Particle Streams along 3D CatmullRom Curves
function MultiPathNetworkFlow({ isPlaying }: { isPlaying: boolean }) {
  // Path 1: Client -> Edge Gateway -> Core Router -> S3
  const requestPath1 = useMemo(() => {
    return new THREE.CatmullRomCurve3([
      new THREE.Vector3(-2.6, -0.8, 0.4),
      new THREE.Vector3(-1.8, -0.4, 0.6),
      new THREE.Vector3(-0.6, -0.2, 0.8), // Edge Gateway
      new THREE.Vector3(0.5, 0.1, 0.5),   // Core Router
      new THREE.Vector3(1.6, 0.2, 0.2),
      new THREE.Vector3(2.5, 0.2, -0.1),  // S3
    ]);
  }, []);

  // Path 2: Client -> Latency Nodes 1, 2, 3 -> S3
  const requestPath2 = useMemo(() => {
    return new THREE.CatmullRomCurve3([
      new THREE.Vector3(-2.6, -0.8, 0.4),
      new THREE.Vector3(-1.5, 0.5, -0.2), // Node 1
      new THREE.Vector3(-0.5, 0.9, -0.4), // Node 2
      new THREE.Vector3(0.6, 1.2, -0.3),  // Node 3
      new THREE.Vector3(1.7, 0.8, -0.2),
      new THREE.Vector3(2.5, 0.6, -0.1),  // S3
    ]);
  }, []);

  // Response Path: S3 -> Core Router -> Client (Amber Flow)
  const responsePath = useMemo(() => {
    return new THREE.CatmullRomCurve3([
      new THREE.Vector3(2.5, 0.0, -0.1),
      new THREE.Vector3(1.4, -0.2, 0.1),
      new THREE.Vector3(0.4, -0.4, 0.3),
      new THREE.Vector3(-1.0, -0.6, 0.4),
      new THREE.Vector3(-2.6, -0.8, 0.4),
    ]);
  }, []);

  const p1Refs = useRef<THREE.Mesh[]>([]);
  const p2Refs = useRef<THREE.Mesh[]>([]);
  const pRespRefs = useRef<THREE.Mesh[]>([]);

  const offsets = [0.0, 0.16, 0.33, 0.5, 0.66, 0.83];
  const respOffsets = [0.0, 0.25, 0.5, 0.75];

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const speed = isPlaying ? 1.1 : 0.6;

    p1Refs.current.forEach((mesh, i) => {
      if (!mesh) return;
      const prog = (t * speed + offsets[i]) % 1;
      mesh.position.copy(requestPath1.getPointAt(prog));
    });

    p2Refs.current.forEach((mesh, i) => {
      if (!mesh) return;
      const prog = (t * speed + offsets[i]) % 1;
      mesh.position.copy(requestPath2.getPointAt(prog));
    });

    pRespRefs.current.forEach((mesh, i) => {
      if (!mesh) return;
      const prog = (t * speed * 0.85 + respOffsets[i]) % 1;
      mesh.position.copy(responsePath.getPointAt(prog));
    });
  });

  return (
    <group>
      {/* 3D Glowing Tubes */}
      <mesh>
        <tubeGeometry args={[requestPath1, 64, 0.02, 8, false]} />
        <meshStandardMaterial color="#00F0FF" emissive="#00F0FF" emissiveIntensity={2.2} transparent opacity={0.6} />
      </mesh>
      <mesh>
        <tubeGeometry args={[requestPath2, 64, 0.02, 8, false]} />
        <meshStandardMaterial color="#38BDF8" emissive="#38BDF8" emissiveIntensity={2.5} transparent opacity={0.65} />
      </mesh>
      <mesh>
        <tubeGeometry args={[responsePath, 64, 0.02, 8, false]} />
        <meshStandardMaterial color="#FF9900" emissive="#FF9900" emissiveIntensity={2.5} transparent opacity={0.55} />
      </mesh>

      {/* Path 1 Cyan Request Packets */}
      {offsets.map((_, i) => (
        <mesh
          key={`req1-${i}`}
          ref={(el) => {
            if (el) p1Refs.current[i] = el;
          }}
        >
          <sphereGeometry args={[0.065, 16, 16]} />
          <meshStandardMaterial color="#FFFFFF" emissive="#00F0FF" emissiveIntensity={5} toneMapped={false} />
        </mesh>
      ))}

      {/* Path 2 Sky Blue Request Packets */}
      {offsets.map((_, i) => (
        <mesh
          key={`req2-${i}`}
          ref={(el) => {
            if (el) p2Refs.current[i] = el;
          }}
        >
          <sphereGeometry args={[0.07, 16, 16]} />
          <meshStandardMaterial color="#FFFFFF" emissive="#38BDF8" emissiveIntensity={5} toneMapped={false} />
        </mesh>
      ))}

      {/* Response Amber Packets (Returning from S3 to Client) */}
      {respOffsets.map((_, i) => (
        <mesh
          key={`resp-${i}`}
          ref={(el) => {
            if (el) pRespRefs.current[i] = el;
          }}
        >
          <sphereGeometry args={[0.075, 16, 16]} />
          <meshStandardMaterial color="#FFFFFF" emissive="#FF9900" emissiveIntensity={5} toneMapped={false} />
        </mesh>
      ))}
    </group>
  );
}

export function NetworkPipelineScene3D() {
  const controlsRef = useRef<any>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [percent, setPercent] = useState(87);

  // Simulated live percentage counter
  useEffect(() => {
    if (!isPlaying) return;
    setPercent(0);
    const interval = setInterval(() => {
      setPercent((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 5;
      });
    }, 280);
    return () => clearInterval(interval);
  }, [isPlaying]);

  const handleResetCamera = () => {
    if (controlsRef.current) controlsRef.current.reset();
  };

  return (
    <div 
      className="relative w-full rounded-3xl border border-pulse/35 card-opaque p-2 shadow-[0_0_90px_rgba(0,240,255,0.25)] overflow-hidden select-none"
      style={{ width: "100%", height: "560px", minHeight: "520px" }}
    >
      {/* 3D WebGL Canvas */}
      <Canvas
        camera={{ position: [0, 1.4, 5.8], fov: 46 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
        className="cursor-grab active:cursor-grabbing"
      >
        <ambientLight intensity={0.45} />
        <pointLight position={[-4, 4, 3]} intensity={35} color="#00F0FF" />
        <pointLight position={[4, 4, 3]} intensity={45} color="#FF9900" />
        <pointLight position={[0, -3, 2]} intensity={25} color="#38BDF8" />
        <Stars radius={35} depth={20} count={700} factor={2} saturation={0} fade speed={0.4} />

        {/* 1. Client Workstation */}
        <ClientWorkstation />

        {/* 2. Routing Nodes */}
        <NetworkNodeMesh position={[-0.6, -0.2, 0.8]} label="EDGE GATEWAY" subLabel="CloudFront POP" color="#00F0FF" />
        <NetworkNodeMesh position={[0.5, 0.1, 0.5]} label="CORE ROUTER" subLabel="DirectConnect" color="#FF9900" />

        {/* 3. Three Latency Nodes */}
        <LatencyNode position={[-1.5, 0.5, -0.2]} num={1} ms="12 ms" isPulsing={percent % 20 < 10} />
        <LatencyNode position={[-0.5, 0.9, -0.4]} num={2} ms="18 ms" isPulsing={percent % 30 < 15} />
        <LatencyNode position={[0.6, 1.2, -0.3]} num={3} ms="14 ms" isPulsing={percent % 25 < 12} />

        {/* 4. Large S3 Storage Cube Server */}
        <S3StorageMegaServer percent={percent} />

        {/* 5. Dual Bidirectional Flow Streams */}
        <MultiPathNetworkFlow isPlaying={isPlaying} />

        {/* Camera Controls */}
        <OrbitControls
          ref={controlsRef}
          enableZoom={true}
          minDistance={3.5}
          maxDistance={8.0}
          enablePan={false}
          maxPolarAngle={Math.PI / 2 + 0.25}
          minPolarAngle={Math.PI / 3 - 0.25}
          dampingFactor={0.06}
        />
      </Canvas>

      {/* Top Telemetry Status HUD */}
      <div className="hud-top">
        <div className="hud-badge hud-badge-cyan">
          <span className="h-2 w-2 rounded-full bg-cyan-400 animate-ping" />
          <span>NETWORK PIPELINE: ACTIVE</span>
        </div>

        <div className="flex items-center gap-3 font-mono text-[10px]">
          <span className="flex items-center gap-1.5 text-cyan-300">
            <span className="h-2 w-2 rounded-full bg-cyan-400" /> Request (Client → S3)
          </span>
          <span className="flex items-center gap-1.5 text-amber-300">
            <span className="h-2 w-2 rounded-full bg-amber-400" /> Response (S3 → Client)
          </span>
        </div>
      </div>

      {/* Bottom Interactive Play / Reset Controls */}
      <div className="hud-bottom">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsPlaying(true)}
            className="flex items-center gap-2 rounded-full bg-aws px-5 py-2 font-heading text-xs font-semibold text-ink shadow-[0_0_20px_rgba(255,153,0,0.5)] hover:scale-105 active:scale-95 transition-all"
          >
            <Play className="h-3.5 w-3.5" />
            <span>PLAY NETWORK SIMULATION</span>
          </button>
          <button
            onClick={handleResetCamera}
            title="Reset 3D Camera"
            className="flex h-8 w-8 items-center justify-center rounded-full border border-white/15 card-opaque text-slate-300 hover:border-cyan-400/50 hover:text-cyan-300 transition-all shadow-md"
          >
            <RotateCcw className="h-3.5 w-3.5" />
          </button>
        </div>

        <div className="flex items-center gap-2 rounded-full border border-white/10 card-opaque px-3 py-1 font-mono text-[10px] text-slate-400">
          <span>Drag to inspect network</span>
          <span>·</span>
          <span>Scroll to zoom</span>
        </div>
      </div>
    </div>
  );
}
