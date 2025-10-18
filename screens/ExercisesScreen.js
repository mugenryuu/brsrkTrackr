import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Button, FlatList, StyleSheet, StatusBar } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Picker } from "@react-native-picker/picker";

export default function ExercisesScreen() {
  const [exerciseName, setExerciseName] = useState("");
  const [category, setCategory] = useState("Chest");
  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    const loadExercises = async () => {
      try {
        const saved = await AsyncStorage.getItem("exercises");
        if (saved) setExercises(JSON.parse(saved));
      } catch (err) {
        console.error("failed to load exercises", err);
      }
    };
    loadExercises();
  }, []);

  useEffect(() => {
    AsyncStorage.setItem("exercises", JSON.stringify(exercises));
  }, [exercises]);

  const addExercise = () => {
    if (!exerciseName.trim()) return;
    const newExercise = {
      id: Date.now().toString(),
      name: exerciseName.trim(),
      category,
    };
    setExercises([newExercise, ...exercises]);
    setExerciseName("");
  };

  const ClearAll = async () => {
    await AsyncStorage.removeItem("exercises");
    setExercises([]);
  };

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="dark-content" // or "light-content" depending on your design
        backgroundColor="transparent" // Set to transparent for Android to allow content underneath
        translucent={true} // Crucial for Android to draw under status bar
      />
      <Text style={styles.title}>Exercises</Text>

      <TextInput
        style={styles.input}
        placeholder="Exercise name"
        value={exerciseName}
        onChangeText={setExerciseName}
      />

      <View style={styles.picker}>
        <Picker selectedValue={category} onValueChange={setCategory} style={{ color: "#fff" }}>
          <Picker.Item label="Chest" value="Chest" />
          <Picker.Item label="Back" value="Back" />
          <Picker.Item label="Arms" value="Arms" />
          <Picker.Item label="Legs" value="Legs" />
        </Picker>
      </View>

      <Button title="Add Exercise" onPress={addExercise} />
      <View style={{ marginVertical: 10 }} />
      <Button title="Clear All Exercises" color="red" onPress={ClearAll} />

      <FlatList
        data={exercises}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={{ color: "#fff", fontWeight: "bold" }}>{item.name}</Text>
            <Text style={{ color: "#aaa" }}>{item.category}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#111", padding: 20 },
  title: { color: "#fff", fontSize: 22, fontWeight: "bold", marginBottom: 10 },
  input: { backgroundColor: "#222", color: "#fff", padding: 10, marginBottom: 10, borderRadius: 8 },
  picker: { backgroundColor: "#222", borderRadius: 8, marginBottom: 10 },
  item: { backgroundColor: "#333", padding: 15, marginVertical: 5, borderRadius: 8 },
});