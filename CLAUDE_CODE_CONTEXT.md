# Contexto del proyecto — Poéticamente Incorrectos: The Video Game

Quiero que leas este contexto antes de tocar nada, para que sepas exactamente
dónde está el proyecto y cómo seguir trabajando en él.

## Qué es esto

Demo interactiva tipo intro de arcade para una banda de punk rock real
llamada "Poéticamente Incorrectos". No es el videojuego completo, es una v0
promocional para usar en redes/conciertos. Más adelante, si gusta, se ampliará
a juego completo con más niveles y enemigos.

Repo: https://github.com/Enric87/poeticamente-incorrectos
Desplegado en: https://poeticamente-incorrectos.vercel.app (autodeploy en cada
push a `main` vía Vercel — no hay que hacer nada manual para desplegar).

## Stack

React + TypeScript + Tailwind CSS + Vite. Sin librerías pesadas. Componentes
en `src/components/`, datos mock en `src/data/`, hooks en `src/hooks/`,
assets (sprites, fondos) en `src/assets/`.

## Los 4 miembros de la banda (personas reales)

- **Adri** — cantante y guitarrista. Único personaje jugable por ahora.
- **Toni** — guitarrista.
- **Sr. Pérez** — bajista.
- **Edu** — batería.

Sus retratos reales (ilustrados en pixel-art 16-bit) están en
`src/assets/sprites/*_portrait.png`. Adri tiene un spritesheet completo
animado (idle, run, jump, shout, hit, pose) extraído y recortado en
`src/assets/sprites/adri_*.png`, organizado en `src/data/adriSprites.ts`.

## Flujo actual de pantallas (en `src/App.tsx`)

```
start → (Jugar) → intro → levelSelect → level
start → (Seleccionar personaje) → select → intro → levelSelect → level
```

1. **StartScreen** — usa una ilustración completa de referencia
   (`src/assets/backgrounds/start_screen_full.jpg`) con los 4 miembros de la
   banda ya dibujados en posición. Los botones (JUGAR, VER INTRO, SELECCIONAR
   PERSONAJE, OPCIONES) son `<button>` invisibles superpuestos en posiciones
   exactas en % sobre los botones ya dibujados en la imagen. **Importante**:
   la imagen está dentro de un contenedor con `aspect-video` fijo — si rompes
   ese aspect-ratio, los botones invisibles dejan de coincidir con los
   dibujados. Si tocas este componente, verifica las coordenadas en
   `style={{ left: "...", top: "...", width: "...", height: "..." }}`.

2. **CharacterSelect** — Adri jugable (animado de verdad), Toni/Sr. Pérez/Edu
   bloqueados con su retrato real en gris + "PRÓXIMAMENTE".

3. **IntroSequence** — texto narrativo línea a línea, luego la banda entrando
   en escena + camión enemigo escapando. Corta, sin recortes de imagen raros
   (ya quitamos una fase que se veía mal).

4. **LevelSelect** — pantalla "SELECCIONA PUEBLO": Navata (jugable, con
   miniatura real `navata_level_card.jpg` que ya trae su propio texto
   incrustado — NO le añadas un `<span>` de nombre encima, queda duplicado),
   Terrades/Cabanelles/Figueres bloqueados. Aquí vive la descripción del
   nivel, objetivo y mini-jefe (texto que se sacó del nivel jugable para no
   recortar la vista del juego).

5. **LevelPreview** (Nivel 1 — Navata) — la calle ocupa toda la pantalla, sin
   cajas de texto que la corten. Control real con teclado:
   - Flechas / WASD para mover, espacio o arriba para saltar
   - `useKeyboardControls.ts` mantiene el estado en un ref (no re-renderiza
     por tecla)
   - El movimiento corre en un loop de `requestAnimationFrame` dentro de
     `LevelPreview.tsx`, no hay física real, es una parábola simple con
     `Math.sin` para el salto
   - Constantes ajustables arriba del archivo: `MOVE_SPEED`, `JUMP_HEIGHT`,
     `JUMP_DURATION`, `MIN_X`/`MAX_X` (límites de pantalla)
   - Todavía NO hay enemigos, ni cámara que siga al personaje (es una sola
     pantalla estática), ni disparo/ataque real

## Decisiones de diseño ya tomadas (no las deshagas sin que te lo pidan)

- Paleta: negro cálido de fondo, naranja atardecer, crema, teal (del logo
  punk), rojo. Variables CSS en `src/index.css` (`--pi-bg`, `--pi-orange`,
  etc.) — usa siempre estas variables, no colores sueltos.
- Tipografía: `Press Start 2P` para HUD/pixel (`font-pixel`), `Oswald` para
  texto normal (`font-punk`). Cargadas desde Google Fonts en `index.html`.
- Efecto CRT (scanlines + viñeta) en el marco exterior — clase `.crt-screen`
  en `index.css`, aplicada en `App.tsx`. No lo quites, es la firma visual.
- Los fondos de Navata son fotos/ilustraciones reales del pueblo (atardecer,
  fachadas, pintadas punk), no CSS. Hay 3 variantes en
  `src/assets/backgrounds/navata_bg_1/2/3.jpg` — actualmente usadas en
  distintas pantallas, intercambiables si conviene.
- Todo el texto de la interfaz está en español.

## Errores ya cometidos y corregidos (para no repetirlos)

- Usar `bg-cover` en un contenedor sin aspect-ratio fijo rompe la alineación
  de cualquier botón invisible superpuesto en % — siempre fijar aspect-ratio
  primero.
- Poner texto duplicado sobre imágenes que ya traen su propio texto quemado
  (pasó con la tarjeta de Navata) — revisa la imagen antes de añadir un
  `<span>` encima.
- Texto con opacidad baja (`/70`, `/60`) sobre fondos semitransparentes queda
  ilegible — para texto importante usa color sólido y fondo casi opaco.
- El personaje controlable necesita margen vertical real respecto a cualquier
  HUD/control fijo en la esquina inferior, o se solapan visualmente en
  pantallas anchas.

## Cómo seguir trabajando

```bash
npm install
npm run dev      # servidor local en http://localhost:5173
npm run build    # build de producción, úsalo para detectar errores antes de
                  # hacer commit
```

Antes de cualquier commit, corre `npx tsc --noEmit` y `npm run build` para
verificar que no hay errores de tipos ni de build. El push a `main` despliega
solo en Vercel, no hace falta nada extra.

## Asuntos pendientes / próximos pasos posibles

- Añadir enemigos placeholder en el Nivel 1 (poli antirruido, vecino gruñón —
  ver concept art si está disponible en el repo de assets originales)
- Sustituir el emoji 🚚 del camión en la intro por un sprite real
- Hacer jugables a Toni, Sr. Pérez y Edu (mismo patrón que `AdriSprite.tsx` +
  `adriSprites.ts`, pero faltan sus spritesheets animados — de momento solo
  tienen un retrato estático)
- Sistema de ataque/disparo real para Adri (grito sónico) — ya existe el
  sprite de animación `shout`, falta la lógica de gameplay
- Cámara que siga al personaje en vez de pantalla estática, si el nivel crece
  más allá del ancho visible actual
