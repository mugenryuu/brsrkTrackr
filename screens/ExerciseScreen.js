import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ExerciseScreen({ route }) {
  const { exerciseId, exerciseName } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{exerciseName}</Text>
      <Text style={styles.text}>Exercise ID: {exerciseId}</Text>
      <Text style={styles.text}>More details about {exerciseName} will go here.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000', padding: 20 },
  title: { color: '#fff', fontSize: 28, fontWeight: 'bold', marginBottom: 20 },
  text: { color: '#ccc', fontSize: 16, marginBottom: 8 },
});
