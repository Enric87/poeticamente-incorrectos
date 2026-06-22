import { HUD } from "./HUD";
import { ArcadeButton } from "./ArcadeButton";

interface StartScreenProps {
  onPlay: () => void;
  onSelectCharacter: () => void;
}

/**
 * Pantalla de inicio. El "pueblo al atardecer" se construye con capas
 * de CSS (gradiente + siluetas) en lugar de una imagen, para que sea
 * fácil sustituir luego por un fondo pixel-art real sin tocar la lógica.
 */
export function StartScreen({ onPlay, onSelectCharacter }: StartScreenProps) {
  return (
    <div className="relative w-full h-full flex flex-col">
      <HUD credit={0} score={12580} />

      {/* Fondo: cielo de atardecer + siluetas de pueblo */}
      <div
        className="relative flex-1 flex flex-col items-center justify-between overflow-hidden"
        style={{
          background:
            "linear-gradient(to bottom, #2a1a3d 0%, #8a3a2e 35%, #ff6b1a 60%, #b54d12 75%, #1a1410 100%)",
        }}
      >
        {/* Sol */}
        <div
          className="absolute left-1/2 -translate-x-1/2 top-[18%] w-24 h-24 sm:w-32 sm:h-32 rounded-full crt-flicker"
          style={{
            background: "var(--pi-cream)",
            boxShadow: "0 0 60px 10px rgba(255, 200, 120, 0.6)",
          }}
        />

        {/* Cables eléctricos */}
        <svg
          className="absolute top-0 left-0 w-full h-1/2 opacity-60"
          viewBox="0 0 400 100"
          preserveAspectRatio="none"
        >
          <path d="M0 10 Q 100 60 200 20 T 400 30" stroke="#1a1410" strokeWidth="2" fill="none" />
          <path d="M0 25 Q 120 70 220 35 T 400 45" stroke="#1a1410" strokeWidth="2" fill="none" />
        </svg>

        {/* Siluetas de fachadas de pueblo */}
        <div className="absolute bottom-0 left-0 w-full flex items-end">
          {[...Array(7)].map((_, i) => (
            <div
              key={i}
              className="flex-1 bg-[var(--pi-bg)]"
              style={{
                height: `${30 + ((i * 13) % 40)}px`,
                marginLeft: i === 0 ? 0 : "-1px",
                clipPath:
                  i % 2 === 0
                    ? "polygon(0 100%, 0 30%, 50% 0, 100% 30%, 100% 100%)"
                    : "polygon(0 100%, 0 0, 100% 0, 100% 100%)",
              }}
            />
          ))}
        </div>

        {/* Contenido central: logo + botones */}
        <div className="relative z-10 flex flex-col items-center gap-4 sm:gap-6 px-4 py-6 sm:py-10">
          <h1
            className="glitch-text font-pixel text-2xl sm:text-4xl md:text-5xl text-center text-[var(--pi-cream)] drop-shadow-[3px_3px_0_var(--pi-bg)]"
            data-text="POÉTICAMENTE INCORRECTOS"
          >
            POÉTICAMENTE
            <br />
            INCORRECTOS
          </h1>
          <p className="font-punk uppercase tracking-[0.3em] text-sm sm:text-lg text-[var(--pi-teal)]">
            — The Video Game —
          </p>

          <ArcadeButton variant="primary" onClick={onPlay}>
            Jugar
          </ArcadeButton>

          <div className="flex flex-wrap justify-center gap-3 mt-1">
            <ArcadeButton onClick={onPlay}>Ver intro</ArcadeButton>
            <ArcadeButton onClick={onSelectCharacter}>
              Seleccionar personaje
            </ArcadeButton>
            <ArcadeButton disabled>Opciones</ArcadeButton>
          </div>
        </div>
      </div>

      <div className="font-pixel text-center text-[10px] sm:text-xs text-[var(--pi-cream)] bg-[var(--pi-bg-soft)] py-2 pi-blink border-t-2 border-[var(--pi-brown)]">
        PULSA JUGAR PARA EMPEZAR
      </div>
    </div>
  );
}
