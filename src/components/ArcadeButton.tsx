import type { ReactNode } from "react";

interface ArcadeButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary";
  disabled?: boolean;
}

/**
 * Botón estilo arcade de los 90.
 * - "primary": botón grande JUGAR, con relieve y vibración al hover.
 * - "secondary": botones más pequeños (Ver intro, Opciones...).
 */
export function ArcadeButton({
  children,
  onClick,
  variant = "secondary",
  disabled = false,
}: ArcadeButtonProps) {
  const base =
    "font-pixel uppercase tracking-wider transition-transform duration-100 select-none border-4 active:translate-y-1";

  const primary =
    "px-10 py-4 text-xl sm:text-2xl text-[var(--pi-bg)] bg-[var(--pi-orange)] border-[var(--pi-cream)] shadow-[0_6px_0_var(--pi-orange-dim)] active:shadow-none pi-shake-hover";

  const secondary =
    "px-4 py-2 text-[10px] sm:text-xs text-[var(--pi-cream)] bg-[var(--pi-brown)] border-[var(--pi-brown-dark)] shadow-[0_4px_0_var(--pi-brown-dark)] active:shadow-none hover:bg-[var(--pi-brown-dark)] hover:text-[var(--pi-orange)]";

  const disabledStyles = "opacity-40 cursor-not-allowed pointer-events-none";

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${variant === "primary" ? primary : secondary} ${
        disabled ? disabledStyles : "cursor-pointer"
      }`}
    >
      {children}
    </button>
  );
}
