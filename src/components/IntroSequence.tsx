import { useEffect, useState } from "react";
import { introLines } from "../data/levels";
import { AdriSprite } from "./AdriSprite";
import { characters } from "../data/characters";
import navataBg from "../assets/backgrounds/navata_bg_3.jpg";

interface IntroSequenceProps {
  onFinished: () => void;
}

/**
 * Secuencia de intro narrativa corta: texto línea a línea, luego
 * la banda entrando en escena y el camión enemigo escapando.
 * Al terminar, pasa a la pantalla de selección de pueblo/nivel.
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
  const [stage, setStage] = useState<"enter" | "chase">("enter");

  useEffect(() => {
    const t1 = setTimeout(() => setStage("chase"), 3500);
    const t2 = setTimeout(() => onContinue(), 6000);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [onContinue]);

  const restOfBand = characters.filter((c) => c.id !== "adri");

  return (
    <div
      className="relative w-full h-full flex flex-col items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${navataBg})` }}
    >
      <div className="absolute inset-0 bg-[var(--pi-bg)]/40" />

      <div className="relative z-10 w-full h-44 sm:h-60 flex items-end justify-center gap-1 pi-enter-left">
        <AdriSprite animation="run" className="w-16 sm:w-24" />
        {restOfBand.map((c) => (
          <img
            key={c.id}
            src={c.portrait}
            alt={c.name}
            draggable={false}
            className="h-20 sm:h-28 object-contain drop-shadow-[0_4px_6px_rgba(0,0,0,0.5)]"
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
      <style>
        {`
          @keyframes pi-truck-flee {
            0% { transform: translateX(0); opacity: 1; }
            100% { transform: translateX(60vw); opacity: 0; }
          }
        `}
      </style>
    </div>
  );
}
