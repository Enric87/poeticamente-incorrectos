// Datos mock de los personajes jugables.
// En esta v0 solo Adri es jugable; el resto queda como placeholder
// "Próximamente" para no bloquear el flujo cuando se añadan.

export interface Character {
  id: string;
  name: string;
  role: string;
  weapon: string;
  special: string;
  color: string; // color de acento para su tarjeta / efectos
  playable: boolean;
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
  },
  {
    id: "sr-perez",
    name: "Sr. Pérez",
    role: "Bajista",
    weapon: "Bajas frecuencias",
    special: "Onda expansiva",
    color: "var(--pi-red)",
    playable: false,
  },
  {
    id: "edu",
    name: "Edu",
    role: "Batería",
    weapon: "Bombas sonoras",
    special: "Lluvia de baquetas",
    color: "var(--pi-cream)",
    playable: false,
  },
];
