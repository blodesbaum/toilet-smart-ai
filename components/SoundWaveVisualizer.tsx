import React from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withRepeat, withTiming } from 'react-native-reanimated';

interface SoundWaveVisualizerProps {
  isRecording: boolean;
  amplitude: number;
}

export default function SoundWaveVisualizer({ isRecording, amplitude }: SoundWaveVisualizerProps) {
  const scale = useSharedValue(1);
  const opacity = useSharedValue(0.3);

  React.useEffect(() => {
    if (isRecording) {
      scale.value = withRepeat(withTiming(1 + amplitude * 0.5, { duration: 300 }), -1, true);
      opacity.value = withRepeat(withTiming(0.8, { duration: 500 }), -1, true);
    } else {
      scale.value = withTiming(1);
      opacity.value = withTiming(0.3);
    }
  }, [isRecording, amplitude]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  return (
    <View style={styles.container}>
      {[...Array(5)].map((_, i) => (
        <Animated.View
          key={i}
          style={[
            styles.wave,
            animatedStyle,
            {
              width: 60 + i * 20,
              height: 60 + i * 20,
              borderRadius: 30 + i * 10,
              borderWidth: 2,
              position: 'absolute',
            },
          ]}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 200,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  wave: {
    borderColor: '#CD853F',
  },
});