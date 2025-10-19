// screens/WorkoutFormScreen.js
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation, useRoute } from "@react-navigation/native";

const generateId = () => Math.random().toString(36).substring(2, 10);


export default function WorkoutFormScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const editingWorkout = route.params?.workout || null;

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [exerciseList, setExerciseList] = useState([]);
  const [selectedExercises, setSelectedExercises] = useState([]);

  useEffect(() => {
    const loadExercises = async () => {
      const savedExercises = await AsyncStorage.getItem("exercises");
      if (savedExercises) setExerciseList(JSON.parse(savedExercises));
    };
    loadExercises();
  }, []);

  useEffect(() => {
    if (editingWorkout) {
      setName(editingWorkout.name);
      setDescription(editingWorkout.description);
      setSelectedExercises(editingWorkout.exercises || []);
    }
  }, [editingWorkout]);

  const toggleExercise = (exercise) => {
    setSelectedExercises((prev) =>
      prev.some((e) => e.id === exercise.id)
        ? prev.filter((e) => e.id !== exercise.id)
        : [...prev, exercise]
    );
  };

  const saveWorkout = async () => {
    if (!name.trim()) {
      Alert.alert("Workout name is required");
      return;
    }

    const newWorkout = {
      id: editingWorkout ? editingWorkout.id : uuid.v4(),
      name,
      description,
      exercises: selectedExercises,
    };

    try {
      const saved = await AsyncStorage.getItem("workouts");
      const workouts = saved ? JSON.parse(saved) : [];

      let updated;
      if (editingWorkout) {
        updated = workouts.map((w) => (w.id === editingWorkout.id ? newWorkout : w));
      } else {
        updated = [...workouts, newWorkout];
      }

      await AsyncStorage.setItem("workouts", JSON.stringify(updated));
      navigation.goBack();
    } catch (error) {
      console.error("Failed to save workout:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {editingWorkout ? "Edit Workout" : "Add Workout"}
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Workout Name"
        placeholderTextColor="#777"
        value={name}
        onChangeText={setName}
      />

      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Description"
        placeholderTextColor="#777"
        value={description}
        onChangeText={setDescription}
        multiline
      />

      <Text style={styles.subTitle}>Select Exercises:</Text>

      {exerciseList.length === 0 ? (
        <Text style={styles.emptyText}>
          No exercises found. Go to Exercise List to add some.
        </Text>
      ) : (
        <FlatList
          data={exerciseList}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.exerciseItem,
                selectedExercises.some((e) => e.id === item.id) && styles.selected,
              ]}
              onPress={() => toggleExercise(item)}
            >
              <Text style={styles.exerciseText}>{item.name}</Text>
            </TouchableOpacity>
          )}
        />
      )}

      <TouchableOpacity style={styles.saveButton} onPress={saveWorkout}>
        <Text style={styles.saveButtonText}>Save Workout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#121212", padding: 20 },
  title: { color: "#fff", fontSize: 22, fontWeight: "bold", marginBottom: 10 },
  subTitle: { color: "#fff", fontSize: 18, fontWeight: "600", marginTop: 10 },
  input: {
    backgroundColor: "#1f1f1f",
    color: "#fff",
    padding: 12,
    borderRadius: 10,
    marginVertical: 6,
  },
  textArea: { height: 80, textAlignVertical: "top" },
  exerciseItem: {
    backgroundColor: "#1f1f1f",
    padding: 12,
    borderRadius: 10,
    marginVertical: 4,
  },
  selected: { backgroundColor: "#27ae60" },
  exerciseText: { color: "#fff" },
  saveButton: {
    backgroundColor: "#27ae60",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 15,
  },
  saveButtonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  emptyText: { color: "#888", fontSize: 16, textAlign: "center", marginTop: 10 },
});
