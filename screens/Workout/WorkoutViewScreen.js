 // screens/WorkoutViewScreen.js
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Alert,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

export default function WorkoutViewScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { workout } = route.params || {};

  const [selectedWorkout, setSelectedWorkout] = useState(workout);

  useEffect(() => {
    if (!workout) {
      Alert.alert("Error", "No workout data found.");
      navigation.goBack();
    } else {
      setSelectedWorkout(workout);
    }
  }, [workout]);

  if (!selectedWorkout) return null;

  const startWorkout = () => {
    // Future: Navigate to session screen
    Alert.alert(
      "Start Workout",
      `Starting workout: ${selectedWorkout.name}`,
      [
        {
          text: "OK",
          onPress: () =>
            navigation.navigate("SessionScreen", {
              workoutId: selectedWorkout.id,
              workoutName: selectedWorkout.name,
              exercises: selectedWorkout.exercises,
            }),
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{selectedWorkout.name}</Text>
      {selectedWorkout.description ? (
        <Text style={styles.description}>{selectedWorkout.description}</Text>
      ) : (
        <Text style={styles.descriptionMuted}>No description provided.</Text>
      )}

      <Text style={styles.sectionTitle}>Exercises:</Text>

      {selectedWorkout.exercises?.length > 0 ? (
        <FlatList
          data={selectedWorkout.exercises}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.exerciseItem}>
              <Text style={styles.exerciseName}>{item.name}</Text>
            </View>
          )}
        />
      ) : (
        <Text style={styles.emptyText}>No exercises added to this workout.</Text>
      )}

      <TouchableOpacity style={styles.startButton} onPress={startWorkout}>
        <Text style={styles.startButtonText}>Start Workout</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backButtonText}>← Back</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#121212", padding: 20 },
  title: { fontSize: 24, color: "#fff", fontWeight: "bold", marginBottom: 8 },
  description: { color: "#ccc", fontSize: 16, marginBottom: 12 },
  descriptionMuted: { color: "#666", fontSize: 16, marginBottom: 12 },
  sectionTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
    marginTop: 10,
  },
  exerciseItem: {
    backgroundColor: "#1f1f1f",
    padding: 12,
    borderRadius: 10,
    marginVertical: 4,
  },
  exerciseName: { color: "#fff", fontSize: 16 },
  emptyText: { color: "#777", fontSize: 15, textAlign: "center", marginTop: 10 },
  startButton: {
    backgroundColor: "#27ae60",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 20,
  },
  startButtonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  backButton: {
    marginTop: 10,
    padding: 12,
    alignItems: "center",
    backgroundColor: "#333",
    borderRadius: 10,
  },
  backButtonText: { color: "#ccc", fontSize: 15 },
});
