import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import SoundWaveVisualizer from '../components/SoundWaveVisualizer';
import RecordButton from '../components/RecordButton';

export default function Index() {
  const [isRecording, setIsRecording] = useState(false);
  const [amplitude, setAmplitude] = useState(0);
  const [recordingComplete, setRecordingComplete] = useState(false);

  const simulateAudioAmplitude = () => {
    if (isRecording) {
      setAmplitude(Math.random() * 0.8 + 0.2);
    }
  };

  useEffect(() => {
    const interval = setInterval(simulateAudioAmplitude, 200);
    return () => clearInterval(interval);
  }, [isRecording]);

  const handleRecordPress = () => {
    if (isRecording) {
      setIsRecording(false);
      setAmplitude(0);
      setRecordingComplete(true);
    } else {
      setIsRecording(true);
      setRecordingComplete(false);
    }
  };

  const handleProceed = () => {
    router.push('/control');
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>💩 Poopy-meter AI</Text>
          <Text style={styles.subtitle}>Smart Bathroom Analysis System</Text>
          <Text style={styles.instruction}>
            Record bathroom sounds for optimal toilet paper calculation
          </Text>
        </View>

        <SoundWaveVisualizer isRecording={isRecording} amplitude={amplitude} />
        
        <RecordButton isRecording={isRecording} onPress={handleRecordPress} />
        
        {recordingComplete && (
          <TouchableOpacity style={styles.proceedButton} onPress={handleProceed}>
            <Text style={styles.proceedText}>🎯 Analyze & Control Dispenser</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#8B4513',
  },
  content: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#F5DEB3',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: '#DEB887',
    textAlign: 'center',
    marginBottom: 16,
  },
  instruction: {
    fontSize: 16,
    color: '#D2B48C',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  proceedButton: {
    backgroundColor: '#A0522D',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
    marginTop: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  proceedText: {
    color: '#F5DEB3',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});