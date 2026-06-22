import { HUD } from "./HUD";
import startScreenFull from "../assets/backgrounds/start_screen_full.jpg";

interface StartScreenProps {
  onPlay: () => void;
  onSelectCharacter: () => void;
}

/**
 * Pantalla de inicio usando la composición completa de referencia
 * (los 4 miembros de la banda, logo, carteles, todo ilustrado en una
 * sola imagen). Los botones reales son zonas invisibles superpuestas
 * exactamente sobre los botones ya dibujados en la imagen.
 */
export function StartScreen({ onPlay, onSelectCharacter }: StartScreenProps) {
  return (
    <div className="relative w-full h-full flex flex-col">
      <HUD credit={0} score={12580} />

      <div
        className="relative flex-1 bg-cover bg-top"
        style={{ backgroundImage: `url(${startScreenFull})` }}
      >
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
  );
}
