# Bluetooth Protocol

The project includes a small BLE protocol layer. The commands are displayed in the `BluetoothProtocol` component and are intended for a hypothetical TP‑Dispenser device.

Supported commands:

- `DISPENSE:{sheets}` – dispense a specific number of sheets.
- `CALIBRATE_DISPENSER` – calibrate the motor and sensors.
- `GET_STATUS` – query the current status of the dispenser.
- `RESET_MOTOR` – reset any motor fault conditions.
- `TEST_DISPENSE:{count}` – run a short test dispensing sequence.

In this codebase the commands are logged to the console. When integrating with real hardware you would transmit these strings over BLE.

### Example sequence

1. `CALIBRATE_DISPENSER` – run once when first connecting to level sensors.
2. `DISPENSE:3` – dispense three sheets.
3. `GET_STATUS` – confirm the motor state.

Each command is a plain UTF‑8 string terminated with a newline character. A real implementation might send these over a characteristic write or a serial port. The project keeps things simple by printing them to the console.
