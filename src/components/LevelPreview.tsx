import { useState } from "react";
import { levels } from "../data/levels";
import { AdriSprite } from "./AdriSprite";
import { HUD } from "./HUD";

interface LevelPreviewProps {
  onBackToStart: () => void;
}

/**
 * Preview conceptual del Nivel 1 - Navata.
 * Solo escenario + Adri caminando (sin enemigos en esta v0).
 * Termina en pantalla "Próximamente" con vuelta al inicio.
 */
export function LevelPreview({ onBackToStart }: LevelPreviewProps) {
  const [showComingSoon, setShowComingSoon] = useState(false);
  const level = levels[0];

  return (
    <div className="relative w-full h-full flex flex-col">
      <HUD credit={1} score={12580} />

      {!showComingSoon ? (
        <div className="relative flex-1 flex flex-col overflow-hidden">
          {/* Escenario: calle de Navata al atardecer */}
          <div
            className="relative flex-1 overflow-hidden"
            style={{
              background:
                "linear-gradient(to bottom, #4a2d4a 0%, #b5452e 40%, #ff8c3a 65%, #2a1d14 100%)",
            }}
          >
            {/* Cables eléctricos */}
            <svg
              className="absolute top-0 left-0 w-full h-1/3 opacity-70"
              viewBox="0 0 400 60"
              preserveAspectRatio="none"
            >
              <path d="M0 8 Q 100 40 200 14 T 400 20" stroke="#15110e" strokeWidth="2" fill="none" />
            </svg>

            {/* Fachadas con carteles punk */}
            <div className="absolute bottom-0 left-0 w-full flex items-end h-2/3">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="relative flex-1 bg-[var(--pi-brown-dark)] border-t-2 border-[#0d0a08]"
                  style={{ height: `${55 + ((i * 11) % 30)}%`, marginLeft: "-1px" }}
                >
                  {i === 1 && (
                    <div className="absolute top-2 left-1 right-1 bg-[var(--pi-red)] text-[6px] sm:text-[8px] font-pixel text-center py-1 text-[var(--pi-cream)] rotate-[-2deg]">
                      RUIDO = LIBERTAD
                    </div>
                  )}
                  {i === 3 && (
                    <div className="absolute top-3 left-1 right-1 text-[6px] sm:text-[8px] font-pixel text-center text-[var(--pi-teal)] rotate-[1deg]">
                      BAR CERRADO
                    </div>
                  )}
                  {i === 4 && (
                    <div className="absolute top-2 left-1 right-1 bg-[var(--pi-cream)] text-[6px] sm:text-[8px] font-pixel text-center py-1 text-[var(--pi-bg)] rotate-[2deg]">
                      PUNK NO MUERE
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Suelo / acera */}
            <div className="absolute bottom-0 left-0 w-full h-6 sm:h-8 bg-[#0d0a08] border-t-2 border-[var(--pi-brown)]" />

            {/* Adri caminando */}
            <div className="absolute bottom-6 sm:bottom-8 left-[10%] w-14 sm:w-20">
              <AdriSprite />
            </div>

            {/* Letrero NAVATA */}
            <div className="absolute top-4 right-4 font-pixel text-[10px] sm:text-sm text-[var(--pi-cream)] bg-[var(--pi-brown-dark)] px-3 py-1 border-2 border-[var(--pi-cream)]">
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
