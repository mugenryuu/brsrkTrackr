import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function WorkoutScreen({ route }) {
  // Safely get workoutId using optional chaining and fallback
  const workoutId = route?.params?.workoutId ?? null;

  return (
    <View style={styles.container}>
      {workoutId ? (
        <Text style={styles.text}>Workout ID: {workoutId}</Text>
      ) : (
        <Text style={styles.text}>No workout selected</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#121212', // dark theme background
  },
  text: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
