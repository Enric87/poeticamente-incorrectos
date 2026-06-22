import { useState } from "react";
import { characters } from "../data/characters";
import { CharacterCard } from "./CharacterCard";
import { HUD } from "./HUD";
import { ArcadeButton } from "./ArcadeButton";

interface CharacterSelectProps {
  onConfirm: () => void;
  onBack: () => void;
}

export function CharacterSelect({ onConfirm, onBack }: CharacterSelectProps) {
  const [selectedId, setSelectedId] = useState("adri");

  return (
    <div className="w-full h-full flex flex-col">
      <HUD credit={1} score={12580} />

      <div className="flex-1 flex flex-col items-center justify-center gap-6 px-4 py-6 bg-[var(--pi-bg)]">
        <h2 className="font-pixel text-[var(--pi-cream)] text-base sm:text-2xl text-center">
          SELECCIONA PERSONAJE
        </h2>

        <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
          {characters.map((c) => (
            <CharacterCard
              key={c.id}
              character={c}
              selected={selectedId === c.id}
              onSelect={() => setSelectedId(c.id)}
            />
          ))}
        </div>

        <p className="text-[var(--pi-cream)] text-[10px] sm:text-xs opacity-60 text-center max-w-sm">
          De momento solo Adri es jugable. El resto de la banda llegará en
          próximas versiones.
        </p>

        <div className="flex gap-3 mt-2">
          <ArcadeButton onClick={onBack}>← Volver</ArcadeButton>
          <ArcadeButton variant="primary" onClick={onConfirm}>
            Confirmar
          </ArcadeButton>
        </div>
      </div>
    </div>
  );
}
