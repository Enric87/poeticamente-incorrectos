// Datos mock de los niveles. Solo Navata está desarrollado en esta v0.

export interface LevelData {
  id: string;
  number: number;
  name: string;
  tagline: string;
  description: string;
  objective: string;
  miniBoss: string;
}

export const levels: LevelData[] = [
  {
    id: "navata",
    number: 1,
    name: "Navata",
    tagline: "Que empiece el ruido",
    description:
      "Calles de Navata al atardecer. Fachadas de pueblo, carteles punk, cables eléctricos y un bar cerrado a cal y canto.",
    objective: "Recuperar el primer amplificador robado.",
    miniBoss: "El Guardia del Silencio",
  },
];

export const introLines: string[] = [
  "Los Correctos Supremos han robado los instrumentos.",
  "Quieren prohibir la música, la cerveza y la diversión.",
  "Pero la banda no piensa quedarse callada.",
  "Solo hay una forma de recuperarlos…",
  "Hacer más ruido.",
];
