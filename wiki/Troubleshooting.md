# Troubleshooting

This page collects a few common gotchas when running the demo.

## Linting errors
If `npm run lint` complains that it cannot find the `expo` config, make sure you have the `eslint-config-expo` package installed:

```bash
npm install --save-dev eslint-config-expo
```

## Expo fails to start
Sometimes the Expo bundler gets into a bad state. Restart with cache clearing:

```bash
npx expo start -c
```

## "Device not connected" messages
The Bluetooth implementation in this repo is simulated. If the app shows that no device is connected, it's working as expected. Real hardware support would require implementing the command transport in `BluetoothManager.tsx`.
