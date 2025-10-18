import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function SessionScreen({ route }) {
  const { sessionId, workoutId, workoutName } = route.params || {};

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Session</Text>
      {sessionId && <Text style={styles.text}>Viewing session #{sessionId}</Text>}
      {workoutName && <Text style={styles.text}>Workout: {workoutName}</Text>}
      <Text style={styles.text}>Track sets, reps, and duration here.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000', padding: 20 },
  title: { color: '#fff', fontSize: 28, fontWeight: 'bold', marginBottom: 20 },
  text: { color: '#ccc', fontSize: 16, marginBottom: 8 },
});
