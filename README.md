# Poéticamente Incorrectos — The Video Game (v0)

Demo interactiva tipo intro de arcade para la banda Poéticamente Incorrectos.
Esta v0 incluye solo a **Adri** como personaje jugable; el resto del grupo
(Toni, Sr. Pérez, Edu) aparece como "Próximamente" en la selección de personaje.

## Cómo arrancarlo

```bash
npm install
npm run dev
```

Abre el enlace que te da Vite (normalmente http://localhost:5173).

## Flujo de la demo

1. **Pantalla de inicio** — logo, HUD arcade, botón JUGAR.
2. **Seleccionar personaje** — Adri jugable, resto bloqueados.
3. **Intro narrativa** — texto secuencial + entrada de Adri + camión enemigo escapando.
4. **Nivel 1 — Navata** — escenario conceptual con Adri caminando, sin enemigos todavía.
5. Pantalla "Próximamente" con botón para volver al inicio.

## Estructura

```
src/
  App.tsx                  → orquesta las pantallas (inicio/select/intro/nivel)
  components/
    StartScreen.tsx
    CharacterSelect.tsx
    IntroSequence.tsx
    LevelPreview.tsx
    HUD.tsx
    ArcadeButton.tsx
    CharacterCard.tsx
    AdriSprite.tsx          → placeholder ilustrado de Adri (SVG + CSS idle bob)
  data/
    characters.ts
    levels.ts
```

## Próximos pasos sugeridos

- Sustituir `AdriSprite.tsx` por sprites reales (spritesheet) cuando estén listos.
- Añadir Toni, Sr. Pérez y Edu siguiendo el mismo patrón de `AdriSprite`.
- Añadir enemigos placeholder en `LevelPreview.tsx` (poli antirruido, vecino gruñón).
- Pasar de preview estático a gameplay real (movimiento, colisiones, disparo).
