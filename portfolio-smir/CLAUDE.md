# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

```bash
# Start development server with HMR
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint codebase
npm run lint
```

## Architecture Overview

This is a **dual-experience portfolio** combining:
1. **Classic Portfolio** (`/`) - Traditional web page with sections
2. **Interactive 3D Scene** (`/lunar`, `/scene`) - Three.js lunar exploration with quiz stations

### Tech Stack
- **React 19.1.1** with React Router 6.30.2
- **Three.js 0.180.0** + React Three Fiber 9.4.0 + Drei 10.7.7
- **Vite 5.4.10** (build tool with custom chunking)
- **Tailwind CSS 3.4.18** + centralized theme system
- **Framer Motion 12.23.12** for animations

### Key Directory Structure

```
src/
├── scene/              # Entry points for 3D experience
│   ├── Landing.jsx     # Animated rocket launch sequence
│   └── MoonScene.jsx   # Main Canvas wrapper
│
├── scenes/             # 40+ Three.js components
│   ├── core/           # Scene.jsx (main orchestrator), PlayerRig.jsx
│   ├── terrain/        # Moon.jsx, Rocks.jsx, surface elements
│   ├── stations/       # 5 quiz stations on lunar surface
│   ├── actors/         # Astronaut.jsx, Dust.jsx, Walkers.jsx
│   ├── cities/         # Lunar bases and decorative elements
│   └── sky/            # Space ambiance (lazy-loaded)
│
├── pages/              # React portfolio pages
│   ├── ClassicPortfolio.jsx
│   ├── *QuizStation.jsx (5 quiz pages)
│   └── sections/       # 9 portfolio sections
│
├── components/         # Reusable UI components
│   ├── StarfieldBackdrop.jsx
│   ├── CodeFlipCard.jsx
│   └── stations/       # Quiz data and shared components
│
├── hooks/              # 8 custom hooks
│   ├── useInput.js                 # Keyboard state
│   ├── useInputInertia.js          # Camera momentum
│   ├── useStationAiming.js         # Rotation alignment to stations
│   └── useStationEvents.js         # Station focus/open logic
│
├── state/
│   └── settings.jsx    # Context API for user preferences
│
├── styles/
│   └── theme.js        # Centralized design tokens (COLORS, GRADIENTS, etc.)
│
└── constants/
    └── space.js        # Physics constants (gravity, speeds, particle counts)
```

## Core Architectural Patterns

### 1. Ref-Based Physics State (Performance Critical)

The 3D scene uses **refs instead of state** for frame-by-frame physics to avoid re-renders:

```jsx
// In Scene.jsx and related components
const qWorldRef = useRef(new THREE.Quaternion());
const zoomRef = useRef(0.25);
const vxRef = useRef(0); // velocities

// Updated in useFrame (60fps loop) without triggering re-renders
useFrame(() => {
  qWorldRef.current.slerp(targetQ, delta * 3);
  // No setState calls in the render loop
});
```

**Important**: When working with 3D physics or animations, always use refs for values that change every frame.

### 2. Context API for Settings

Global user preferences managed via Context + localStorage:

```jsx
// state/settings.jsx
const { quality, reduceMotion, language } = useSettings();
// Auto-persisted to localStorage
```

Available settings:
- `quality`: "auto" | "high" | "low"
- `reduceMotion`: boolean (accessibility)
- `highContrast`: boolean
- `presentation`: boolean (slideshow mode)
- `language`: "fr" | ...

### 3. Custom Event System for Cross-Layer Communication

The portfolio uses custom events to communicate between the React page layer and Three.js scene layer:

```jsx
// TopNav.jsx dispatches events
window.dispatchEvent(new CustomEvent("saga-focus-station", { detail: { id } }));

// Scene.jsx listens via useStationEvents hook
useEffect(() => {
  const handler = (e) => { /* handle event */ };
  window.addEventListener("saga-focus-station", handler);
  return () => window.removeEventListener("saga-focus-station", handler);
}, []);
```

**Pattern**: Use custom events for imperative scene control from React components.

### 4. Lazy Loading for Performance

Large 3D components are lazy-loaded with React Suspense:

```jsx
const AsteroidBelt = lazy(() => import("@/scenes/belt/AsteroidBelt"));

// In Scene.jsx
<Suspense fallback={null}>
  <AsteroidBelt />
  <Satellites />
</Suspense>
```

**Rule**: Lazy-load decorative/far-field 3D elements to improve initial load time.

### 5. Composition via Custom Hooks

Complex behaviors are composed through custom hooks in `Scene.jsx`:

```jsx
const input = useInput();
const { vxRef, vyRef } = useInputInertia(input);
const { alt, bursts } = useJumpAndDust(BASE_RADIUS, qWorldRef);
const { aimToStation } = useStationAiming({ STATIONS, qWorldRef });
```

Each hook handles one concern (input, inertia, jumping, station targeting).

## Three.js Scene Configuration

### Canvas Setup (MoonScene.jsx)

```jsx
<Canvas
  dpr={[1, 1.75]}          // 1x mobile, up to 1.75x desktop
  gl={{
    antialias: true,
    powerPreference: "high-performance",
    outputColorSpace: THREE.SRGBColorSpace,
    toneMapping: THREE.ACESFilmicToneMapping
  }}
  camera={{ position: [0, 2.2, BASE_RADIUS*3.2], fov: 42, far: 1000 }}
/>
```

