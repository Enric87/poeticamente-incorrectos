import { HUD } from "./HUD";
import { ArcadeButton } from "./ArcadeButton";
import { AdriSprite } from "./AdriSprite";
import logoHead from "../assets/logo_head.png";
import navataBg from "../assets/backgrounds/navata_bg_2.jpg";

interface StartScreenProps {
  onPlay: () => void;
  onSelectCharacter: () => void;
}

/**
 * Pantalla de inicio con el fondo ilustrado real de Navata y el
 * logo del moicano punk, más Adri animado dando vida a la escena.
 */
export function StartScreen({ onPlay, onSelectCharacter }: StartScreenProps) {
  return (
    <div className="relative w-full h-full flex flex-col">
      <HUD credit={0} score={12580} />

      <div
        className="relative flex-1 flex flex-col items-center justify-between overflow-hidden bg-cover bg-center"
        style={{ backgroundImage: `url(${navataBg})` }}
      >
        {/* Oscurece un poco el fondo para que el contenido resalte */}
        <div className="absolute inset-0 bg-[var(--pi-bg)]/35" />

        {/* Contenido central: logo + botones */}
        <div className="relative z-10 flex flex-col items-center gap-2 sm:gap-4 px-4 py-4 sm:py-8 w-full">
          <img
            src={logoHead}
            alt="Poéticamente Incorrectos"
            className="w-28 sm:w-40 drop-shadow-[0_4px_10px_rgba(0,0,0,0.6)]"
            draggable={false}
          />

          <h1
            className="glitch-text font-pixel text-xl sm:text-3xl md:text-4xl text-center text-[var(--pi-cream)] drop-shadow-[3px_3px_0_var(--pi-bg)] leading-tight"
            data-text="POÉTICAMENTE INCORRECTOS"
          >
            POÉTICAMENTE
            <br />
            INCORRECTOS
          </h1>
          <p className="font-punk uppercase tracking-[0.3em] text-xs sm:text-base text-[var(--pi-teal)]">
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

        {/* Adri animado en primer plano, dando vida a la escena */}
        <div className="relative z-10 w-20 sm:w-28 mb-2 sm:mb-4 self-start ml-4 sm:ml-10">
          <AdriSprite animation="pose" fps={0.7} />
        </div>
      </div>

      <div className="font-pixel text-center text-[10px] sm:text-xs text-[var(--pi-cream)] bg-[var(--pi-bg-soft)] py-2 pi-blink border-t-2 border-[var(--pi-brown)]">
        PULSA JUGAR PARA EMPEZAR
      </div>
    </div>
  );
}
