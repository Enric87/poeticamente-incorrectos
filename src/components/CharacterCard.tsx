import type { Character } from "../data/characters";
import { AdriSprite } from "./AdriSprite";

interface CharacterCardProps {
  character: Character;
  selected?: boolean;
  onSelect?: () => void;
}

export function CharacterCard({ character, selected, onSelect }: CharacterCardProps) {
  const isAdri = character.id === "adri";

  return (
    <button
      onClick={character.playable ? onSelect : undefined}
      disabled={!character.playable}
      className={`relative font-punk flex flex-col items-center w-32 sm:w-40 p-3 border-4 transition-all overflow-hidden ${
        character.playable
          ? "cursor-pointer hover:-translate-y-1"
          : "cursor-not-allowed"
      } ${
        selected
          ? "border-[var(--pi-orange)] bg-[var(--pi-bg-soft)]"
          : "border-[var(--pi-brown)] bg-[var(--pi-bg)]"
      }`}
      style={{
        boxShadow: selected ? `0 0 0 2px ${character.color} inset` : undefined,
      }}
    >
      <div className="relative w-20 h-24 sm:w-24 sm:h-28 mb-2 flex items-end justify-center">
        {isAdri ? (
          <AdriSprite className="h-full" />
        ) : character.portrait ? (
          <img
            src={character.portrait}
            alt={character.name}
            draggable={false}
            className="h-full object-contain grayscale opacity-50"
            style={{ imageRendering: "pixelated" }}
          />
        ) : null}
      </div>

      <span
        className="font-pixel text-xs sm:text-sm mb-1"
        style={{ color: character.color }}
      >
        {character.name}
      </span>
      <span className="text-[10px] sm:text-xs text-[var(--pi-cream)] opacity-80 text-center leading-tight">
        {character.role}
      </span>

      {!character.playable && (
        <span className="font-pixel mt-2 text-[8px] text-[var(--pi-red)] pi-blink">
          PRÓXIMAMENTE
        </span>
      )}

      {character.playable && (
        <div className="mt-2 text-[8px] sm:text-[9px] text-[var(--pi-cream)] opacity-70 text-center leading-tight">
          <p>Arma: {character.weapon}</p>
          <p>Especial: {character.special}</p>
        </div>
      )}
    </button>
  );
}
