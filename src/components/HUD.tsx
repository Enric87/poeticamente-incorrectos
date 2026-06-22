interface HUDProps {
  credit?: number;
  score?: number;
}

/**
 * Barra HUD estilo arcade clásico: 1P, Insert Coin, Credit, Score falso.
 * Puramente decorativa en esta v0 — refuerza la sensación de "máquina real".
 */
export function HUD({ credit = 0, score = 0 }: HUDProps) {
  return (
    <div className="font-pixel flex items-center justify-between w-full px-3 sm:px-6 py-2 text-[8px] sm:text-xs text-[var(--pi-cream)] bg-[var(--pi-bg-soft)] border-b-2 border-[var(--pi-brown)]">
      <div className="flex items-center gap-3">
        <span className="text-[var(--pi-orange)]">1P</span>
        <span>SCORE {score.toString().padStart(6, "0")}</span>
      </div>

      <div className="hidden sm:flex items-center gap-1 text-[var(--pi-teal)]">
        <span className="pi-blink">●</span>
        <span>INSERT COIN</span>
      </div>

      <div>
        <span>CREDIT {credit.toString().padStart(2, "0")}</span>
      </div>
    </div>
  );
}
