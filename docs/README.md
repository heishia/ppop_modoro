# Ppop Modoro Documentation

## Overview

Ppop Modoro is a Pomodoro technique timer desktop application designed with a cute and minimal aesthetic.

## Technology Stack

| Component | Technology |
|-----------|------------|
| Framework | Electron |
| UI | React + TypeScript |
| Build | Vite |
| Packaging | electron-builder |

## Project Structure

```
apps/desktop/
  src/
    main/
      index.ts          # Electron main process
    preload/
      index.ts          # Preload script for IPC
    renderer/
      App.tsx           # Main React component
      components/
        Timer.tsx       # Circular timer display
        Controls.tsx    # Start/Pause/Reset buttons
        Settings.tsx    # Duration settings
      hooks/
        useTimer.ts     # Timer logic hook
        useSound.ts     # Sound playback hook
      types/
        timer.ts        # TypeScript types
      styles/
        global.css      # Global styles
        *.module.css    # Component styles
```

## Features

### Timer
- Circular progress indicator
- Focus mode: 25 / 45 / 60 minutes
- Break mode: 5 / 10 / 15 minutes
- Auto-cycle between modes

### Notifications
- Desktop notifications via Electron Notification API
- Window pops to foreground on timer end
- Notification sound

### UI/UX
- Pastel color scheme
- Focus mode: Pink/Red theme
- Break mode: Green theme
- Smooth transitions

## Development

### Prerequisites
- Node.js 20+
- npm

### Setup
```bash
npm run install:desktop
```

### Development Mode
```bash
npm run dev
```

### Build
```bash
npm run build:win   # Windows exe
npm run build:mac   # macOS dmg
```

## CI/CD

GitHub Actions workflow triggers on tag push:
1. Builds Windows and macOS versions
2. Creates GitHub Release with artifacts

### Release Process
```bash
npm run version:patch
git push origin main
git push --tags
```
