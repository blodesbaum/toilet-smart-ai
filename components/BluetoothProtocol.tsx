import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

interface BluetoothProtocolProps {
  isConnected: boolean;
  onSendCommand: (command: string) => void;
}

export default function BluetoothProtocol({ isConnected, onSendCommand }: BluetoothProtocolProps) {
  const [lastCommand, setLastCommand] = useState('');
  const [commandHistory, setCommandHistory] = useState<string[]>([]);

  const sendCalibrationCommand = () => {
    const command = 'CALIBRATE_DISPENSER';
    setLastCommand(command);
    setCommandHistory(prev => [...prev.slice(-2), command]);
    onSendCommand(command);
  };

  const sendTestCommand = () => {
    const command = 'TEST_DISPENSE:1';
    setLastCommand(command);
    setCommandHistory(prev => [...prev.slice(-2), command]);
    onSendCommand(command);
  };

  const protocolCommands = [
    'DISPENSE:{sheets}',
    'CALIBRATE_DISPENSER', 
    'GET_STATUS',
    'RESET_MOTOR',
    'TEST_DISPENSE:{count}'
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📡 BLE Protocol</Text>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Available Commands:</Text>
        {protocolCommands.map((cmd, index) => (
          <Text key={index} style={styles.commandText}>
            • {cmd}
          </Text>
        ))}
      </View>

      {isConnected && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions:</Text>
          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.actionButton} onPress={sendCalibrationCommand}>
              <Text style={styles.buttonText}>Calibrate</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton} onPress={sendTestCommand}>
              <Text style={styles.buttonText}>Test</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {lastCommand && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Last Command:</Text>
          <Text style={styles.lastCommand}>{lastCommand}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 12,
    padding: 15,
    marginVertical: 10,
    width: '100%',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 15,
  },
  section: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.9)',
    marginBottom: 8,
  },
  commandText: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.7)',
    fontFamily: 'monospace',
    marginBottom: 2,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  actionButton: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  lastCommand: {
    fontSize: 12,
    color: '#FFD700',
    fontFamily: 'monospace',
    backgroundColor: 'rgba(0,0,0,0.3)',
    padding: 8,
    borderRadius: 6,
  },
});