### Physics Constants (constants/space.js)

| Constant | Value | Purpose |
|----------|-------|---------|
| `BASE_RADIUS` | 9.0 | Moon sphere radius |
| `ACCEL` | 2.6 rad/s² | Keyboard rotation acceleration |
| `MAX_SPEED` | 2.1 rad/s | Max rotation velocity |
| `JUMP_V` | 1.12 m/s | Jump initial velocity |
| `GRAV` | 1.5 m/s² | Gravity acceleration |
| `HOLO_ON` | 0.20 rad | Station hologram activation distance |
| `ENTER_OPEN` | 0.35 rad | Station enter threshold (~20°) |

**Environment-aware particle counts**:
- `ROCK_COUNT`, `SURF_PARTICLES`, `BELT_PARTS` use lower counts in dev mode
- Check `import.meta.env.DEV` for environment

### Input Handling

| Input | Effect |
|-------|--------|
| WASD / Arrow Keys | Rotate world (yaw/pitch via quaternions) |
| Space | Jump (altitude physics) |
| Shift | Sprint mode (increases rotation speed) |
| Mouse Drag | Orbital camera rotation with inertia |
| Scroll | Zoom in/out |

## Design System (styles/theme.js)

**Centralized theming** - always import from `theme.js`:

```jsx
import { COLORS, GRADIENTS, SPACING, FONT_SIZES } from '@/styles/theme';

// Use design tokens, not hardcoded values
background: COLORS.bg.primary;
padding: SPACING.md;
fontSize: FONT_SIZES.xl;
```

### Key Theme Elements

- **Golden Ratio Spacing**: All spacing uses PHI (1.618) for harmonious proportions
- **Brand Colors**: cyan (#22d3ee), purple (#a855f7), gold (#d4af37)
- **Fluid Typography**: Uses `clamp()` for responsive font sizes
- **Z-Index Hierarchy**: Predefined layers (content: 10, header: 100, modal: 120)

### Glassmorphism Pattern

Reused throughout UI:

```css
background: linear-gradient(135deg, rgba(96,165,250,0.2), rgba(59,130,246,0.2));
border: 2px solid rgba(96,165,250,0.5);
backdrop-filter: blur(10px);
box-shadow: 0 8px 32px rgba(96,165,250,0.2);
```

## Routing and Navigation

### Route Structure

```
/ → ClassicPortfolio (index)
/lunar → Landing (3D launch animation)
/scene → MoonScene (direct scene entry)
/quiz-javascript, /quiz-python, /quiz-sql, /quiz-docker, /quiz-php
```

### Layer System

The app uses a **dual-layer architecture** (see `App.jsx`):

1. **scene-layer** (z-index: 50) - Fixed position Canvas, toggles pointer-events
2. **page-layer** (z-index: auto) - React Router Outlet for portfolio/quiz pages

When on `/`, the portfolio is visible with scene in background (read-only).
When on `/lunar` or `/scene`, the 3D scene takes full interaction focus.

## Development Best Practices

### Working with Three.js Components

1. **Always dispose geometries and materials** in useEffect cleanup:
   ```jsx
   useEffect(() => {
     const geo = new THREE.SphereGeometry();
     const mat = new THREE.MeshStandardMaterial();
     return () => {
       geo.dispose();
       mat.dispose();
     };
   }, []);
   ```

2. **Use useMemo for Three.js objects** to prevent recreation:
   ```jsx
   const targetPos = useMemo(() => new THREE.Vector3(), []);
   ```

3. **Avoid state updates in useFrame** - use refs for performance-critical values

### Code Style

- **ESLint Rule**: Unused variables starting with uppercase or underscore are ignored (`varsIgnorePattern: '^[A-Z_]'`)
- **Imports**: Use `@/` alias for src imports (configured in vite.config.js)
- **Comments**: French comments are common in this codebase

### Performance Considerations

- Vite manual chunks prevent MoonScene from being split (see vite.config.js)
- Shadows disabled globally for performance
- DPR capped at 1.75x even on high-DPI displays
- Lazy-load far-field 3D elements (asteroids, nebulae, etc.)

## State Management Summary

| Data Type | Storage | Access Pattern |
|-----------|---------|----------------|
| User Settings | Context + localStorage | `useSettings()` hook |
| Physics/Camera | Refs in Scene | Direct ref access in useFrame |
| Input State | useState in useInput | Hook return values |
| Station Focus | Refs + Events | Custom event system |
| Quiz Progress | localStorage | Per-quiz component state |

**No Redux/Zustand** - architecture intentionally uses minimal state management.

## Common Tasks

### Adding a New Portfolio Section

1. Create component in `src/pages/sections/YourSection.jsx`
2. Import and add to `ClassicPortfolio.jsx` sections array
3. Use theme tokens from `@/styles/theme`

### Adding a New 3D Element

1. Create component in appropriate `src/scenes/` subdirectory
2. Import in `Scene.jsx` or relevant parent
3. If decorative/heavy, wrap with `lazy()` and `<Suspense>`
4. Remember to dispose Three.js resources in cleanup

### Modifying Physics

1. Update constants in `src/constants/space.js`
2. Physics loop runs in `Scene.jsx` useFrame
3. Test with both keyboard and mouse input

### Adding a New Route

1. Define route in `App.jsx` router
2. Consider if scene-layer should be interactive or read-only
3. Update TopNav if navigation link needed
