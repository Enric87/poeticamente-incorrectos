import { useEffect, useState } from "react";

/**
 * Hook que cicla por una lista de imágenes (frames) a un framerate dado.
 * Sustituye el "idle bob" CSS por animación real fotograma a fotograma
 * usando los sprites ilustrados de la banda.
 */
export function useSpriteAnimation(frames: string[], fps = 8, playing = true) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!playing || frames.length <= 1) return;
    const interval = setInterval(() => {
      setIndex((i) => (i + 1) % frames.length);
    }, 1000 / fps);
    return () => clearInterval(interval);
  }, [frames, fps, playing]);

  return frames[index] ?? frames[0];
}
