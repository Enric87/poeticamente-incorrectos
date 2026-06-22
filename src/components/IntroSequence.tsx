import { useEffect, useState } from "react";
import { introLines } from "../data/levels";
import { AdriSprite } from "./AdriSprite";

interface IntroSequenceProps {
  onFinished: () => void;
}

/**
 * Secuencia de intro narrativa. Avanza sola línea a línea y al terminar
 * muestra la entrada de Adri + camión enemigo antes de pasar al nivel.
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
  const [stage, setStage] = useState<"enter" | "chase" | "level-card">("enter");

  useEffect(() => {
    const t1 = setTimeout(() => setStage("chase"), 1600);
    const t2 = setTimeout(() => setStage("level-card"), 3400);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center">
      {(stage === "enter" || stage === "chase") && (
        <div className="relative w-full h-40 sm:h-56 flex items-end justify-center">
          {/* Banda entrando en escena */}
          <div className="flex items-end gap-1 pi-enter-left">
            <AdriSprite className="w-14 sm:w-20" shouting />
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="w-12 sm:w-16 h-20 sm:h-28 border-2 border-dashed border-[var(--pi-brown)] flex items-center justify-center text-[var(--pi-cream)] opacity-50 font-pixel text-[10px]"
              >
                ?
              </div>
            ))}
          </div>

          {/* Camión enemigo escapando */}
          {stage === "chase" && (
            <div
              className="absolute right-[-20%] bottom-2 font-pixel text-3xl sm:text-5xl"
              style={{
                animation: "pi-truck-flee 1.8s ease-in forwards",
              }}
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
