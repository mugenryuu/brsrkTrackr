import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function WorkoutScreen({ route, navigation }) {
  const { workoutId, workoutName } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{workoutName}</Text>
      <Text style={styles.text}>Workout ID: {workoutId}</Text>

      <Button
        title="Start Session"
        onPress={() =>
          navigation.navigate('Sessions', {
            screen: 'SessionScreen',
            params: { workoutId, workoutName },
          })
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000', padding: 20 },
  title: { color: '#fff', fontSize: 28, fontWeight: 'bold', marginBottom: 20 },
  text: { color: '#ccc', fontSize: 16, marginBottom: 8 },
});
