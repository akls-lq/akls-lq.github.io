import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { RoundedBox, ContactShadows, Float } from "@react-three/drei";
import * as THREE from "three";
import type { Lang } from "./content";

function texture(kind: "screen" | "cv", lang: Lang) {
  const c = document.createElement("canvas");
  c.width = kind === "screen" ? 768 : 768;
  c.height = kind === "screen" ? 640 : 1086;
  const x = c.getContext("2d")!;
  if (kind === "screen") {
    x.fillStyle = "#86d1e5";
    x.fillRect(0, 0, 768, 640);
    x.fillStyle = "#e0f3e7";
    for (const [a, b, r] of [
      [520, 100, 90],
      [590, 105, 70],
      [480, 130, 80],
    ]) {
      x.beginPath();
      x.arc(a, b, r, 0, Math.PI * 2);
      x.fill();
    }
    x.fillStyle = "#90b95c";
    x.beginPath();
    x.ellipse(420, 680, 570, 350, 0, 0, 7);
    x.fill();
    x.fillStyle = "#c1da72";
    x.beginPath();
    x.ellipse(60, 740, 500, 360, 0, 0, 7);
    x.fill();
    for (let i = 0; i < 5; i++) {
      x.fillStyle = ["#f7d77c", "#8f97ee", "#ec8fa5", "#d6edf0", "#86bc68"][i];
      x.fillRect(27, 38 + i * 94, 44, 44);
      x.fillStyle = "#253d55";
      x.font = "17px monospace";
      x.fillText(["C:", "PY", "GIT", "AI", "↗"][i], 30, 100 + i * 94);
    }
    x.fillStyle = "#33405f";
    x.fillRect(157, 147, 553, 376);
    x.fillStyle = "#f4f0e7";
    x.fillRect(148, 138, 553, 376);
    x.strokeStyle = "#33405f";
    x.lineWidth = 3;
    x.strokeRect(148, 138, 553, 376);
    x.fillStyle = "#a5a6e7";
    x.fillRect(151, 141, 547, 38);
    x.fillStyle = "#26324c";
    x.font = "17px monospace";
    x.fillText("AKILIS_OS / home", 169, 167);
    x.fillText("— □ ×", 610, 166);
    x.fillStyle = "#273753";
    x.font = "bold 73px sans-serif";
    x.fillText("Hello,", 189, 280);
    x.fillText(lang === "fr" ? "bienvenue." : "welcome.", 189, 364);
    x.font = "22px monospace";
    x.fillText("CODE · FINANCE · IDEAS", 190, 426);
    x.fillStyle = "#2554e8";
    x.fillRect(190, 453, 192, 31);
    x.fillStyle = "white";
    x.font = "17px monospace";
    x.fillText("AKILIS LE QUELLEC", 200, 475);
    x.fillStyle = "#deded2";
    x.fillRect(0, 604, 768, 36);
    x.fillStyle = "#374058";
    x.font = "18px monospace";
    x.fillText("◆ START", 17, 629);
    x.fillText("bonjour.exe", 500, 629);
  } else {
    x.fillStyle = "#fffdf4";
    x.fillRect(0, 0, 768, 1086);
    x.fillStyle = "#2453e8";
    x.fillRect(55, 57, 66, 9);
    x.font = "20px monospace";
    x.fillText("HELLO, I’M", 55, 120);
    x.fillStyle = "#172034";
    x.font = "bold 64px sans-serif";
    x.fillText("AKILIS", 55, 208);
    x.fillText("LE QUELLEC", 55, 278);
    x.fillStyle = "#687081";
    x.font = "23px sans-serif";
    x.fillText("42 Paris × ICN Business School", 55, 334);
    x.fillStyle = "#172034";
    x.fillRect(55, 378, 658, 2);
    [
      "01   TECH / DEV / DATA / IA",
      "02   BUSINESS / FINANCE",
      "03   IMAGE / PUBLIC SPEAKING",
    ].forEach((s, i) => {
      x.font = "bold 25px monospace";
      x.fillText(s, 55, 447 + i * 94);
    });
    x.font = "24px sans-serif";
    x.fillText(
      lang === "fr" ? "Curieux de nature." : "Curious by nature.",
      55,
      785,
    );
    x.fillText(
      lang === "fr" ? "Hybride par choix." : "Hybrid by choice.",
      55,
      823,
    );
    x.font = "20px monospace";
    x.fillText("akilis.leq@gmail.com", 55, 932);
    x.fillText("github.com/akls-lq", 55, 969);
    x.fillStyle = "#2453e8";
    x.font = "17px monospace";
    x.fillText(
      lang === "fr"
        ? "APERÇU — PDF PUBLIC À VENIR"
        : "PREVIEW — PUBLIC PDF COMING SOON",
      55,
      1030,
    );
  }
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 4;
  return t;
}
function Box({
  position,
  size,
  color,
  radius = 0.12,
  rotation = [0, 0, 0],
}: {
  position: [number, number, number];
  size: [number, number, number];
  color: string;
  radius?: number;
  rotation?: [number, number, number];
}) {
  return (
    <RoundedBox
      args={size}
      radius={radius}
      smoothness={4}
      position={position}
      rotation={rotation}
      castShadow
      receiveShadow
    >
      <meshStandardMaterial color={color} roughness={0.32} />
    </RoundedBox>
  );
}
function Paper({ started, lang }: { started: number | null; lang: Lang }) {
  const ref = useRef<THREE.Mesh>(null);
  const t = useMemo(() => texture("cv", lang), [lang]);
  const geo = useMemo(() => new THREE.PlaneGeometry(1.58, 1, 12, 64), []);
  useFrame(() => {
    const elapsed = started === null ? 0 : (performance.now() - started) / 1000;
    const p = THREE.MathUtils.smoothstep(elapsed, 0.22, 2.15);
    if (ref.current) ref.current.visible = p > 0.001;
    const pos = geo.attributes.position;
    const uv = geo.attributes.uv;
    for (let i = 0; i < pos.count; i++) {
      const s = (Math.floor(i / 13) / 64) * p;
      const len = 2.8 * s;
      const over = Math.max(0, len - 0.68);
      const y = -0.59 - Math.min(len, 0.68) * 0.1 - over * 0.88;
      const z =
        0.78 +
        Math.min(len, 0.68) +
        0.18 * Math.sin((Math.min(over, 1) * Math.PI) / 2) +
        over * 0.08;
      pos.setXYZ(
        i,
        (uv.getX(i) - 0.5) * 1.58,
        y + 0.025 * Math.sin(s * 22) * s,
        z,
      );
      uv.setY(i, 1 - s);
    }
    pos.needsUpdate = true;
    uv.needsUpdate = true;
    geo.computeVertexNormals();
  });
  return (
    <mesh ref={ref} geometry={geo} visible={false} castShadow>
      <meshStandardMaterial map={t} side={THREE.DoubleSide} roughness={0.9} />
    </mesh>
  );
}
function Machine({ started, lang }: { started: number | null; lang: Lang }) {
  const group = useRef<THREE.Group>(null);
  const tex = useMemo(() => texture("screen", lang), [lang]);
  useFrame(() => {
    if (!group.current) return;
    const s = started === null ? -1 : (performance.now() - started) / 1000;
    group.current.rotation.z = s > 0 && s < 1.8 ? Math.sin(s * 65) * 0.004 : 0;
  });
  return (
    <group ref={group}>
      <Box
        position={[0, 0.9, 0]}
        size={[2.65, 2.25, 0.95]}
        color="#a2aaef"
        radius={0.25}
      />
      <Box
        position={[-0.09, 0.9, 0.4]}
        size={[2.39, 2.07, 0.24]}
        color="#a8d9f5"
        radius={0.23}
      />
      <Box
        position={[-0.09, 0.9, 0.535]}
        size={[2.06, 1.76, 0.11]}
        color="#4b656f"
        radius={0.16}
      />
      <mesh position={[-0.09, 0.9, 0.6]}>
        <planeGeometry args={[1.86, 1.56]} />
        <meshBasicMaterial map={tex} />
      </mesh>
      <mesh position={[-0.09, 0.9, 0.607]}>
        <planeGeometry args={[1.86, 1.56]} />
        <meshBasicMaterial color="#bbdeff" transparent opacity={0.045} />
      </mesh>
      <Box
        position={[0, -0.31, 0]}
        size={[0.55, 0.35, 0.58]}
        color="#7d92dd"
        radius={0.08}
      />
      <Box
        position={[0, -0.62, 0.03]}
        size={[3, 0.52, 1.32]}
        color="#a9d4f0"
        radius={0.12}
      />
      <Box
        position={[0, -0.57, 0.7]}
        size={[2.04, 0.22, 0.08]}
        color="#2273de"
        radius={0.07}
      />
      <Box
        position={[0, -0.59, 0.753]}
        size={[1.74, 0.055, 0.022]}
        color="#163c90"
        radius={0.015}
      />
      <Box
        position={[0, -0.37, 0.72]}
        size={[0.77, 0.15, 0.025]}
        color="#f1a9b1"
        radius={0.02}
      />
      <Label
        text={lang === "fr" ? "VOIR MON CV" : "VIEW RÉSUMÉ"}
        position={[0, -0.368, 0.739]}
      />
      {["#ed7c9e", "#f4cd6c", "#89bd9a"].map((c, i) => (
        <mesh
          key={c}
          position={[1.3, 1.43 - i * 0.44, 0.32]}
          rotation={[Math.PI / 2, 0, 0]}
          castShadow
        >
          <cylinderGeometry args={[0.105, 0.105, 0.08, 24]} />
          <meshStandardMaterial color={c} />
        </mesh>
      ))}
      <Box
        position={[-1.04, 1.89, 0.63]}
        size={[0.37, 0.47, 0.012]}
        color="#edeeae"
        radius={0.005}
        rotation={[0.04, 0.04, -0.22]}
      />
      <Box
        position={[1.11, 0.2, 0.57]}
        size={[0.29, 0.46, 0.012]}
        color="#f0df9c"
        radius={0.005}
        rotation={[0, 0, 0.13]}
      />
      <Paper started={started} lang={lang} />
    </group>
  );
}
function Label({
  text,
  position,
}: {
  text: string;
  position: [number, number, number];
}) {
  const map = useMemo(() => {
    const c = document.createElement("canvas");
    c.width = 512;
    c.height = 96;
    const x = c.getContext("2d")!;
    x.fillStyle = "#ad354b";
    x.font = "bold 52px monospace";
    x.textAlign = "center";
    x.fillText(text, 256, 68);
    return new THREE.CanvasTexture(c);
  }, [text]);
  return (
    <mesh position={position}>
      <planeGeometry args={[0.7, 0.13]} />
      <meshBasicMaterial map={map} transparent />
    </mesh>
  );
}
function Star({
  position,
  color,
  scale = 1,
}: {
  position: [number, number, number];
  color: string;
  scale?: number;
}) {
  const shape = useMemo(() => {
    const s = new THREE.Shape();
    for (let i = 0; i < 8; i++) {
      const a = (i * Math.PI) / 4,
        r = i % 2 === 0 ? 0.31 : 0.1;
      const x = Math.cos(a) * r,
        y = Math.sin(a) * r;
      if (i === 0) s.moveTo(x, y);
      else s.lineTo(x, y);
    }
    s.closePath();
    return s;
  }, []);
  return (
    <Float speed={2} floatIntensity={0.35} rotationIntensity={0.3}>
      <mesh position={position} scale={scale} castShadow>
        <extrudeGeometry
          args={[
            shape,
            {
              depth: 0.12,
              bevelEnabled: true,
              bevelSegments: 3,
              steps: 1,
              bevelSize: 0.06,
              bevelThickness: 0.06,
            },
          ]}
        />
        <meshStandardMaterial color={color} metalness={0.3} roughness={0.25} />
      </mesh>
    </Float>
  );
}
function Decor() {
  return (
    <>
      <Box
        position={[0, -1.24, -0.18]}
        size={[6.6, 0.7, 3.2]}
        color="#f4e5ed"
        radius={0.13}
      />
      <Box
        position={[-1.1, -0.13, -0.55]}
        size={[2.1, 0.6, 0.55]}
        color="#e395cb"
        radius={0.28}
        rotation={[0, 0, -0.4]}
      />
      <Box
        position={[1.1, -0.1, -0.55]}
        size={[1.8, 0.65, 0.55]}
        color="#e395cb"
        radius={0.28}
        rotation={[0, 0, 0.55]}
      />
      <mesh position={[2, -0.63, 0.1]} castShadow>
        <sphereGeometry args={[0.38, 32, 24]} />
        <meshStandardMaterial color="#8dbd79" roughness={0.3} />
      </mesh>
      <group position={[-2, -0.56, 0.42]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.28, 0.26, 0.65, 48]} />
          <meshStandardMaterial color="#d83f5b" roughness={0.23} />
        </mesh>
        <mesh position={[0, 0.33, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.22, 0.28, 48]} />
          <meshStandardMaterial color="#f36d7c" side={THREE.DoubleSide} />
        </mesh>
        <mesh position={[0, 0.315, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[0.22, 32]} />
          <meshStandardMaterial color="#632a39" />
        </mesh>
        <mesh position={[0.3, 0.03, 0]}>
          <torusGeometry args={[0.2, 0.065, 16, 32]} />
          <meshStandardMaterial color="#d83f5b" />
        </mesh>
        {[-0.12, 0.12].map((a) => (
          <group key={a} position={[a, 0.12, 0.24]}>
            <mesh>
              <sphereGeometry args={[0.093, 16, 16]} />
              <meshStandardMaterial color="white" />
            </mesh>
            <mesh position={[0.025, -0.015, 0.07]}>
              <sphereGeometry args={[0.043, 16, 16]} />
              <meshStandardMaterial color="#202137" />
            </mesh>
          </group>
        ))}
        <mesh position={[0, -0.12, 0.258]}>
          <torusGeometry args={[0.04, 0.018, 12, 24]} />
          <meshStandardMaterial color="#ffe8df" />
        </mesh>
      </group>
      <Star position={[-1.7, 1.9, 0.02]} color="#a0d7a7" scale={0.85} />
      <Star position={[1.9, 0.7, -0.2]} color="#f1abce" scale={0.75} />
    </>
  );
}
export default function Scene({
  started,
  lang,
}: {
  started: number | null;
  lang: Lang;
}) {
  return (
    <Canvas
      shadows
      dpr={[1, 1.5]}
      camera={{ position: [0, 1.9, 10.8], fov: 35 }}
      gl={{ antialias: true, alpha: true }}
      onCreated={({ camera }) => camera.lookAt(0, -0.15, 0)}
    >
      <ambientLight intensity={1.4} />
      <hemisphereLight args={["#f3e6ff", "#6e8bbb", 1.6]} />
      <directionalLight
        position={[-3, 7, 5]}
        intensity={3.4}
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-normalBias={0.04}
      />
      <pointLight position={[3, 2, -3]} color="#f1bcf3" intensity={12} />
      <group position={[0, 0.1, 0]} scale={window.innerWidth < 761 ? 0.78 : 1}>
        <Machine started={started} lang={lang} />
        <Decor />
      </group>
      <ContactShadows
        frames={1}
        position={[0, -1.61, 0]}
        opacity={0.4}
        scale={10}
        blur={2.8}
        far={4}
      />
    </Canvas>
  );
}
