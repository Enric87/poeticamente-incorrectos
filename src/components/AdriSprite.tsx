interface AdriSpriteProps {
  className?: string;
  shouting?: boolean;
}

/**
 * Placeholder ilustrado de Adri (cantante/guitarrista).
 * SVG propio en estilo pixel-ish plano, NO es el spritesheet de referencia.
 * Animación idle via CSS (.pi-idle-bob) en lugar de sprite-sheet real.
 */
export function AdriSprite({ className = "", shouting = false }: AdriSpriteProps) {
  return (
    <div className={`pi-idle-bob ${className}`}>
      <svg
        viewBox="0 0 100 140"
        xmlns="http://www.w3.org/2000/svg"
        shapeRendering="crispEdges"
        className="w-full h-full"
      >
        {/* Sombra */}
        <ellipse cx="50" cy="134" rx="26" ry="5" fill="#000" opacity="0.35" />

        {/* Piernas */}
        <rect x="34" y="96" width="12" height="32" fill="#1f1b1a" />
        <rect x="54" y="96" width="12" height="32" fill="#1f1b1a" />
        {/* Zapatillas */}
        <rect x="30" y="126" width="20" height="8" fill="#0d0c0b" />
        <rect x="50" y="126" width="20" height="8" fill="#0d0c0b" />
        <rect x="30" y="126" width="20" height="3" fill="#e8d4a8" />
        <rect x="50" y="126" width="20" height="3" fill="#e8d4a8" />

        {/* Torso / camiseta negra */}
        <rect x="30" y="58" width="40" height="40" fill="#161311" />
        {/* Tirantes de la guitarra */}
        <rect x="30" y="58" width="6" height="40" fill="#7a4a23" />

        {/* Brazos */}
        <rect x="20" y="62" width="10" height="26" fill="#c98a55" />
        <rect x="70" y="62" width="10" height="26" fill="#c98a55" />
        {/* Muñequeras */}
        <rect x="20" y="84" width="10" height="6" fill="#0d0c0b" />
        <rect x="70" y="84" width="10" height="6" fill="#0d0c0b" />

        {/* Guitarra (Les Paul-ish, genérica) */}
        <rect x="56" y="78" width="26" height="18" rx="3" fill="#1a1410" stroke="#3d3024" strokeWidth="1.5" />
        <rect x="78" y="58" width="5" height="26" fill="#3d3024" />

        {/* Micrófono en mano */}
        <rect x="14" y="56" width="6" height="6" fill="#888" />
        <rect x="14" y="62" width="2" height="14" fill="#444" />

        {/* Cabeza */}
        <rect x="36" y="30" width="28" height="28" fill="#c98a55" />
        {/* Pelo oscuro despeinado */}
        <rect x="32" y="20" width="36" height="14" fill="#15110e" />
        <rect x="30" y="26" width="6" height="10" fill="#15110e" />
        <rect x="64" y="26" width="6" height="10" fill="#15110e" />
        {/* Gafas */}
        <rect x="38" y="42" width="10" height="6" fill="none" stroke="#15110e" strokeWidth="2" />
        <rect x="52" y="42" width="10" height="6" fill="none" stroke="#15110e" strokeWidth="2" />
        <rect x="48" y="44" width="4" height="2" fill="#15110e" />
        {/* Perilla */}
        <rect x="42" y="52" width="16" height="6" fill="#15110e" />

        {/* Ondas de voz si está gritando (especial) */}
        {shouting && (
          <g stroke="var(--pi-orange)" strokeWidth="2" fill="none" opacity="0.9">
            <path d="M10 44 Q4 50 10 56" />
            <path d="M4 40 Q -4 50 4 60" />
          </g>
        )}
      </svg>
    </div>
  );
}
