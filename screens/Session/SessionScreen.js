import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";

export default function SessionScreen({ route, navigation }) {
  const { workout } = route.params || {}; // ✅ receive workout object
  const { id, name, description, exercises = [] } = workout || {};

  // Safety check in case workout data is missing
  if (!workout) {
    return (
      <View style={styles.centered}>
        <Text style={styles.missingText}>No workout data found.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{name}</Text>
      {description ? <Text style={styles.description}>{description}</Text> : null}

      <Text style={styles.subtitle}>Exercises</Text>

      {exercises.length === 0 ? (
        <Text style={styles.emptyText}>No exercises in this workout.</Text>
      ) : (
        <FlatList
          data={exercises}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.exerciseItem}>
              <Text style={styles.exerciseName}>{item.name}</Text>
              {item.muscleGroup ? (
                <Text style={styles.exerciseDetail}>
                  {item.muscleGroup}
                </Text>
              ) : null}
              {item.notes ? (
                <Text style={styles.exerciseDetail}>Notes: {item.notes}</Text>
              ) : null}
            </View>
          )}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111",
    padding: 20,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#111",
  },
  missingText: {
    color: "#aaa",
    fontSize: 16,
  },
  title: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 5,
  },
  description: {
    color: "#ccc",
    marginBottom: 15,
    fontStyle: "italic",
  },
  subtitle: {
    color: "#4CAF50",
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
  },
  emptyText: {
    color: "#777",
    textAlign: "center",
    marginTop: 20,
  },
  exerciseItem: {
    backgroundColor: "#1a1a1a",
    padding: 14,
    borderRadius: 10,
    marginBottom: 10,
  },
  exerciseName: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  exerciseDetail: {
    color: "#aaa",
    fontSize: 14,
  },
});
