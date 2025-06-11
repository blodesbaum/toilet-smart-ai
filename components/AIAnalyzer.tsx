import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withRepeat, withTiming } from 'react-native-reanimated';

interface AIAnalyzerProps {
  isAnalyzing: boolean;
  analysisResult: string;
}

export default function AIAnalyzer({ isAnalyzing, analysisResult }: AIAnalyzerProps) {
  const rotation = useSharedValue(0);
  const opacity = useSharedValue(1);

  React.useEffect(() => {
    if (isAnalyzing) {
      rotation.value = withRepeat(withTiming(360, { duration: 2000 }), -1, false);
      opacity.value = withRepeat(withTiming(0.5, { duration: 1000 }), -1, true);
    } else {
      rotation.value = withTiming(0);
      opacity.value = withTiming(1);
    }
  }, [isAnalyzing]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
    opacity: opacity.value,
  }));

  return (
    <View style={styles.container}>
      <View style={styles.aiBox}>
        <Animated.View style={[styles.brain, animatedStyle]}>
          <Text style={styles.brainEmoji}>🧠</Text>
        </Animated.View>
        <Text style={styles.title}>AI Analysis</Text>
        <Text style={styles.status}>
          {isAnalyzing ? 'Analyzing audio patterns...' : 'Ready'}
        </Text>
        {analysisResult && (
          <View style={styles.resultBox}>
            <Text style={styles.resultText}>{analysisResult}</Text>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
  },
  aiBox: {
    backgroundColor: '#D2B48C',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#A0522D',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
  },
  brain: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  brainEmoji: {
    fontSize: 40,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#3E2723',
    marginBottom: 5,
  },
  status: {
    fontSize: 14,
    color: '#5D4037',
    textAlign: 'center',
  },
  resultBox: {
    marginTop: 15,
    padding: 15,
    backgroundColor: '#F5DEB3',
    borderRadius: 10,
    borderLeftWidth: 4,
    borderLeftColor: '#8B4513',
  },
  resultText: {
    fontSize: 14,
    color: '#654321',
    fontWeight: '600',
    textAlign: 'center',
  },
});