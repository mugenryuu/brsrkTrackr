// screens/WorkoutListScreen.js
import React, { useEffect, useState, useCallback } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

export default function WorkoutListScreen() {
  const [workouts, setWorkouts] = useState([]);
  const navigation = useNavigation();

  const loadWorkouts = async () => {
    try {
      const saved = await AsyncStorage.getItem("workouts");
      if (saved) {
        setWorkouts(JSON.parse(saved));
      } else {
        setWorkouts([]);
      }
    } catch (error) {
      console.error("Failed to load workouts:", error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadWorkouts();
    }, [])
  );

  const deleteWorkout = async (id) => {
    Alert.alert("Delete Workout", "Are you sure you want to delete this workout?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          try {
            const updated = workouts.filter((w) => w.id !== id);
            setWorkouts(updated);
            await AsyncStorage.setItem("workouts", JSON.stringify(updated));
          } catch (error) {
            console.error("Failed to delete workout:", error);
          }
        },
      },
    ]);
  };

  const renderWorkout = ({ item }) => (
    <TouchableOpacity
      style={styles.workoutItem}
      onPress={() => navigation.navigate("WorkoutViewScreen", { workout: item })}
    >
      <View style={{ flex: 1 }}>
        <Text style={styles.workoutName}>{item.name}</Text>
        <Text style={styles.workoutDesc}>{item.description}</Text>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity
          style={[styles.actionButton, styles.editButton]}
          onPress={() => navigation.navigate("WorkoutFormScreen", { workout: item })}
        >
          <Text style={styles.buttonText}>Edit</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionButton, styles.deleteButton]}
          onPress={() => deleteWorkout(item.id)}
        >
          <Text style={styles.buttonText}>Del</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Workouts</Text>

      {workouts.length === 0 ? (
        <Text style={styles.emptyText}>No workouts found. Add one to get started!</Text>
      ) : (
        <FlatList
          data={workouts}
          keyExtractor={(item) => item.id}
          renderItem={renderWorkout}
        />
      )}

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate("WorkoutFormScreen")}
      >
        <Text style={styles.addButtonText}>＋ Add Workout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#121212", padding: 20 },
  title: { fontSize: 22, fontWeight: "bold", color: "#fff", marginBottom: 15 },
  workoutItem: {
    flexDirection: "row",
    backgroundColor: "#1f1f1f",
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    alignItems: "center",
  },
  workoutName: { color: "#fff", fontSize: 18, fontWeight: "600" },
  workoutDesc: { color: "#aaa", fontSize: 14, marginTop: 2 },
  emptyText: { color: "#888", fontSize: 16, textAlign: "center", marginTop: 30 },
  actions: { flexDirection: "row", gap: 8 },
  actionButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  editButton: { backgroundColor: "#3498db" },
  deleteButton: { backgroundColor: "#e74c3c" },
  buttonText: { color: "#fff", fontWeight: "600" },
  addButton: {
    backgroundColor: "#27ae60",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
  },
  addButtonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});
