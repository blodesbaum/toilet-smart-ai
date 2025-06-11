# Component Reference

This section outlines the custom React Native components found in the `components` directory.

## AIAnalyzer
File: `components/AIAnalyzer.tsx`

Renders an animated spinner that simulates AI analysis. It displays the latest analysis result once complete. Accepts `isAnalyzing` and `analysisResult` props.

## BluetoothManager
File: `components/BluetoothManager.tsx`

Handles connection status and dispatches commands to the BLE device. In this demo it merely simulates a connection and logs commands. It exposes callbacks for connection state and dispense events.

## BluetoothProtocol
File: `components/BluetoothProtocol.tsx`

Lists available BLE protocol commands and provides quick calibration or test buttons. Useful when integrating with real hardware. The command list is static but illustrates a simple way to show protocol docs in-app.

## DispenserController
File: `components/DispenserController.tsx`

Manages dispensing progress and animates a motor gear while sheets are dispensed. Shows current sheet count and motor status. When the progress completes it triggers a callback to update the parent screen.

## RecordButton
File: `components/RecordButton.tsx`

An animated button that toggles recording. Uses spring animations for a tactile feel and displays an emoji-based label.

## SoundWaveVisualizer
File: `components/SoundWaveVisualizer.tsx`

Creates concentric animated circles that pulse with the microphone amplitude during recording. The `amplitude` prop influences the scale of the waves.

## TPDispenser
File: `components/TPDispenser.tsx`

Displays a simple toilet paper dispenser graphic. As dispensing occurs, the sheet height animates to visualize the amount being dispensed. This is purely visual – no actual toilet paper is wasted.
