import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, FlatList, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function WorkoutsScreen() {
  const [sessions, setSessions] = useState([]);
  const [sessionName, setSessionName] = useState("");

  // Load on start
  useEffect(() => {
    const loadSessions = async () => {
      try {
        const saved = await AsyncStorage.getItem("workouts");
        if (saved) setSessions(JSON.parse(saved));
      } catch (err) {
        console.error("Failed to load workouts", err);
      }
    };
    loadSessions();
  }, []);

  // Save when changed
  useEffect(() => {
    AsyncStorage.setItem("workouts", JSON.stringify(sessions));
  }, [sessions]);

  const addSession = () => {
    if (!sessionName.trim()) return;
    const newSession = {
      id: Date.now().toString(),
      name: sessionName.trim(),
      exercises: [],
      createdAt: new Date().toISOString(),
    };
    setSessions([newSession, ...sessions]);
    setSessionName("");
  };

  const clearAll = async () => {
    await AsyncStorage.removeItem("workouts");
    setSessions([]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Workout Sessions</Text>
      <TextInput
        style={styles.input}
        placeholder="Session name (e.g., Push Day - Phase 1)"
        value={sessionName}
        onChangeText={setSessionName}
      />
      <Button title="Add Session" onPress={addSession} />
      <View style={{ marginVertical: 10 }} />
      <Button title="Clear All Sessions" color="red" onPress={clearAll} />

      <FlatList
        data={sessions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={{ color: "#fff", fontWeight: "bold" }}>{item.name}</Text>
            <Text style={{ color: "#aaa" }}>{item.exercises.length} exercises</Text>
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
  item: { backgroundColor: "#333", padding: 15, marginVertical: 5, borderRadius: 8 },
});
