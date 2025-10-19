import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

// Example exercise data; in real app, this can come from API or state
const exercises = [];

export default function ExercisesScreen() {
  const navigation = useNavigation();

  const handlePress = (exerciseId) => {
    navigation.navigate('WorkoutScreen', { workoutId: exerciseId });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => handlePress(item.id)}
    >
      <Text style={styles.itemText}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Exercises</Text>
      {exercises.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No exercises available 😞</Text>
        </View>
      ) : (
        <FlatList
          data={exercises}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
    backgroundColor: '#121212',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 16,
  },
  item: {
    padding: 16,
    marginBottom: 12,
    borderRadius: 12,
    backgroundColor: '#1f1f1f',
  },
  itemText: {
    color: '#ffffff',
    fontSize: 18,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    color: '#aaaaaa',
    fontSize: 18,
    fontStyle: 'italic',
  },
});
