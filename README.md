# Steganographix

Steganographix is an application for performing [steganography](https://en.wikipedia.org/wiki/Steganography) on images, text and audio files.

## Notes about developing with Wails

- [Getting started with Wails3](https://v3alpha.wails.io/getting-started/installation/)


### About

This was made with the official Wails React-TS template. More information about the project settings can be found
here: https://wails.io/docs/reference/project-config

### Live Development

To run in live development mode, run:

```bash
npm run dev
```

This will run a Vite development
server that will provide very fast hot reload of your frontend changes, *but you cannot call your Go code from the environment - to do that, resort to the desktop build.*

### Building

[wails build - Documentation](https://v3alpha.wails.io/getting-started/your-first-app/#building-your-application)


To build a the application in production mode:
```bash
npm run build
```

> TODO: build for production

### Packaging

[wails package - Documentation](https://v3alpha.wails.io/getting-started/your-first-app/#packaging-your-application)


To build a redistributable:
```bash
npm run package
```

> To package for Windows, first download the Microsoft Edge WebView2 Bootstrapper:
```bash
wget -O build/windows/nsis/MicrosoftEdgeWebview2Setup.exe https://go.microsoft.com/fwlink/p/?LinkId=2124703
```

## TODO

- use npm workspace for frontend directory?
- GitHub Action / CI for testing and packaging
- testing (vitest / go test)
- better styling