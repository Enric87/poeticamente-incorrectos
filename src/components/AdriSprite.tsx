import { useSpriteAnimation } from "../hooks/useSpriteAnimation";
import { adriFrames, type AdriAnimation } from "../data/adriSprites";

interface AdriSpriteProps {
  className?: string;
  animation?: AdriAnimation;
  fps?: number;
  flip?: boolean;
}

/**
 * Sprite real de Adri animado fotograma a fotograma a partir del
 * spritesheet ilustrado (idle / run / jump / shout / hit / pose).
 */
export function AdriSprite({
  className = "",
  animation = "idle",
  fps,
  flip = false,
}: AdriSpriteProps) {
  const frames = adriFrames[animation];
  const defaultFps: Record<AdriAnimation, number> = {
    idle: 2,
    run: 5,
    jump: 4,
    shout: 6,
    hit: 6,
    pose: 1,
  };

  const frame = useSpriteAnimation(frames, fps ?? defaultFps[animation]);

  return (
    <img
      src={frame}
      alt="Adri"
      draggable={false}
      className={`select-none pointer-events-none object-contain ${className}`}
      style={{
        imageRendering: "pixelated",
        transform: flip ? "scaleX(-1)" : undefined,
      }}
    />
  );
}
