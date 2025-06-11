import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';

interface BluetoothManagerProps {
  onDeviceConnected: (connected: boolean) => void;
  onDispenseCommand: (sheets: number) => void;
  sheetsToDispense: number;
}

export default function BluetoothManager({ 
  onDeviceConnected, 
  onDispenseCommand, 
  sheetsToDispense 
}: BluetoothManagerProps) {
  const [isConnected, setIsConnected] = useState(false);
  const [deviceName, setDeviceName] = useState('');
  const [connectionStatus, setConnectionStatus] = useState('Searching...');

  useEffect(() => {
    // Simulate Bluetooth connection
    const connectTimeout = setTimeout(() => {
      setIsConnected(true);
      setDeviceName('TP-Dispenser-Pro');
      setConnectionStatus('Connected');
      onDeviceConnected(true);
    }, 3000);

    return () => clearTimeout(connectTimeout);
  }, []);

  useEffect(() => {
    if (isConnected && sheetsToDispense > 0) {
      // Send dispense command to Bluetooth device
      sendDispenseCommand(sheetsToDispense);
    }
  }, [isConnected, sheetsToDispense]);

  const sendDispenseCommand = async (sheets: number) => {
    try {
      // Simulate sending Bluetooth command
      console.log(`Sending BLE command: DISPENSE_${sheets}_SHEETS`);
      onDispenseCommand(sheets);
      
      // In real implementation, this would be:
      // await BluetoothSerial.write(`DISPENSE:${sheets}\n`);
    } catch (error) {
      Alert.alert('Bluetooth Error', 'Failed to send dispense command');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.statusContainer}>
        <View style={[styles.indicator, { backgroundColor: isConnected ? '#8B4513' : '#CD853F' }]} />
        <Text style={styles.statusText}>
          📶 {connectionStatus}
        </Text>
      </View>
      {deviceName && (
        <Text style={styles.deviceText}>
          🔗 {deviceName}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(139,69,19,0.3)',
    borderRadius: 12,
    padding: 15,
    marginVertical: 10,
    width: '100%',
    borderWidth: 1,
    borderColor: '#A0522D',
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  indicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 10,
  },
  statusText: {
    color: '#F5DEB3',
    fontSize: 16,
    fontWeight: '600',
  },
  deviceText: {
    color: '#DEB887',
    fontSize: 14,
    marginLeft: 22,
  },
});