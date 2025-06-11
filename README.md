# Toilet Smart AI

This project is a small [Expo](https://expo.dev) application demonstrating a playful toilet paper dispenser controlled by a React Native app. The project was bootstrapped with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app) and uses [file‑based routing](https://docs.expo.dev/router/introduction).

## Prerequisites

- **Node.js** 18 or newer
- **npm** 9 or newer

Install the project dependencies after cloning the repository:

```bash
npm install
```

## Running the application

Start Expo in development mode:

```bash
npx expo start
```

The terminal output includes options to open the app in a development build, Android emulator, iOS simulator or Expo Go.

### Useful scripts

- `npm run android` – start the Android emulator
- `npm run ios` – start the iOS simulator
- `npm run web` – run the web build
- `npm run lint` – run ESLint (requires the Expo CLI)
- `npm run build` – export a static web build
- `npm run reset-project` – move the current `app` directory to `app-example` and create a fresh `app`

## Maintenance

To check TypeScript types without emitting files:

```bash
npx tsc --noEmit
```

Audit dependencies for known vulnerabilities:

```bash
npm audit --omit=dev
```

Running `npm audit fix` will attempt to update packages to patched versions.

## Resetting the starter code

If you want to begin from a blank slate, run:

```bash
npm run reset-project
```

The script moves the existing `app` directory to `app-example` and creates a fresh `app` folder containing a minimal screen.

## Learning resources

- [Expo documentation](https://docs.expo.dev/)
- [Expo guides](https://docs.expo.dev/guides)
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/)

## Community

- [Expo on GitHub](https://github.com/expo/expo)
- [Discord community](https://chat.expo.dev)
