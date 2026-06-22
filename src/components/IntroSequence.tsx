import { useEffect, useState } from "react";
import { introLines } from "../data/levels";
import { AdriSprite } from "./AdriSprite";
import { characters } from "../data/characters";
import navataBg from "../assets/backgrounds/navata_bg_3.jpg";
import heroShout from "../assets/sprites/adri_hero_shout.png";

interface IntroSequenceProps {
  onFinished: () => void;
}

/**
 * Secuencia de intro narrativa. Avanza sola línea a línea y al terminar
 * muestra la entrada de la banda + camión enemigo antes de pasar al nivel.
 */
export function IntroSequence({ onFinished }: IntroSequenceProps) {
  const [lineIndex, setLineIndex] = useState(0);
  const [showScene, setShowScene] = useState(false);

  useEffect(() => {
    if (lineIndex < introLines.length) {
      const t = setTimeout(() => setLineIndex((i) => i + 1), 1800);
      return () => clearTimeout(t);
    } else {
      const t = setTimeout(() => setShowScene(true), 400);
      return () => clearTimeout(t);
    }
  }, [lineIndex]);

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center bg-[var(--pi-bg)] overflow-hidden px-4">
      {!showScene ? (
        <div className="flex flex-col items-center gap-3 text-center max-w-xl">
          {introLines.slice(0, lineIndex).map((line, i) => (
            <p
              key={i}
              className="font-pixel text-[var(--pi-cream)] text-xs sm:text-base leading-relaxed opacity-90"
            >
              {line}
            </p>
          ))}
          <span className="font-pixel text-[var(--pi-orange)] text-xs sm:text-base pi-blink">
            {lineIndex < introLines.length ? "▌" : ""}
          </span>
        </div>
      ) : (
        <SceneTransition onContinue={onFinished} />
      )}
    </div>
  );
}

function SceneTransition({ onContinue }: { onContinue: () => void }) {
  const [stage, setStage] = useState<"enter" | "shout" | "chase" | "level-card">(
    "enter"
  );

  useEffect(() => {
    const t1 = setTimeout(() => setStage("shout"), 1400);
    const t2 = setTimeout(() => setStage("chase"), 2600);
    const t3 = setTimeout(() => setStage("level-card"), 4400);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  const restOfBand = characters.filter((c) => c.id !== "adri");

  return (
    <div
      className="relative w-full h-full flex flex-col items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: stage !== "level-card" ? `url(${navataBg})` : undefined }}
    >
      {stage !== "level-card" && (
        <div className="absolute inset-0 bg-[var(--pi-bg)]/40" />
      )}

      {stage === "enter" && (
        <div className="relative z-10 w-full h-44 sm:h-60 flex items-end justify-center gap-1 pi-enter-left">
          <AdriSprite animation="run" className="w-16 sm:w-24" />
          {restOfBand.map((c) => (
            <img
              key={c.id}
              src={c.portrait}
              alt={c.name}
              draggable={false}
              className="h-20 sm:h-28 object-contain grayscale-0 drop-shadow-[0_4px_6px_rgba(0,0,0,0.5)]"
              style={{ imageRendering: "pixelated" }}
            />
          ))}
        </div>
      )}

      {stage === "shout" && (
        <div className="relative z-10 flex flex-col items-center gap-3">
          <img
            src={heroShout}
            alt="Adri grito sónico"
            className="w-48 sm:w-64 drop-shadow-[0_6px_10px_rgba(0,0,0,0.6)]"
            draggable={false}
          />
          <p className="font-pixel text-[var(--pi-orange)] text-sm sm:text-lg pi-blink">
            ¡QUE EMPIECE EL RUIDO!
          </p>
        </div>
      )}

      {stage === "chase" && (
        <div className="relative z-10 w-full h-44 sm:h-60 flex items-end justify-center">
          <div className="flex items-end gap-1">
            <AdriSprite animation="run" className="w-16 sm:w-24" />
          </div>
          <div
            className="absolute right-[-20%] bottom-2 font-pixel text-3xl sm:text-5xl"
            style={{ animation: "pi-truck-flee 1.8s ease-in forwards" }}
          >
            🚚💨
          </div>
          <style>
            {`
              @keyframes pi-truck-flee {
                0% { transform: translateX(0); opacity: 1; }
                100% { transform: translateX(60vw); opacity: 0; }
              }
            `}
          </style>
        </div>
      )}

      {stage === "level-card" && (
        <div className="flex flex-col items-center gap-2 text-center animate-[pi-enter-left_0.5s_ease-out]">
          <p className="font-pixel text-[var(--pi-red)] text-xl sm:text-3xl">
            NIVEL 1 — NAVATA
          </p>
          <p className="font-pixel text-[var(--pi-orange)] text-sm sm:text-lg pi-blink">
            QUE EMPIECE EL RUIDO
          </p>
          <button
            onClick={onContinue}
            className="font-pixel mt-6 text-[10px] sm:text-xs text-[var(--pi-cream)] underline opacity-80 hover:opacity-100"
          >
            Continuar →
          </button>
        </div>
      )}
    </div>
  );
}
