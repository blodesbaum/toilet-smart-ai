# Setup

This project requires **Node.js 18+** and **npm 9+**.

After cloning the repository, install dependencies and start Expo:

```bash
npm install
npx expo start
```

The Expo CLI offers options to run on Android, iOS or the web. Useful scripts include:

- `npm run android` – start the Android emulator
- `npm run ios` – start the iOS simulator
- `npm run web` – run the web build
- `npm run lint` – run ESLint (requires the Expo CLI)
- `npm run build` – export a static web build
- `npm run reset-project` – move the current `app` directory to `app-example` and create a minimal template

You can also run `npx tsc --noEmit` at any time to perform a type check without building files.

If `npm run lint` fails with an Expo configuration error, ensure the `eslint-config-expo` package is installed by running `npm install --save-dev eslint-config-expo`.

When debugging mobile connectivity issues you may need to clear Expo's cache with `npx expo start -c`.

