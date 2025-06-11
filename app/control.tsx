import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Text } from 'react-native';
import AIAnalyzer from '../components/AIAnalyzer';
import BluetoothManager from '../components/BluetoothManager';
import DispenserController from '../components/DispenserController';
import BluetoothProtocol from '../components/BluetoothProtocol';
import TPDispenser from '../components/TPDispenser';
import { useLocalSearchParams } from 'expo-router';

export default function Control() {
  const params = useLocalSearchParams();
  const [isAnalyzing, setIsAnalyzing] = useState(true);
  const [isDispensing, setIsDispensing] = useState(false);
  const [sheetsToDispense, setSheetsToDispense] = useState(0);
  const [analysisResult, setAnalysisResult] = useState('');
  const [isBluetoothConnected, setIsBluetoothConnected] = useState(false);

  useEffect(() => {
    // Start analysis when screen loads
    setTimeout(() => {
      const sheets = Math.floor(Math.random() * 8) + 3;
      setSheetsToDispense(sheets);
      setAnalysisResult(`Audio analysis: ${sheets} sheets optimal for detected bathroom sounds`);
      setIsAnalyzing(false);
    }, 2500);
  }, []);

  const handleBluetoothConnect = (connected: boolean) => {
    setIsBluetoothConnected(connected);
  };

  const handleDispenseCommand = (sheets: number) => {
    if (isBluetoothConnected) {
      setIsDispensing(true);
    }
  };

  const handleDispenseComplete = () => {
    setIsDispensing(false);
    setSheetsToDispense(0);
  };

  const handleProtocolCommand = (command: string) => {
    console.log(`Sending BLE command: ${command}`);
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.title}>💩 Poopy-meter AI Control</Text>
          <Text style={styles.subtitle}>AI Analysis & Bluetooth Control</Text>
        </View>

        <AIAnalyzer isAnalyzing={isAnalyzing} analysisResult={analysisResult} />
        
        <BluetoothManager 
          onDeviceConnected={handleBluetoothConnect}
          onDispenseCommand={handleDispenseCommand}
          sheetsToDispense={sheetsToDispense}
        />

        <BluetoothProtocol 
          isConnected={isBluetoothConnected}
          onSendCommand={handleProtocolCommand}
        />

        {isBluetoothConnected && (
          <DispenserController 
            sheetsToDispense={sheetsToDispense}
            isDispensing={isDispensing}
            onDispenseComplete={handleDispenseComplete}
          />
        )}
        
        <TPDispenser sheetsToDispense={sheetsToDispense} isDispensing={isDispensing} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#654321',
  },
  scrollContent: {
    flexGrow: 1,
    padding: 20,
    alignItems: 'center',
  },
  header: {
    alignItems: 'center',
    marginTop: 50,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#F5DEB3',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#DEB887',
    textAlign: 'center',
  },
});