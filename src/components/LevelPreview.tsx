import { useEffect, useRef, useState } from "react";
import { levels } from "../data/levels";
import { AdriSprite } from "./AdriSprite";
import { HUD } from "./HUD";
import { useKeyboardControls } from "../hooks/useKeyboardControls";
import { type AdriAnimation } from "../data/adriSprites";
import navataBg from "../assets/backgrounds/navata_bg_1.jpg";

interface LevelPreviewProps {
  onBackToStart: () => void;
}

const MOVE_SPEED = 0.18; // % del ancho de pantalla por frame
const JUMP_HEIGHT = 18; // % de salto vertical
const JUMP_DURATION = 480; // ms de duración total del salto
const MIN_X = 4;
const MAX_X = 86;

/**
 * Nivel 1 - Navata. La calle ocupa toda la pantalla disponible
 * (sin cajas de texto que recorten la vista). El título del nivel
 * vive como una etiqueta pequeña arriba, igual que "NAVATA".
 * Flechas/WASD para moverse, espacio o arriba para saltar.
 */
export function LevelPreview({ onBackToStart }: LevelPreviewProps) {
  const level = levels[0];
  const keys = useKeyboardControls();

  const [posX, setPosX] = useState(8);
  const [jumpOffset, setJumpOffset] = useState(0);
  const [facing, setFacing] = useState<"right" | "left">("right");
  const [animation, setAnimation] = useState<AdriAnimation>("idle");

  const isJumpingRef = useRef(false);
  const jumpStartRef = useRef(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const tick = () => {
      const k = keys.current;
      let moving = false;

      setPosX((prev) => {
        let next = prev;
        if (k.left) {
          next -= MOVE_SPEED;
          moving = true;
          setFacing("left");
        }
        if (k.right) {
          next += MOVE_SPEED;
          moving = true;
          setFacing("right");
        }
        return Math.min(MAX_X, Math.max(MIN_X, next));
      });

      if (k.jump && !isJumpingRef.current) {
        isJumpingRef.current = true;
        jumpStartRef.current = performance.now();
      }
      if (isJumpingRef.current) {
        const elapsed = performance.now() - jumpStartRef.current;
        const t = Math.min(1, elapsed / JUMP_DURATION);
        const arc = Math.sin(t * Math.PI);
        setJumpOffset(arc * JUMP_HEIGHT);
        if (t >= 1) {
          isJumpingRef.current = false;
          setJumpOffset(0);
        }
      }

      setAnimation(isJumpingRef.current ? "jump" : moving ? "run" : "idle");

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [keys]);

  return (
    <div className="relative w-full h-full flex flex-col">
      <HUD credit={1} score={12580} />

      <div
        className="relative flex-1 overflow-hidden bg-cover bg-center outline-none"
        style={{ backgroundImage: `url(${navataBg})` }}
        tabIndex={0}
      >
        <div className="absolute bottom-0 left-0 w-full h-[18%] bg-gradient-to-t from-black/50 to-transparent" />

        {/* Adri controlable */}
        <div
          className="absolute bottom-[13%] w-16 sm:w-24"
          style={{ left: `${posX}%`, transform: `translateY(${-jumpOffset}%)` }}
        >
          <AdriSprite animation={animation} flip={facing === "left"} />
        </div>

        {/* Título del nivel, esquina superior izquierda */}
        <div className="absolute top-4 left-4 font-pixel text-[10px] sm:text-sm text-[var(--pi-cream)] bg-[var(--pi-brown-dark)]/90 px-3 py-1 border-2 border-[var(--pi-cream)]">
          NIVEL {level.number}
        </div>

        {/* Letrero NAVATA, esquina superior derecha */}
        <div className="absolute top-4 right-4 font-pixel text-[10px] sm:text-sm text-[var(--pi-cream)] bg-[var(--pi-brown-dark)]/90 px-3 py-1 border-2 border-[var(--pi-cream)]">
          NAVATA
        </div>

        {/* Indicador de controles, discreto abajo a la izquierda */}
        <div className="absolute bottom-3 left-4 font-pixel text-[8px] sm:text-[10px] text-[var(--pi-cream)] bg-[var(--pi-brown-dark)] px-2 py-1 border border-[var(--pi-cream)]/60">
          ← → MOVER · ESPACIO SALTAR
        </div>

        {/* Volver al inicio, discreto abajo a la derecha */}
        <button
          onClick={onBackToStart}
          className="absolute bottom-3 right-4 font-pixel text-[8px] sm:text-[10px] text-[var(--pi-cream)] bg-[var(--pi-brown-dark)] px-2 py-1 border border-[var(--pi-cream)]/60 hover:text-[var(--pi-orange)] hover:border-[var(--pi-orange)]"
        >
          ← VOLVER
        </button>
      </div>
    </div>
  );
}
