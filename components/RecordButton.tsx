import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';

interface RecordButtonProps {
  isRecording: boolean;
  onPress: () => void;
}

export default function RecordButton({ isRecording, onPress }: RecordButtonProps) {
  const scale = useSharedValue(1);

  const handlePress = () => {
    scale.value = withSpring(0.95, {}, () => {
      scale.value = withSpring(1);
    });
    onPress();
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <TouchableOpacity onPress={handlePress} style={styles.button}>
        <View style={[styles.gradient, { backgroundColor: isRecording ? '#A0522D' : '#8B4513' }]}>
          <Text style={styles.text}>
            {isRecording ? '🛑 Stop Recording' : '🎤 Start Recording'}
          </Text>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
  },
  button: {
    borderRadius: 25,
    overflow: 'hidden',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  gradient: {
    paddingHorizontal: 30,
    paddingVertical: 15,
    alignItems: 'center',
  },
  text: {
    color: '#F5DEB3',
    fontSize: 18,
    fontWeight: 'bold',
  },
});