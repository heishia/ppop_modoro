# Ppop Modoro

A cute Pomodoro timer desktop application built with Electron and React.

## Features

- Focus time options: 25min / 45min (default) / 60min
- Break time options: 5min / 10min / 15min (default)
- Desktop notifications with sound
- Auto-cycling between focus and break sessions
- Minimal and adorable UI design

## Quick Start

```bash
npm install
npm run dev
```

## Build

### Windows
```bash
npm run build:win
```

### macOS
```bash
npm run build:mac
```

## Release

```bash
npm run version:patch
git push origin main
git push --tags
```

## Architecture

```
apps/
  desktop/          # Electron + React desktop app
    src/
      main/         # Electron main process
      renderer/     # React UI
      preload/      # Preload scripts
```

## Documentation

See [docs/README.md](docs/README.md) for detailed documentation.
