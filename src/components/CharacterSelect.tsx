import { useState } from "react";
import { characters } from "../data/characters";
import { CharacterCard } from "./CharacterCard";
import { HUD } from "./HUD";
import { ArcadeButton } from "./ArcadeButton";
import logoHead from "../assets/logo_head.png";

interface CharacterSelectProps {
  onConfirm: () => void;
  onBack: () => void;
}

export function CharacterSelect({ onConfirm, onBack }: CharacterSelectProps) {
  const [selectedId, setSelectedId] = useState("adri");

  return (
    <div className="w-full h-full flex flex-col">
      <HUD credit={1} score={12580} />

      <div
        className="flex-1 flex flex-col items-center justify-center gap-5 px-4 py-6 relative overflow-hidden"
        style={{
          background:
            "radial-gradient(ellipse at top, var(--pi-bg-soft) 0%, var(--pi-bg) 70%)",
        }}
      >
        <img
          src={logoHead}
          alt=""
          className="absolute -top-6 right-[-40px] w-40 opacity-10 rotate-6 pointer-events-none select-none"
          draggable={false}
        />

        <h2 className="relative font-pixel text-[var(--pi-cream)] text-base sm:text-2xl text-center">
          SELECCIONA PERSONAJE
        </h2>

        <div className="relative flex flex-wrap justify-center gap-3 sm:gap-4">
          {characters.map((c) => (
            <CharacterCard
              key={c.id}
              character={c}
              selected={selectedId === c.id}
              onSelect={() => setSelectedId(c.id)}
            />
          ))}
        </div>

        <p className="relative text-[var(--pi-cream)] text-[10px] sm:text-xs opacity-60 text-center max-w-sm">
          De momento solo Adri es jugable. El resto de la banda llegará en
          próximas versiones.
        </p>

        <div className="relative flex gap-3 mt-2">
          <ArcadeButton onClick={onBack}>← Volver</ArcadeButton>
          <ArcadeButton variant="primary" onClick={onConfirm}>
            Confirmar
          </ArcadeButton>
        </div>
      </div>
    </div>
  );
}
