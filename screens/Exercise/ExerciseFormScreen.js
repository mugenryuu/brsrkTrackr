import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useRoute } from '@react-navigation/native';

export default function ExerciseFormScreen() {
  const navigation = useNavigation();
  const route = useRoute();

  const generateId = () => Math.random().toString(36).substring(2, 10);

  const editingExercise = route.params?.exercise || null;
  const [name, setName] = useState(editingExercise ? editingExercise.name : '');
  const [muscleGroup, setMuscleGroup] = useState(editingExercise ? editingExercise.muscleGroup : '');
  const [notes, setNotes] = useState(editingExercise ? editingExercise.notes : '');

  // Save or update exercise
  const handleSave = async () => {
    if (!name.trim()) {
      Alert.alert('Validation', 'Please enter an exercise name.');
      return;
    }

    try {
      const stored = await AsyncStorage.getItem('exercises');
      const exercises = stored ? JSON.parse(stored) : [];

      if (editingExercise) {
        // Update existing exercise
        const updated = exercises.map((ex) =>
          ex.id === editingExercise.id ? { ...ex, name, muscleGroup, notes } : ex
        );
        await AsyncStorage.setItem('exercises', JSON.stringify(updated));
      } else {
        // Add new exercise
        const newExercise = {
          id: generateId(),
          name,
          muscleGroup,
          notes,
        };
        await AsyncStorage.setItem('exercises', JSON.stringify([...exercises, newExercise]));
      }

      navigation.goBack();
    } catch (error) {
      console.error('Error saving exercise:', error);
      Alert.alert('Error', 'Failed to save exercise.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {editingExercise ? 'Edit Exercise' : 'Add Exercise'}
      </Text>

      <Text style={styles.label}>Exercise Name</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g. Bench Press"
        value={name}
        onChangeText={setName}
      />

      <Text style={styles.label}>Muscle Group</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g. Chest"
        value={muscleGroup}
        onChangeText={setMuscleGroup}
      />

      <Text style={styles.label}>Notes</Text>
      <TextInput
        style={[styles.input, { height: 80 }]}
        multiline
        placeholder="Optional notes..."
        value={notes}
        onChangeText={setNotes}
      />

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>
          {editingExercise ? 'Update Exercise' : 'Save Exercise'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111',
    padding: 20,
  },
  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 20,
  },
  label: {
    color: '#aaa',
    fontSize: 14,
    marginBottom: 6,
  },
  input: {
    backgroundColor: '#222',
    color: '#fff',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginBottom: 16,
  },
  saveButton: {
    backgroundColor: '#5A5CF0',
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 10,
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
});
