import React from 'react';
import { View, Text, Button, TouchableOpacity, FlatList, StyleSheet } from 'react-native';

const workouts = [];

export default function WorkoutListScreen({ navigation }) {
  const hasWorkouts = workouts.length > 0;
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Workout List</Text>

      {hasWorkouts ? (
        <FlatList
          data={workouts}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.item}
              onPress={() => navigation.navigate('WorkoutScreen', { workoutId: item.id, workoutName: item.name })}
            >
              <Text style={styles.itemText}>{item.name}</Text>
            </TouchableOpacity>
          )}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No workouts yet.</Text>
          <Text style={styles.emptySub}>Start by adding a new workout plan.</Text>
          <Button title="Create Workout" onPress={() => navigation.navigate('WorkoutScreen')} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000', padding: 20 },
  title: { color: '#fff', fontSize: 24, marginBottom: 20, fontWeight: 'bold' },
  item: { backgroundColor: '#222', padding: 16, borderRadius: 8, marginBottom: 12 },
  itemText: { color: '#fff', fontSize: 18 },
  emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  emptyText: { color: '#aaa', fontSize: 20, fontWeight: '600', marginBottom: 6 },
  emptySub: { color: '#666', fontSize: 14 },
});
