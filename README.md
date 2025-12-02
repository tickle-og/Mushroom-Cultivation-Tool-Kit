# Mycoenvy Cultivation Toolbag

Mycoenvy Cultivation Toolbag is a mobile-first Ionic React + TypeScript experience inspired by the Ionic Conference starter. It packages navigation, calculators, reference data, tools, and grow logging into a single offline-friendly PWA shell.

## Highlights
- **Ionic Shell** – Split-pane menu + tab bar wired through `IonReactRouter` with Settings/About stand-alone routes.
- **Calculators** – Substrate sizing, spawn ratio, biological efficiency, and a multi-unit converter backed by reusable utilities.
- **Reference Library** – Searchable TEKs, species, recipes, guides, and conversion notes rendered with segmented controls and Ionic modals.
- **Tools Tab** – Persistent checklist templates and a contamination note pad using localStorage helpers.
- **Logbook** – Add/read/delete journal entries with tag pills plus TEK/species references.
- **Settings** – Theme/unit/default-TEK preferences saved locally; dark mode toggle also lives in the side menu.
- **Data Model** – Seed data for teks, recipes, species, guides, conversions, and calculator logic under `src/data` + `src/utils`.

## Project Structure
```
src/
├── App.tsx                # App shell, menu + tabs routing
├── components/            # Shared UI (menu, tote row, calculators, tools, logbook)
├── pages/                 # IonPage implementations for tabs + settings/about
├── data/                  # TEKs, recipes, species, guides, conversion references
├── utils/                 # Calculations, conversions, logbook/checklist storage, theme helpers
├── theme/variables.css    # Ionic color palette + typography
└── index.css              # Global styling + theming hooks
```

## Getting Started
1. **Install dependencies**
   ```bash
   npm install
   ```
2. **Run in dev mode with HMR**
   ```bash
   npm run dev
   ```
3. **Type-check & bundle**
   ```bash
   npm run build
   ```
4. **Preview production build**
   ```bash
   npm run preview
   ```

## Linting & Quality
This template starts with the default Vite ESLint config. For production apps enable the type-aware presets suggested by the Vite team:

```js
// eslint.config.js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      tseslint.configs.recommendedTypeChecked,
      // or tseslint.configs.strictTypeChecked,
      // optionally tseslint.configs.stylisticTypeChecked,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
])
```

For richer React linting, add [`eslint-plugin-react-x`](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [`eslint-plugin-react-dom`](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom):

```js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      reactX.configs['recommended-typescript'],
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
])
```

## React Compiler
The new React Compiler remains disabled to keep dev/build speeds snappy. If you want to experiment with it, follow the official [installation guide](https://react.dev/learn/react-compiler/installation) and watch for bundle-size impact.

## Styling & Theme
- Global palette: background `#1C1C1C`, primary text `#F5E8D8`, accents `#FF6F61` / `#DAA520`, hover `#FF4500`.
- Dark/light body classes come from `loadSettings()` and menu toggles via `src/utils/theme.ts`.
- Ionic CSS utilities live in `src/theme/variables.css` while bespoke layout polish sits in `src/index.css` and `src/App.css`.

## Deployment Notes
- `npm run build` outputs to `dist/` (ignored by Git).
- The project is PWA-ready (Capacitor deps included) so it can later target iOS/Android with Capacitor CLI.

## Contributing
1. Fork and clone.
2. Run `npm install`.
3. Create a feature branch (`git checkout -b feat/awesome-tool`).
4. Commit using clear messages and open a PR.

Suggestions, teks, checklist ideas, or palette tweaks are welcome—open an issue to start the discussion.
