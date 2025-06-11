import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';

interface DispenserControllerProps {
  sheetsToDispense: number;
  isDispensing: boolean;
  onDispenseComplete: () => void;
}

export default function DispenserController({ 
  sheetsToDispense, 
  isDispensing, 
  onDispenseComplete 
}: DispenserControllerProps) {
  const [currentSheet, setCurrentSheet] = useState(0);
  const [motorStatus, setMotorStatus] = useState('Idle');
  const rotateAnim = new Animated.Value(0);

  useEffect(() => {
    if (isDispensing && sheetsToDispense > 0) {
      startDispensing();
    }
  }, [isDispensing, sheetsToDispense]);

  const startDispensing = () => {
    setMotorStatus('Dispensing');
    setCurrentSheet(0);
    
    // Animate motor rotation
    Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      })
    ).start();

    // Dispense sheets one by one
    const dispenseInterval = setInterval(() => {
      setCurrentSheet(prev => {
        const next = prev + 1;
        if (next >= sheetsToDispense) {
          clearInterval(dispenseInterval);
          setMotorStatus('Complete');
          rotateAnim.stopAnimation();
          setTimeout(() => {
            setMotorStatus('Idle');
            onDispenseComplete();
          }, 1000);
        }
        return next;
      });
    }, 400);
  };

  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>🔧 Dispenser Control</Text>
      </View>
      
      <View style={styles.statusRow}>
        <Text style={styles.label}>Motor Status:</Text>
        <Text style={[styles.status, { color: getStatusColor(motorStatus) }]}>
          {motorStatus}
        </Text>
      </View>
      
      <View style={styles.statusRow}>
        <Text style={styles.label}>Progress:</Text>
        <Text style={styles.progress}>
          {currentSheet}/{sheetsToDispense} sheets
        </Text>
      </View>
      
      <View style={styles.motorContainer}>
        <Animated.View style={[styles.motor, { transform: [{ rotate: spin }] }]}>
          <Text style={styles.motorIcon}>⚙️</Text>
        </Animated.View>
      </View>
      
      <View style={styles.progressBar}>
        <View 
          style={[styles.progressFill, { 
            width: `${(currentSheet / Math.max(sheetsToDispense, 1)) * 100}%` 
          }]} 
        />
      </View>
    </View>
  );
}

function getStatusColor(status: string): string {
  switch (status) {
    case 'Dispensing': return '#FF9800';
    case 'Complete': return '#4CAF50';
    default: return '#9E9E9E';
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 15,
    padding: 20,
    marginVertical: 10,
    width: '100%',
  },
  header: {
    alignItems: 'center',
    marginBottom: 15,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  statusRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  label: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 14,
  },
  status: {
    fontSize: 14,
    fontWeight: '600',
  },
  progress: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  motorContainer: {
    alignItems: 'center',
    marginVertical: 15,
  },
  motor: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  motorIcon: {
    fontSize: 30,
  },
  progressBar: {
    height: 8,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#4CAF50',
    borderRadius: 4,
  },
});