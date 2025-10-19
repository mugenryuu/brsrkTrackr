import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function ExerciseListScreen() {
  const [exercises, setExercises] = useState([]);
  const isFocused = useIsFocused();
  const navigation = useNavigation();

  useEffect(() => {
    loadExercises();
  }, [isFocused]);

  const loadExercises = async () => {
    try {
      const stored = await AsyncStorage.getItem('exercises');
      if (stored) setExercises(JSON.parse(stored));
      else setExercises([]);
    } catch (error) {
      console.error('Error loading exercises:', error);
    }
  };

  const handleDelete = (exercise) => {
    Alert.alert(
      'Delete Exercise',
      `Are you sure you want to delete "${exercise.name}"?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              const updated = exercises.filter((ex) => ex.id !== exercise.id);
              await AsyncStorage.setItem('exercises', JSON.stringify(updated));
              setExercises(updated);
            } catch (error) {
              console.error('Error deleting exercise:', error);
            }
          },
        },
      ]
    );
  };

  const renderExercise = ({ item }) => (
    <TouchableOpacity
      style={styles.exerciseItem}
      onPress={() => navigation.navigate('ExerciseForm', { exercise: item })}
      onLongPress={() => handleDelete(item)}
    >
      <Text style={styles.exerciseName}>{item.name}</Text>
      {item.muscleGroup ? (
        <Text style={styles.exerciseDetails}>{item.muscleGroup}</Text>
      ) : null}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>Exercises</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('ExerciseForm')}
          style={styles.addButton}
        >
          <Ionicons name="add-circle-outline" size={28} color="#fff" />
        </TouchableOpacity>
      </View>

      {exercises.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No exercises yet</Text>
          <Text style={styles.emptySubtext}>Tap the + icon to add one</Text>
        </View>
      ) : (
        <FlatList
          data={exercises}
          renderItem={renderExercise}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingBottom: 40 }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111',
    padding: 20,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '700',
  },
  addButton: {
    backgroundColor: '#333',
    padding: 6,
    borderRadius: 8,
  },
  exerciseItem: {
    backgroundColor: '#1c1c1c',
    borderRadius: 10,
    padding: 14,
    marginBottom: 10,
  },
  exerciseName: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  exerciseDetails: {
    color: '#aaa',
    fontSize: 13,
    marginTop: 2,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    color: '#888',
    fontSize: 16,
    fontWeight: '600',
  },
  emptySubtext: {
    color: '#666',
    fontSize: 13,
    marginTop: 6,
  },
});
