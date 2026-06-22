import { useEffect, useState } from "react";
import { levels } from "../data/levels";
import { AdriSprite } from "./AdriSprite";
import { HUD } from "./HUD";
import navataBg from "../assets/backgrounds/navata_bg_1.jpg";

interface LevelPreviewProps {
  onBackToStart: () => void;
}

/**
 * Preview del Nivel 1 - Navata, con el fondo ilustrado real
 * y Adri recorriendo la calle (animación de correr real).
 * Sin enemigos todavía en esta v0.
 */
export function LevelPreview({ onBackToStart }: LevelPreviewProps) {
  const [showComingSoon, setShowComingSoon] = useState(false);
  const [walkPos, setWalkPos] = useState(8); // % desde la izquierda
  const level = levels[0];

  // Adri camina lentamente de izquierda a derecha por la escena
  useEffect(() => {
    if (showComingSoon) return;
    const interval = setInterval(() => {
      setWalkPos((p) => (p >= 70 ? 8 : p + 0.4));
    }, 60);
    return () => clearInterval(interval);
  }, [showComingSoon]);

  return (
    <div className="relative w-full h-full flex flex-col">
      <HUD credit={1} score={12580} />

      {!showComingSoon ? (
        <div className="relative flex-1 flex flex-col overflow-hidden">
          {/* Escenario real: calle de Navata al atardecer */}
          <div
            className="relative flex-1 overflow-hidden bg-cover bg-bottom"
            style={{ backgroundImage: `url(${navataBg})` }}
          >
            {/* Sombra de suelo para asentar al personaje */}
            <div className="absolute bottom-0 left-0 w-full h-[22%] bg-gradient-to-t from-black/50 to-transparent" />

            {/* Adri caminando por la calle */}
            <div
              className="absolute bottom-[6%] w-16 sm:w-24 transition-[left] ease-linear"
              style={{ left: `${walkPos}%`, transitionDuration: "60ms" }}
            >
              <AdriSprite animation="run" />
            </div>

            {/* Letrero NAVATA */}
            <div className="absolute top-4 right-4 font-pixel text-[10px] sm:text-sm text-[var(--pi-cream)] bg-[var(--pi-brown-dark)]/90 px-3 py-1 border-2 border-[var(--pi-cream)]">
              NAVATA
            </div>
          </div>

          {/* Cartel de nivel */}
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
