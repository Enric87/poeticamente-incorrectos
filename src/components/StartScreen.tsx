import { HUD } from "./HUD";
import startScreenFull from "../assets/backgrounds/start_screen_full.jpg";

interface StartScreenProps {
  onPlay: () => void;
  onSelectCharacter: () => void;
}

/**
 * Pantalla de inicio usando la composición completa de referencia.
 * La imagen se renderiza con <img> + object-contain dentro de un
 * contenedor con aspect-ratio fijo (16:9, igual que la imagen original),
 * así los botones superpuestos en % SIEMPRE coinciden con los botones
 * dibujados, sin importar el tamaño real de pantalla.
 */
export function StartScreen({ onPlay, onSelectCharacter }: StartScreenProps) {
  return (
    <div className="relative w-full h-full flex flex-col">
      <HUD credit={0} score={12580} />

      <div className="relative flex-1 flex items-center justify-center bg-[var(--pi-bg)] overflow-hidden">
        <div className="relative w-full aspect-video">
          <img
            src={startScreenFull}
            alt="Poéticamente Incorrectos"
            className="w-full h-full object-contain"
            draggable={false}
          />

          {/* Botón JUGAR — coincide con el botón rojo "JUGAR" dibujado */}
          <button
            onClick={onPlay}
            aria-label="Jugar"
            className="absolute pi-shake-hover"
            style={{ left: "40%", top: "75%", width: "20%", height: "8%" }}
          />

          {/* VER INTRO */}
          <button
            onClick={onPlay}
            aria-label="Ver intro"
            className="absolute hover:opacity-80"
            style={{ left: "27%", top: "84%", width: "13%", height: "6%" }}
          />

          {/* SELECCIONAR PERSONAJE */}
          <button
            onClick={onSelectCharacter}
            aria-label="Seleccionar personaje"
            className="absolute hover:opacity-80"
            style={{ left: "41%", top: "84%", width: "19%", height: "6%" }}
          />

          {/* OPCIONES — deshabilitado en esta v0 */}
          <div
            className="absolute opacity-60 cursor-not-allowed"
            title="Próximamente"
            style={{ left: "62%", top: "84%", width: "13%", height: "6%" }}
          />
        </div>
      </div>
    </div>
  );
}
