# Task Manager (React + Vite)

A modern task manager with:
- drag-and-drop reordering
- task filtering (all/completed/pending)
- smooth animations and deletion transitions
- dark/light mode
- local storage persistence

## Tech Stack
- React 18
- Vite 8
- react-beautiful-dnd
- ESLint

## Local Development
```bash
npm install
npm run dev
```

## Production Build
```bash
npm run build
npm run preview
```

Build output is generated in `dist/`.

## Deploy to Netlify

This project is ready for direct Netlify deployment.

### Option 1: Deploy from GitHub
1. Push this repository to GitHub.
2. In Netlify: **Add new site** → **Import an existing project**.
3. Select your GitHub repository.
4. Netlify will auto-detect settings from `netlify.toml`.

### Option 2: Drag-and-drop deploy
1. Run:
   ```bash
   npm run build
   ```
2. Drag the generated `dist/` folder into Netlify Drop.

## Netlify Build Settings (already configured)
- Build command: `npm run build`
- Publish directory: `dist`
- SPA redirect: all routes redirect to `/index.html`
