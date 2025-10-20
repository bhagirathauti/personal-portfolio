<!-- Auto-generated: tailored Copilot instructions for the personal-portfolio repo -->
# Guidance for AI coding agents

This repository is a small React + Vite portfolio site (client-only). Use these notes to be immediately productive.

Key facts
- Stack: React 19, Vite, Tailwind CSS. See `package.json` for dependencies and npm scripts.
- Entry point: `src/main.jsx` -> `src/App.jsx`. Pages are single-file sections under `src/components/` (e.g. `About.jsx`, `Projects.jsx`, `Skills.jsx`).
- Build/dev commands (from `package.json`):
  - `npm run dev` — start Vite dev server with HMR
  - `npm run build` — produce production build
  - `npm run preview` — preview production build locally
  - `npm run lint` — run ESLint across the repo

Project structure and architecture notes
- This is a single-page, client-only site. There is no server code in this repo.
- App composition: `App.jsx` composes the site by rendering each section component in vertical order:
  - `Navbar` (fixed), `About`, `Education`, `Skills`, `Experience`, `Projects`, `Contact`, `Footer`, `ScrollToTop`.
- Patterns you'll see:
  - Components are small, stateful React function components using hooks (e.g. `useState`, `useEffect`, `useRef`).
  - Sections use DOM lookups and window scroll events for animations/visibility (e.g. `document.getElementById`, `window.addEventListener('scroll', ...)`).
  - Styling relies on Tailwind utility classes; some inline style objects are used for dynamic transforms (see `Projects.jsx` cube transforms).

Conventions & pitfalls (follow these exactly)
- File imports use relative paths and expect images to be located next to components (many components reference images like `./aboutimg.png`). When adding or moving images, keep paths relative to the component file.
- Avoid assuming React Router; although `react-router-dom` appears in dependencies, the app currently uses in-page anchors from the navbar to sections. If you introduce client-side routing, update `Navbar` and anchor links consistently.
- Keep `Navbar` fixed at top — components add padding (e.g. `pt-24` in `About.jsx`) to compensate. If you change the navbar height, search for `pt-24`/`id="about"` and adjust offsets.
- Event listeners: many components attach global listeners (scroll, touch). When editing, ensure you properly add/remove them (clean up in effects) to avoid memory leaks.
- Theme styling: When adding new components or modifying styles, always include both light and dark mode variants using Tailwind's `dark:` prefix. Light theme uses grays/whites, dark theme uses blacks/cyans. Example: `text-gray-900 dark:text-white`.

Integration & external dependencies
- Email/contact: `@emailjs/browser` is installed — check `Contact.jsx` for usage if modifying contact form.
- Google Sheets / APIs: `Projects.jsx` mentions Google Sheets integration in a project description only — there is no repo-level API wiring.
- Third-party UI/libraries used: `lucide-react`, `react-icons`, Tailwind. Keep Tailwind classes consistent; do not introduce separate CSS frameworks.
- Theme system: Light/dark theme support via `ThemeContext` (see `src/contexts/ThemeContext.jsx`). Theme state is persisted in localStorage and toggled via button in `Navbar`. All components use Tailwind's `dark:` prefix for dark mode styles.

Testing / linting / debugging
- Linting: run `npm run lint`. The repository uses ESLint with `@eslint/js`; fixable issues can be auto-fixed via editor integrations.
- Debugging: run `npm run dev` and open the browser console. Many components rely on runtime DOM metrics — reproduce scroll/touch events when testing.

Examples to follow when making changes
- Add small interactive features as local component state + effect. Example: `Navbar.jsx` toggles mobile menu with `useState`, and uses `useEffect` to add scroll listener to toggle blur.
- For animations that depend on scroll position, read `Skills.jsx` and `Navbar.jsx` for the exact pattern that checks element position with `getBoundingClientRect()` or `offsetTop`.
- When adding assets referenced by components (e.g. `./aspivisionsolutions.png` in `Projects.jsx`), place them in the same folder as the component or update the import path accordingly.
- Theme integration: Use `useTheme()` hook from `ThemeContext` to access current theme and toggle function. See `Navbar.jsx` for implementation of theme toggle button with sun/moon icons from `lucide-react`.

What NOT to change without confirmation
- Project structure: do not convert this to a multi-page app or change build tooling (Vite) without raising a PR — it's a small personal site.
- Tailwind config/custom classes: modifications may affect visual design across components; prefer adding utility classes in existing components.

Quick tasks you can perform confidently
- Small bug fixes to components (typos, event cleanup, missing React keys). Example: ensure map() lists use `key` props (see `Projects.jsx` and `Skills.jsx`).
- Replace hard-coded images with imports when bundling requires it (import png from './aboutimg.png'; then <img src={png} />).

Files of interest (quick links)
- `package.json` — scripts and deps
- `vite.config.js` — Vite plugins (Tailwind integration)
- `src/App.jsx`, `src/main.jsx` — app bootstrap
- `src/components/*` — individual section components (UI and behaviors)

If something's unclear
- Ask for the intended visual/UX change and whether the user prefers images colocated with components or centralized under `src/assets/`.

Please review these instructions and tell me if you'd like changes or to include extra examples (e.g., exact Contact form wiring or build artifacts).
