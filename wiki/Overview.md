# Application Overview

Toilet Smart AI is a light‑hearted demonstration of a React Native app that pairs with a fictional BLE toilet paper dispenser. The app features two main screens:

1. **Recording Screen (`app/index.tsx`)** – displays a pulsing sound wave visualizer and a record button. After recording, the user can proceed to the control screen.
2. **Control Screen (`app/control.tsx`)** – performs fake AI analysis of the recorded sounds, recommends the number of sheets and communicates with the simulated dispenser over Bluetooth.

Under the hood the project uses Expo Router for file‑based navigation and React Native Reanimated for animations. The Bluetooth logic is simulated, but the components are structured as if a real BLE connection is present.

### Architecture

Navigation is managed by [Expo Router](https://expo.dev/router) using the `_layout.tsx` entry point in the `app` directory. Each screen is a simple functional component written in TypeScript.

All UI elements live in `components/` and are composed on the two screens:

- **index.tsx** – records audio and transitions to the control screen when done.
- **control.tsx** – orchestrates the AI analysis, dispenser controller and Bluetooth modules.

The Bluetooth workflow is mocked in `BluetoothManager.tsx`, but the code mirrors how a real BLE integration might be organized. Data flows downward through props, keeping the screens themselves lightweight.

The whimsical theme aside, the project demonstrates a typical React Native + Expo code structure with clear separation of screens, components and utilities. You can reuse these patterns in a serious project by swapping out the novelty graphics and placeholder commands.
