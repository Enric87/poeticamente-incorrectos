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

const MOVE_SPEED = 0.45; // % del ancho de pantalla por frame
const JUMP_HEIGHT = 18; // % de salto vertical
const JUMP_DURATION = 480; // ms de duración total del salto
const MIN_X = 4;
const MAX_X = 86;

/**
 * Nivel 1 - Navata, ahora con movimiento real:
 * flechas / WASD para moverse, espacio o arriba para saltar.
 * Sin enemigos todavía en esta v0; el objetivo es validar el control.
 */
export function LevelPreview({ onBackToStart }: LevelPreviewProps) {
  const [showComingSoon, setShowComingSoon] = useState(false);
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
    if (showComingSoon) return;

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

      // Salto: parábola simple basada en tiempo transcurrido
      if (k.jump && !isJumpingRef.current) {
        isJumpingRef.current = true;
        jumpStartRef.current = performance.now();
      }
      if (isJumpingRef.current) {
        const elapsed = performance.now() - jumpStartRef.current;
        const t = Math.min(1, elapsed / JUMP_DURATION);
        const arc = Math.sin(t * Math.PI); // 0 -> 1 -> 0
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
  }, [keys, showComingSoon]);

  return (
    <div className="relative w-full h-full flex flex-col">
      <HUD credit={1} score={12580} />

      {!showComingSoon ? (
        <div className="relative flex-1 flex flex-col overflow-hidden">
          <div
            className="relative flex-1 overflow-hidden bg-cover bg-center outline-none"
            style={{ backgroundImage: `url(${navataBg})` }}
            tabIndex={0}
          >
            <div className="absolute bottom-0 left-0 w-full h-[22%] bg-gradient-to-t from-black/50 to-transparent" />

            {/* Adri controlable */}
            <div
              className="absolute bottom-[6%] w-16 sm:w-24"
              style={{ left: `${posX}%`, transform: `translateY(${-jumpOffset}%)` }}
            >
              <AdriSprite animation={animation} flip={facing === "left"} />
            </div>

            <div className="absolute top-4 right-4 font-pixel text-[10px] sm:text-sm text-[var(--pi-cream)] bg-[var(--pi-brown-dark)]/90 px-3 py-1 border-2 border-[var(--pi-cream)]">
              NAVATA
            </div>

            {/* Indicador de controles */}
            <div className="absolute top-4 left-4 font-pixel text-[8px] sm:text-[10px] text-[var(--pi-cream)]/80 bg-[var(--pi-brown-dark)]/80 px-2 py-1 border border-[var(--pi-cream)]/40 leading-relaxed">
              ← → MOVER · ESPACIO SALTAR
            </div>
          </div>

          <div className="bg-[var(--pi-bg-soft)] border-t-2 border-[var(--pi-brown)] px-4 py-3 sm:py-4 flex flex-col items-center gap-1">
            <p className="font-pixel text-[var(--pi-red)] text-sm sm:text-xl">
              NIVEL {level.number} — {level.name.toUpperCase()}
            </p>
            <p className="font-pixel text-[var(--pi-orange)] text-[10px] sm:text-xs pi-blink">
              {level.tagline.toUpperCase()}
            </p>
            <p className="text-[var(--pi-cream)] text-xs sm:text-sm opacity-80 text-center mt-1 max-w-md">
              {level.description}
            </p>
            <button
              onClick={() => setShowComingSoon(true)}
              className="font-pixel mt-3 text-[10px] sm:text-xs text-[var(--pi-cream)] underline opacity-80 hover:opacity-100"
            >
              Continuar →
            </button>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center gap-3 text-center px-4 bg-[var(--pi-bg)]">
          <p className="font-pixel text-[var(--pi-orange)] text-lg sm:text-2xl">
            PRÓXIMAMENTE
          </p>
          <p className="font-pixel text-[var(--pi-cream)] text-xs sm:text-base">
            {level.objective}
          </p>
          <p className="text-[var(--pi-teal)] text-xs sm:text-sm opacity-90">
            Mini jefe: {level.miniBoss}
          </p>
          <button
            onClick={onBackToStart}
            className="font-pixel mt-6 text-[10px] sm:text-xs text-[var(--pi-cream)] bg-[var(--pi-brown)] border-2 border-[var(--pi-brown-dark)] px-4 py-2 pi-shake-hover"
          >
            Pulsa Enter para volver al inicio
          </button>
        </div>
      )}
    </div>
  );
}
