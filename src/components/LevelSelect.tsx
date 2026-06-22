import { HUD } from "./HUD";
import { ArcadeButton } from "./ArcadeButton";
import { levels } from "../data/levels";
import navataBg from "../assets/backgrounds/navata_bg_1.jpg";
import navataCard from "../assets/backgrounds/navata_level_card.jpg";

interface LevelOption {
  id: string;
  name: string;
  available: boolean;
  thumbnail?: string;
}

const levelOptions: LevelOption[] = [
  { id: "navata", name: "Navata", available: true, thumbnail: navataCard },
  { id: "terrades", name: "Terrades", available: false },
  { id: "cabanelles", name: "Cabanelles", available: false },
  { id: "figueres", name: "Figueres", available: false },
];

interface LevelSelectProps {
  onSelectLevel: (id: string) => void;
  onBack: () => void;
}

/**
 * Pantalla de selección de niveles/pueblos. Solo Navata es jugable
 * en esta v0, con su propia miniatura ilustrada; el resto aparecen
 * bloqueados como "Próximamente" con placeholder oscuro.
 */
export function LevelSelect({ onSelectLevel, onBack }: LevelSelectProps) {
  const navata = levels[0];

  return (
    <div className="w-full h-full flex flex-col">
      <HUD credit={1} score={12580} />

      <div
        className="flex-1 flex flex-col items-center justify-center gap-5 px-4 py-6 relative overflow-hidden bg-cover bg-center"
        style={{ backgroundImage: `url(${navataBg})` }}
      >
        <div className="absolute inset-0 bg-[var(--pi-bg)]/55" />

        <h2 className="relative font-pixel text-[var(--pi-cream)] text-base sm:text-2xl text-center drop-shadow-[2px_2px_0_var(--pi-bg)]">
          SELECCIONA PUEBLO
        </h2>

        <div className="relative grid grid-cols-2 gap-3 sm:gap-4 w-full max-w-md">
          {levelOptions.map((lvl) => (
            <button
              key={lvl.id}
              onClick={lvl.available ? () => onSelectLevel(lvl.id) : undefined}
              disabled={!lvl.available}
              className={`relative font-pixel flex flex-col items-center justify-center gap-2 py-6 border-4 overflow-hidden transition-all bg-cover bg-center ${
                lvl.available
                  ? "cursor-pointer border-[var(--pi-orange)] hover:-translate-y-1 text-[var(--pi-cream)]"
                  : "cursor-not-allowed border-[var(--pi-brown)] bg-[var(--pi-bg)] text-[var(--pi-cream)] opacity-50"
              }`}
              style={
                lvl.thumbnail ? { backgroundImage: `url(${lvl.thumbnail})` } : undefined
              }
            >
              {lvl.thumbnail && (
                <div className="absolute inset-0 bg-[var(--pi-bg)]/20" />
              )}
              {!lvl.thumbnail && (
                <span className="relative text-xs sm:text-base drop-shadow-[1px_1px_0_var(--pi-bg)]">
                  {lvl.name.toUpperCase()}
                </span>
              )}
              {!lvl.available && (
                <span className="relative text-[8px] sm:text-[9px] text-[var(--pi-red)] pi-blink">
                  PRÓXIMAMENTE
                </span>
              )}
            </button>
          ))}
        </div>

        <div className="relative flex flex-col items-center gap-1 text-center max-w-md">
          <p className="font-pixel text-[var(--pi-orange)] text-[10px] sm:text-xs pi-blink">
            {navata.tagline.toUpperCase()}
          </p>
          <p className="text-[var(--pi-cream)] text-[10px] sm:text-xs opacity-80">
            {navata.description}
          </p>
          <p className="text-[var(--pi-teal)] text-[10px] sm:text-xs mt-1">
            Objetivo: {navata.objective} · Mini jefe: {navata.miniBoss}
          </p>
        </div>

        <div className="relative">
          <ArcadeButton onClick={onBack}>← Volver al inicio</ArcadeButton>
        </div>
      </div>
    </div>
  );
}
