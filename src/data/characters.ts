// Datos mock de los personajes jugables.
// En esta v0 solo Adri es jugable; el resto queda como placeholder
// "Próximamente" para no bloquear el flujo cuando se añadan.

import toniPortrait from "../assets/sprites/toni_portrait.png";
import srPerezPortrait from "../assets/sprites/sr_perez_portrait.png";
import eduPortrait from "../assets/sprites/edu_portrait.png";

export interface Character {
  id: string;
  name: string;
  role: string;
  weapon: string;
  special: string;
  color: string; // color de acento para su tarjeta / efectos
  playable: boolean;
  portrait?: string; // retrato estático (solo personajes no jugables aún)
}

export const characters: Character[] = [
  {
    id: "adri",
    name: "Adri",
    role: "Cantante y guitarrista",
    weapon: "Ondas de voz",
    special: "Grito sónico",
    color: "var(--pi-orange)",
    playable: true,
  },
  {
    id: "toni",
    name: "Toni",
    role: "Guitarrista",
    weapon: "Rayos eléctricos",
    special: "Solo eléctrico",
    color: "var(--pi-teal)",
    playable: false,
    portrait: toniPortrait,
  },
  {
    id: "sr-perez",
    name: "Sr. Pérez",
    role: "Bajista",
    weapon: "Bajas frecuencias",
    special: "Onda expansiva",
    color: "var(--pi-red)",
    playable: false,
    portrait: srPerezPortrait,
  },
  {
    id: "edu",
    name: "Edu",
    role: "Batería",
    weapon: "Bombas sonoras",
    special: "Lluvia de baquetas",
    color: "var(--pi-cream)",
    playable: false,
    portrait: eduPortrait,
  },
];
