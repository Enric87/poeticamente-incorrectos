import { HUD } from "./HUD";
import { ArcadeButton } from "./ArcadeButton";
import navataBg from "../assets/backgrounds/navata_bg_1.jpg";

interface LevelOption {
  id: string;
  name: string;
  available: boolean;
}

const levelOptions: LevelOption[] = [
  { id: "navata", name: "Navata", available: true },
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
 * en esta v0; el resto aparecen bloqueados como "Próximamente".
 */
export function LevelSelect({ onSelectLevel, onBack }: LevelSelectProps) {
  return (
    <div className="w-full h-full flex flex-col">
      <HUD credit={1} score={12580} />

      <div
        className="flex-1 flex flex-col items-center justify-center gap-6 px-4 py-6 relative overflow-hidden bg-cover bg-center"
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
              className={`font-pixel flex flex-col items-center justify-center gap-2 py-6 border-4 transition-all ${
                lvl.available
                  ? "cursor-pointer border-[var(--pi-orange)] bg-[var(--pi-bg-soft)] hover:-translate-y-1 text-[var(--pi-cream)]"
                  : "cursor-not-allowed border-[var(--pi-brown)] bg-[var(--pi-bg)] text-[var(--pi-cream)] opacity-50"
              }`}
            >
              <span className="text-xs sm:text-base">{lvl.name.toUpperCase()}</span>
              {!lvl.available && (
                <span className="text-[8px] sm:text-[9px] text-[var(--pi-red)] pi-blink">
                  PRÓXIMAMENTE
                </span>
              )}
            </button>
          ))}
        </div>

        <p className="relative text-[var(--pi-cream)] text-[10px] sm:text-xs opacity-70 text-center max-w-sm">
          De momento solo Navata está disponible. El resto de pueblos
          llegará en próximas versiones.
        </p>

        <div className="relative">
          <ArcadeButton onClick={onBack}>← Volver al inicio</ArcadeButton>
        </div>
      </div>
    </div>
  );
}
