# Steganographix

Steganographix is an application for performing [steganography](https://en.wikipedia.org/wiki/Steganography) on images and audio files.

## Notes about developing with Wails

This repo was set up with the [official Wails (v3) React-Typescript template](https://v3alpha.wails.io/getting-started/your-first-app/#creating-a-new-project).

The frontend of the app is currently set up with [Vite](https://vite.dev/guide/) and [React](https://react.dev/) with [Typescript](https://www.typescriptlang.org/), and [Tailwind](https://tailwindcss.com/) for styling.

## Requirements:

- node v24
- npm v11
- go v1.24

> For additional dependencies required per platform, read more [here](https://v3alpha.wails.io/getting-started/installation/#dependencies).

## Development

First, install dependencies:
```bash
npm install
```

To run in live development mode, run:

```bash
npm run dev
```

The `npm run dev` will run a Vite development
server that will provide very fast hot reload of your frontend changes, *but you cannot call your Go code from the environment - to do that, resort to the desktop build.*

## Taskfiles

The [Taskfiles](https://taskfile.dev/) required for Wails development also make sure the dependencies required for the frontend application in the `frontend` directory are installed before building. There's a main Taskfile at the root of the project, on at `build/Taksfile.yml` and one per platform in the `build/<platform>` directories.

These Taskfiles describe all the scripts required for compiling, building, packaging, installing, etc.

## Building a `.exe` for Windows

[wails build - Documentation](https://v3alpha.wails.io/getting-started/your-first-app/#building-your-application)

To build a the application in production mode:
```bash
npm run build:windows
```

## Todo

- use npm workspace for frontend directory?
- testing (vitest / go test)
- GitHub Action / CI for test/build/packaging
- better styling
