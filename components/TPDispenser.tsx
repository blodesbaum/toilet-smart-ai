import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, withSpring } from 'react-native-reanimated';

interface TPDispenserProps {
  sheetsToDispense: number;
  isDispensing: boolean;
}

export default function TPDispenser({ sheetsToDispense, isDispensing }: TPDispenserProps) {
  const paperHeight = useSharedValue(0);
  const dispenserScale = useSharedValue(1);

  React.useEffect(() => {
    if (isDispensing) {
      dispenserScale.value = withSpring(1.05);
      paperHeight.value = withTiming(sheetsToDispense * 20, { duration: 2000 });
    } else {
      dispenserScale.value = withSpring(1);
      paperHeight.value = withTiming(0, { duration: 500 });
    }
  }, [isDispensing, sheetsToDispense]);

  const dispenserStyle = useAnimatedStyle(() => ({
    transform: [{ scale: dispenserScale.value }],
  }));

  const paperStyle = useAnimatedStyle(() => ({
    height: paperHeight.value,
  }));

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.dispenser, dispenserStyle]}>
        <View style={styles.dispenserTop}>
          <Text style={styles.brandText}>🤖 AI-TP</Text>
        </View>
        <View style={styles.dispenserBody}>
          <View style={styles.slot} />
          <Animated.View style={[styles.paper, paperStyle]} />
        </View>
      </Animated.View>
      <Text style={styles.sheetsText}>
        {sheetsToDispense > 0 ? `${sheetsToDispense} sheets recommended` : 'Ready to analyze'}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: 20,
  },
  dispenser: {
    width: 120,
    height: 180,
    backgroundColor: '#2C3E50',
    borderRadius: 15,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
  },
  dispenserTop: {
    height: 40,
    backgroundColor: '#34495E',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  brandText: {
    color: '#ECF0F1',
    fontSize: 12,
    fontWeight: 'bold',
  },
  dispenserBody: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 10,
  },
  slot: {
    width: 80,
    height: 8,
    backgroundColor: '#1A252F',
    borderRadius: 4,
    marginBottom: 5,
  },
  paper: {
    width: 70,
    backgroundColor: '#FFFFFF',
    borderRadius: 2,
    borderWidth: 1,
    borderColor: '#BDC3C7',
  },
  sheetsText: {
    marginTop: 15,
    fontSize: 16,
    fontWeight: '600',
    color: '#2C3E50',
    textAlign: 'center',
  },
});