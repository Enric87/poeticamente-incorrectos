import { useEffect, useRef } from "react";

export interface KeyboardState {
  left: boolean;
  right: boolean;
  jump: boolean;
}

const LEFT_KEYS = new Set(["ArrowLeft", "a", "A"]);
const RIGHT_KEYS = new Set(["ArrowRight", "d", "D"]);
const JUMP_KEYS = new Set([" ", "ArrowUp", "w", "W"]);

/**
 * Hook que mantiene un ref mutable con el estado actual del teclado
 * (izquierda / derecha / salto) sin causar re-renders por cada pulsación.
 * El componente que lo usa lee este ref dentro de su propio loop de animación.
 */
export function useKeyboardControls() {
  const stateRef = useRef<KeyboardState>({ left: false, right: false, jump: false });

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (LEFT_KEYS.has(e.key)) stateRef.current.left = true;
      if (RIGHT_KEYS.has(e.key)) stateRef.current.right = true;
      if (JUMP_KEYS.has(e.key)) {
        stateRef.current.jump = true;
        e.preventDefault(); // evita que la página haga scroll con espacio/flechas
      }
    };
    const handleKeyUp = (e: KeyboardEvent) => {
      if (LEFT_KEYS.has(e.key)) stateRef.current.left = false;
      if (RIGHT_KEYS.has(e.key)) stateRef.current.right = false;
      if (JUMP_KEYS.has(e.key)) stateRef.current.jump = false;
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  return stateRef;
}
