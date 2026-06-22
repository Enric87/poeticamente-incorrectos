import { useEffect, useRef, useState } from "react";
import { AdriSprite } from "./AdriSprite";
import { characters } from "../data/characters";
import navataBg from "../assets/backgrounds/navata_bg_3.jpg";
import logoFull from "../assets/logo_full.png";

const splashLines = [
  "Los Correctos Supremos han robado los instrumentos.",
  "Quieren prohibir la música, la cerveza y la diversión.",
  "Pero la banda no piensa quedarse callada.",
  "Solo hay una forma de recuperarlos…",
  "Hacer más ruido.",
];

type Stage = "logo" | "text" | "scene" | "chase";

interface SplashIntroProps {
  onFinished: () => void;
}

export function SplashIntro({ onFinished }: SplashIntroProps) {
  const [stage, setStage] = useState<Stage>("logo");
  const [lineIndex, setLineIndex] = useState(0);
  const [logoVisible, setLogoVisible] = useState(false);
  const onFinishedRef = useRef(onFinished);
  onFinishedRef.current = onFinished;

  // Logo aparece
  useEffect(() => {
    const t = setTimeout(() => setLogoVisible(true), 300);
    const t2 = setTimeout(() => setStage("text"), 3000);
    return () => { clearTimeout(t); clearTimeout(t2); };
  }, []);

  // Texto línea a línea
  useEffect(() => {
    if (stage !== "text") return;
    if (lineIndex < splashLines.length) {
      const t = setTimeout(() => setLineIndex((i) => i + 1), 1800);
      return () => clearTimeout(t);
    } else {
      const t = setTimeout(() => setStage("scene"), 600);
      return () => clearTimeout(t);
    }
  }, [stage, lineIndex]);

  // Escena banda + camión
  useEffect(() => {
    if (stage !== "scene") return;
    const t1 = setTimeout(() => setStage("chase"), 3500);
    const t2 = setTimeout(() => onFinishedRef.current(), 5800);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [stage]);

  const skip = () => onFinishedRef.current();

  return (
    <div
      className="relative w-full h-full flex flex-col items-center justify-center bg-[var(--pi-bg)] overflow-hidden cursor-pointer"
      onClick={skip}
    >
      {/* LOGO */}
      {stage === "logo" && (
        <div className={`flex flex-col items-center gap-2 transition-opacity duration-700 ${logoVisible ? "opacity-100" : "opacity-0"}`}>
          <img
            src={logoFull}
            alt="Poéticamente Incorrectos"
            className="w-48 sm:w-72 drop-shadow-[0_0_40px_rgba(255,120,0,0.5)]"
            style={{ mixBlendMode: "screen" }}
          />
          <p className="font-pixel text-[var(--pi-teal)] text-xs sm:text-sm tracking-widest uppercase mt-2">
            — The Video Game —
          </p>
        </div>
      )}

      {/* TEXTO */}
      {stage === "text" && (
        <div className="flex flex-col items-center gap-3 text-center max-w-xl px-4">
          {splashLines.slice(0, lineIndex).map((line, i) => (
            <p key={i} className="font-pixel text-[var(--pi-cream)] text-xs sm:text-base leading-relaxed opacity-90">
              {line}
            </p>
          ))}
          <span className="font-pixel text-[var(--pi-orange)] text-xs sm:text-base pi-blink">
            {lineIndex < splashLines.length ? "▌" : ""}
          </span>
        </div>
      )}

      {/* ESCENA BANDA */}
      {(stage === "scene" || stage === "chase") && (
        <div
          className="relative w-full h-full flex flex-col items-center justify-center bg-cover bg-center"
          style={{ backgroundImage: `url(${navataBg})` }}
        >
          <div className="absolute inset-0 bg-[var(--pi-bg)]/40" />
          <div className="relative z-10 w-full h-44 sm:h-60 flex items-end justify-center gap-1 pi-enter-left">
            <AdriSprite animation="run" className="w-16 sm:w-24" />
            {characters.filter((c) => c.id !== "adri").map((c) => (
              <img
                key={c.id}
                src={c.portrait}
                alt={c.name}
                draggable={false}
                className="w-16 sm:w-24 object-contain drop-shadow-[0_4px_6px_rgba(0,0,0,0.5)]"
                style={{ imageRendering: "pixelated" }}
              />
            ))}
          </div>
          {stage === "chase" && (
            <div
              className="absolute right-[-20%] bottom-[18%] font-pixel text-3xl sm:text-5xl z-10"
              style={{ animation: "pi-truck-flee 1.8s ease-in forwards" }}
            >
              🚚💨
            </div>
          )}
          <style>{`
            @keyframes pi-truck-flee {
              0% { transform: translateX(0); opacity: 1; }
              100% { transform: translateX(60vw); opacity: 0; }
            }
          `}</style>
        </div>
      )}

      {/* Skip */}
      <p className="absolute bottom-3 right-4 font-pixel text-[9px] sm:text-[11px] text-[var(--pi-cream)] opacity-40">
        clic para saltar
      </p>
    </div>
  );
}
