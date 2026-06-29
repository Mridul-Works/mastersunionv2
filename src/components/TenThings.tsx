import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Html, AdaptiveDpr, PerformanceMonitor } from "@react-three/drei";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import * as THREE from "three";
import gsap from "gsap";
import { CHAPTERS, type Chapter } from "./chapters";

const ACCENTS = [
  "#4F46E5", "#F43F5E", "#F59E0B", "#10B981", "#0EA5E9",
  "#8B5CF6", "#F97316", "#E5E7EB", "#EC4899", "#84CC16",
];

const COUNT = CHAPTERS.length;
const RADIUS = 6.2;
const CARD_W = 2.6;
const CARD_H = 3.6;

const FONT = "'Inter', system-ui, sans-serif";
const MONO = "'JetBrains Mono', ui-monospace, monospace";

/* ────────────────────────── Particles ────────────────────────── */

function Particles({ count = 600 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 8 + Math.random() * 30;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = (Math.random() - 0.5) * 22;
      arr[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta);
    }
    return arr;
  }, [count]);

  useFrame((_, dt) => {
    if (ref.current) ref.current.rotation.y += dt * 0.015;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        color="#cbd5ff"
        transparent
        opacity={0.7}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

/* ────────────────────────── Card ────────────────────────── */

type CardProps = {
  chapter: Chapter;
  index: number;
  accent: string;
  selectedIdx: number | null;
  onSelect: (i: number) => void;
  onClose: () => void;
};

function Card({ chapter, index, accent, selectedIdx, onSelect, onClose }: CardProps) {
  const groupRef = useRef<THREE.Group>(null);
  const matRef = useRef<THREE.MeshStandardMaterial>(null);
  const glowRef = useRef<THREE.MeshBasicMaterial>(null);
  const textureRef = useRef<THREE.Texture | null>(null);
  const [texReady, setTexReady] = useState(false);

  const angle = (index / COUNT) * Math.PI * 2;
  const basePos = useMemo(
    () => new THREE.Vector3(Math.sin(angle) * RADIUS, 0, Math.cos(angle) * RADIUS),
    [angle]
  );
  const baseRotY = angle; // face outward

  const isSelected = selectedIdx === index;
  const anySelected = selectedIdx !== null;

  // Load texture once
  useEffect(() => {
    const loader = new THREE.TextureLoader();
    loader.load(chapter.image, (tex) => {
      tex.colorSpace = THREE.SRGBColorSpace;
      tex.anisotropy = 8;
      textureRef.current = tex;
      if (matRef.current) {
        matRef.current.map = tex;
        matRef.current.needsUpdate = true;
      }
      setTexReady(true);
    });
    return () => {
      textureRef.current?.dispose();
    };
  }, [chapter.image]);

  // Initialize transform
  useEffect(() => {
    const g = groupRef.current;
    if (!g) return;
    g.position.copy(basePos);
    g.rotation.set(0, baseRotY, 0);
    g.scale.setScalar(1);
  }, [basePos, baseRotY]);

  // Selection animation
  useEffect(() => {
    const g = groupRef.current;
    if (!g) return;
    gsap.killTweensOf([g.position, g.rotation, g.scale]);

    if (isSelected) {
      gsap.to(g.position, { x: 0, y: 0, z: RADIUS + 2.4, duration: 1.25, ease: "power3.inOut" });
      gsap.to(g.rotation, { x: 0, y: 0, z: 0, duration: 1.25, ease: "power3.inOut" });
      gsap.to(g.scale, { x: 2.6, y: 2.6, z: 2.6, duration: 1.25, ease: "power3.inOut" });
      if (matRef.current) gsap.to(matRef.current, { opacity: 1, duration: 0.6 });
      if (glowRef.current) gsap.to(glowRef.current, { opacity: 0.7, duration: 0.8 });
    } else if (anySelected) {
      const out = basePos.clone().multiplyScalar(1.9);
      gsap.to(g.position, { x: out.x, y: out.y - 0.4, z: out.z, duration: 1, ease: "power3.inOut" });
      gsap.to(g.rotation, { x: 0, y: baseRotY, z: 0, duration: 1, ease: "power3.inOut" });
      gsap.to(g.scale, { x: 0.78, y: 0.78, z: 0.78, duration: 1, ease: "power3.inOut" });
      if (matRef.current) gsap.to(matRef.current, { opacity: 0.25, duration: 0.6 });
      if (glowRef.current) gsap.to(glowRef.current, { opacity: 0, duration: 0.4 });
    } else {
      gsap.to(g.position, { x: basePos.x, y: basePos.y, z: basePos.z, duration: 1.2, ease: "power3.inOut" });
      gsap.to(g.rotation, { x: 0, y: baseRotY, z: 0, duration: 1.2, ease: "power3.inOut" });
      gsap.to(g.scale, { x: 1, y: 1, z: 1, duration: 1.2, ease: "power3.inOut" });
      if (matRef.current) gsap.to(matRef.current, { opacity: 1, duration: 0.6 });
      if (glowRef.current) gsap.to(glowRef.current, { opacity: 0.2, duration: 0.6 });
    }
  }, [isSelected, anySelected, basePos, baseRotY]);

  // Float
  useFrame(({ clock }) => {
    const g = groupRef.current;
    if (!g || isSelected) return;
    const t = clock.elapsedTime + index * 0.7;
    const baseY = anySelected ? -0.4 : 0;
    g.position.y = baseY + Math.sin(t * 0.6) * 0.1;
  });

  return (
    <group ref={groupRef}>
      {/* glow */}
      <mesh position={[0, 0, -0.02]} scale={[1.08, 1.08, 1]}>
        <planeGeometry args={[CARD_W, CARD_H]} />
        <meshBasicMaterial ref={glowRef} color={accent} transparent opacity={0.2} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>

      {/* image plane */}
      <mesh
        onClick={(e) => {
          e.stopPropagation();
          if (anySelected && !isSelected) return;
          if (!anySelected) onSelect(index);
        }}
        onPointerOver={(e) => { e.stopPropagation(); document.body.style.cursor = anySelected ? "default" : "pointer"; }}
        onPointerOut={() => { document.body.style.cursor = "default"; }}
      >
        <planeGeometry args={[CARD_W, CARD_H]} />
        <meshStandardMaterial
          ref={matRef}
          color={texReady ? "#ffffff" : "#1a1a22"}
          metalness={0.2}
          roughness={0.45}
          transparent
          opacity={1}
        />
      </mesh>

      {/* hairline frame */}
      <lineSegments position={[0, 0, 0.001]}>
        <edgesGeometry args={[new THREE.PlaneGeometry(CARD_W, CARD_H)]} />
        <lineBasicMaterial color={accent} transparent opacity={0.55} />
      </lineSegments>

      {/* Html overlay — collapsed header always; expanded full content when selected */}
      <Html
        transform
        occlude={false}
        position={[0, 0, 0.01]}
        distanceFactor={3}
        style={{ pointerEvents: isSelected ? "auto" : "none", width: "320px", userSelect: "none" }}
      >
        {!isSelected ? (
          <CollapsedFace chapter={chapter} accent={accent} />
        ) : (
          <ExpandedFace chapter={chapter} accent={accent} onClose={onClose} />
        )}
      </Html>
    </group>
  );
}

/* ────────────────────────── Card faces (HTML) ────────────────────────── */

function CollapsedFace({ chapter, accent }: { chapter: Chapter; accent: string }) {
  return (
    <div
      style={{
        width: "320px",
        height: "440px",
        fontFamily: FONT,
        color: "white",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "18px",
        background: "linear-gradient(180deg, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.85) 100%)",
        boxShadow: `0 0 60px ${accent}33`,
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <span
          style={{
            background: accent,
            color: accent === "#E5E7EB" ? "#0A0A0A" : "white",
            padding: "5px 9px",
            fontSize: 9,
            fontWeight: 900,
            letterSpacing: "0.25em",
            textTransform: "uppercase",
          }}
        >
          Chapter {chapter.n}
        </span>
        <span style={{ fontFamily: MONO, fontSize: 9, opacity: 0.7, letterSpacing: "0.2em", textTransform: "uppercase" }}>
          {chapter.tag}
        </span>
      </div>

      <div>
        <h3
          style={{
            fontSize: 17,
            lineHeight: 1.15,
            fontWeight: 900,
            textTransform: "uppercase",
            letterSpacing: "-0.01em",
            margin: 0,
            color: "white",
            textShadow: "0 2px 12px rgba(0,0,0,0.6)",
          }}
        >
          {chapter.headline}
        </h3>
        <div style={{ marginTop: 14, paddingTop: 12, borderTop: "1px solid rgba(255,255,255,0.18)", display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <div>
            <div style={{ fontSize: 26, fontWeight: 900, lineHeight: 1, color: "white" }}>{chapter.stat}</div>
            <div style={{ fontSize: 8.5, fontWeight: 700, marginTop: 4, letterSpacing: "0.2em", textTransform: "uppercase", opacity: 0.65 }}>
              {chapter.label}
            </div>
          </div>
          <span style={{ fontFamily: MONO, fontSize: 10, fontWeight: 700, color: accent, letterSpacing: "0.2em", textTransform: "uppercase" }}>
            Open →
          </span>
        </div>
      </div>
    </div>
  );
}

function ExpandedFace({ chapter, accent, onClose }: { chapter: Chapter; accent: string; onClose: () => void }) {
  return (
    <div
      style={{
        width: "560px",
        maxHeight: "640px",
        overflowY: "auto",
        fontFamily: FONT,
        color: "white",
        background: "rgba(8,8,12,0.88)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        border: `1px solid ${accent}55`,
        boxShadow: `0 0 80px ${accent}55, 0 30px 80px rgba(0,0,0,0.6)`,
        padding: "26px 28px",
        position: "relative",
      }}
    >
      {/* Close */}
      <button
        onClick={(e) => { e.stopPropagation(); onClose(); }}
        aria-label="Close"
        style={{
          position: "absolute",
          top: 14,
          right: 14,
          width: 34,
          height: 34,
          background: "rgba(255,255,255,0.08)",
          border: "1px solid rgba(255,255,255,0.25)",
          backdropFilter: "blur(10px)",
          color: "white",
          fontSize: 18,
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 0,
        }}
      >
        ×
      </button>

      {/* Masthead */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
        <span style={{ fontFamily: MONO, fontSize: 10, color: accent, letterSpacing: "0.15em", textTransform: "uppercase" }}>
          [ {chapter.tag} ]
        </span>
        <div style={{ flex: 1, height: 1, background: `${accent}40` }} />
        <span style={{ fontFamily: MONO, fontSize: 10, opacity: 0.5, letterSpacing: "0.15em" }}>
          DOSSIER {chapter.n}/10
        </span>
      </div>

      <h3 style={{
        fontSize: 26, lineHeight: 1.05, fontWeight: 900,
        textTransform: "uppercase", letterSpacing: "-0.02em",
        margin: "6px 0 18px",
      }}>
        {chapter.headline}
      </h3>

      <p style={{ fontSize: 13, lineHeight: 1.6, color: "rgba(255,255,255,0.75)", margin: "0 0 18px" }}>
        {chapter.body}
      </p>

      {/* Stat strip */}
      <div style={{ display: "grid", gridTemplateColumns: `repeat(${Math.min(chapter.stats.length, 3)}, 1fr)`, gap: 10, padding: "14px 0", borderTop: "1px solid rgba(255,255,255,0.12)", borderBottom: "1px solid rgba(255,255,255,0.12)", margin: "8px 0 18px" }}>
        <div>
          <div style={{ fontSize: 22, fontWeight: 900, color: "white" }}>{chapter.stat}<span style={{ color: accent }}>.</span></div>
          <div style={{ fontSize: 9, opacity: 0.55, letterSpacing: "0.15em", textTransform: "uppercase", marginTop: 2 }}>{chapter.label}</div>
        </div>
        {chapter.stats.slice(0, 2).map((s, i) => (
          <div key={i}>
            <div style={{ fontSize: 22, fontWeight: 900, color: "white" }}>{s.value}<span style={{ color: accent }}>.</span></div>
            <div style={{ fontSize: 9, opacity: 0.55, letterSpacing: "0.15em", textTransform: "uppercase", marginTop: 2 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Sections */}
      {chapter.sections.map((s, i) => (
        <div key={i} style={{ marginBottom: 14 }}>
          <div style={{ display: "flex", gap: 10, alignItems: "baseline", marginBottom: 4 }}>
            <span style={{ fontFamily: MONO, fontSize: 10, opacity: 0.4, letterSpacing: "0.25em" }}>
              {String(i + 1).padStart(2, "0")}
            </span>
            <h4 style={{ margin: 0, fontSize: 12, fontWeight: 900, textTransform: "uppercase", letterSpacing: "-0.01em" }}>
              {s.heading}
            </h4>
          </div>
          <p style={{ margin: 0, fontSize: 12, lineHeight: 1.6, color: "rgba(255,255,255,0.65)" }}>{s.body}</p>
        </div>
      ))}

      {/* Pull quote */}
      <div style={{ borderLeft: `2px solid ${accent}`, paddingLeft: 14, margin: "18px 0 14px" }}>
        <p style={{ margin: 0, fontStyle: "italic", fontSize: 13, lineHeight: 1.45, color: "rgba(255,255,255,0.85)" }}>
          &ldquo;{chapter.pullQuote}&rdquo;
        </p>
      </div>

      {/* Chips */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 14 }}>
        {chapter.chips.map((c) => (
          <span key={c} style={{
            border: "1px solid rgba(255,255,255,0.18)",
            padding: "4px 8px",
            fontSize: 9,
            fontWeight: 700,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.7)",
          }}>{c}</span>
        ))}
      </div>
    </div>
  );
}

/* ────────────────────────── Gallery (drag + inertia) ────────────────────────── */

function Gallery({
  selectedIdx,
  onSelect,
  onClose,
  draggingRef,
}: {
  selectedIdx: number | null;
  onSelect: (i: number) => void;
  onClose: () => void;
  draggingRef: React.MutableRefObject<{ dragging: boolean; velocity: number; lastX: number }>;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const targetRotRef = useRef(0);

  // When a card is selected, animate the whole group rotation so the selected card faces camera
  useEffect(() => {
    if (selectedIdx === null) return;
    const g = groupRef.current;
    if (!g) return;
    // Each card placed at angle = (i/COUNT)*2π, at (sin a, 0, cos a)*R. The card in front of cam (z=+R) is angle 0.
    // To bring selected card to angle 0 we set group.rotation.y = -selectedAngle.
    const targetAngle = -((selectedIdx / COUNT) * Math.PI * 2);
    // Normalize to nearest equivalent
    const current = g.rotation.y;
    let delta = targetAngle - current;
    delta = ((delta + Math.PI) % (Math.PI * 2) + Math.PI * 2) % (Math.PI * 2) - Math.PI;
    gsap.to(g.rotation, { y: current + delta, duration: 1.2, ease: "power3.inOut" });
    targetRotRef.current = current + delta;
    draggingRef.current.velocity = 0;
  }, [selectedIdx, draggingRef]);

  useFrame((_, dt) => {
    const g = groupRef.current;
    if (!g) return;
    if (selectedIdx !== null) return;
    const d = draggingRef.current;
    if (!d.dragging) {
      // inertia
      g.rotation.y += d.velocity * dt;
      d.velocity *= 0.94; // friction
      if (Math.abs(d.velocity) < 0.0005) d.velocity = 0;
      // ambient drift
      g.rotation.y += dt * 0.02;
    }
  });

  return (
    <group ref={groupRef}>
      {CHAPTERS.map((c, i) => (
        <Card
          key={c.n}
          chapter={c}
          index={i}
          accent={ACCENTS[i] ?? "#0EA5E9"}
          selectedIdx={selectedIdx}
          onSelect={onSelect}
          onClose={onClose}
        />
      ))}
    </group>
  );
}

/* ────────────────────────── Scene wrapper ────────────────────────── */

function Scene({
  selectedIdx,
  onSelect,
  onClose,
  draggingRef,
}: {
  selectedIdx: number | null;
  onSelect: (i: number) => void;
  onClose: () => void;
  draggingRef: React.MutableRefObject<{ dragging: boolean; velocity: number; lastX: number }>;
}) {
  const { camera } = useThree();
  useEffect(() => {
    camera.position.set(0, 0.6, 12);
    camera.lookAt(0, 0, 0);
  }, [camera]);

  return (
    <>
      <color attach="background" args={["#05060a"]} />
      <fog attach="fog" args={["#05060a", 14, 32]} />

      <ambientLight intensity={0.35} />
      <directionalLight position={[5, 8, 10]} intensity={1.1} />
      <pointLight position={[-8, 4, -5]} intensity={0.6} color="#8B5CF6" />
      <pointLight position={[8, -4, 5]} intensity={0.5} color="#0EA5E9" />

      <Particles count={500} />
      <Gallery selectedIdx={selectedIdx} onSelect={onSelect} onClose={onClose} draggingRef={draggingRef} />

      <EffectComposer>
        <Bloom intensity={0.65} luminanceThreshold={0.35} luminanceSmoothing={0.7} mipmapBlur />
        <Vignette eskil={false} offset={0.2} darkness={0.85} />
      </EffectComposer>
    </>
  );
}

/* ────────────────────────── Main exported section ────────────────────────── */

export default function TenThings() {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const draggingRef = useRef({ dragging: false, velocity: 0, lastX: 0 });
  const wrapRef = useRef<HTMLDivElement>(null);

  // Pointer drag → rotate group via velocity (group lives in canvas; we modify via ref through closure)
  // We talk to the group through a custom event on draggingRef + a one-off rotation delta we apply in useFrame.
  // For simplicity, we apply rotation directly inside Gallery's useFrame by reading dragging state.

  const onPointerDown = (e: React.PointerEvent) => {
    if (selectedIdx !== null) return;
    draggingRef.current.dragging = true;
    draggingRef.current.lastX = e.clientX;
    draggingRef.current.velocity = 0;
    (e.target as Element).setPointerCapture?.(e.pointerId);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    const d = draggingRef.current;
    if (!d.dragging) return;
    const dx = e.clientX - d.lastX;
    d.lastX = e.clientX;
    const factor = 0.005;
    d.velocity = dx * factor * 60; // rad/s
    // Apply immediately for responsiveness via a custom hook bridge
    window.dispatchEvent(new CustomEvent("__tt_drag", { detail: dx * factor }));
  };
  const onPointerUp = () => {
    draggingRef.current.dragging = false;
  };

  return (
    <section className="relative bg-[#05060a] py-20 sm:py-28" style={{ fontFamily: FONT }}>
      <div className="mx-auto max-w-[1280px] px-5 sm:px-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="mb-3 flex items-center gap-3">
              <span className="h-px w-10 bg-white/40" />
              <span className="text-[10px] font-black tracking-[0.32em] text-white/70">CUT THE MARKETING</span>
            </div>
            <h2 className="max-w-3xl text-[clamp(2rem,5vw,3.75rem)] font-black leading-[1] tracking-tight text-white uppercase">
              10 things you should know about Masters&apos; Union.
            </h2>
            <p className="mt-5 max-w-xl text-[13px] font-medium tracking-wide text-white/55">
              Drag the gallery to explore. Tap any monolith to open the dossier.
            </p>
          </div>
          <div className="hidden sm:flex items-center gap-2 text-[10px] font-bold tracking-[0.25em] text-white/40 uppercase" style={{ fontFamily: MONO }}>
            <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Exhibition // Live
          </div>
        </div>
      </div>

      <div
        ref={wrapRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onPointerLeave={onPointerUp}
        className="mt-10 h-[720px] w-full touch-none select-none"
        style={{ cursor: selectedIdx === null ? "grab" : "default" }}
      >
        <Canvas
          dpr={[1, 1.6]}
          gl={{ antialias: true, powerPreference: "high-performance" }}
          camera={{ fov: 45, position: [0, 0.6, 12] }}
        >
          <PerformanceMonitor />
          <AdaptiveDpr pixelated={false} />
          <Suspense fallback={null}>
            <SceneWithDragBridge
              selectedIdx={selectedIdx}
              onSelect={setSelectedIdx}
              onClose={() => setSelectedIdx(null)}
              draggingRef={draggingRef}
            />
          </Suspense>
        </Canvas>
      </div>
    </section>
  );
}

/* ────────────────────────── Drag bridge ────────────────────────── */
/* Listens for window '__tt_drag' events and applies immediate rotation. */

function SceneWithDragBridge(props: {
  selectedIdx: number | null;
  onSelect: (i: number) => void;
  onClose: () => void;
  draggingRef: React.MutableRefObject<{ dragging: boolean; velocity: number; lastX: number }>;
}) {
  return (
    <>
      <Scene {...props} />
      <DragApplier selectedIdx={props.selectedIdx} />
    </>
  );
}

function DragApplier({ selectedIdx }: { selectedIdx: number | null }) {
  const { scene } = useThree();
  useEffect(() => {
    const handler = (e: Event) => {
      if (selectedIdx !== null) return;
      const detail = (e as CustomEvent<number>).detail;
      // find the Gallery group: traverse scene
      scene.traverse((obj) => {
        if ((obj as THREE.Group).isGroup && obj.userData.__isGallery) {
          obj.rotation.y += detail;
        }
      });
    };
    window.addEventListener("__tt_drag", handler as EventListener);
    return () => window.removeEventListener("__tt_drag", handler as EventListener);
  }, [scene, selectedIdx]);
  return null;
}
