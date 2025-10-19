import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation, useIsFocused } from "@react-navigation/native";

export default function SessionListScreen() {
  const [sessions, setSessions] = useState([]);
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  useEffect(() => {
    loadSessions();
  }, [isFocused]);

  const loadSessions = async () => {
    try {
      const stored = await AsyncStorage.getItem("sessions");
      setSessions(stored ? JSON.parse(stored) : []);
    } catch (error) {
      console.error("Error loading sessions:", error);
    }
  };

  const deleteSession = (id) => {
    Alert.alert("Delete Session", "Are you sure?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          const updated = sessions.filter((s) => s.id !== id);
          setSessions(updated);
          await AsyncStorage.setItem("sessions", JSON.stringify(updated));
        },
      },
    ]);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => navigation.navigate("SessionScreen", { workout: item })}
    >
      <View>
        <Text style={styles.title}>{item.name}</Text>
        <Text style={styles.date}>
          {new Date(item.startTime).toLocaleString()}
        </Text>
      </View>
      <TouchableOpacity onPress={() => deleteSession(item.id)}>
        <Text style={styles.delete}>Delete</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {sessions.length === 0 ? (
        <Text style={styles.empty}>No sessions yet. Start one from a workout.</Text>
      ) : (
        <FlatList
          data={sessions}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 80 }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#111", padding: 20 },
  item: {
    backgroundColor: "#1c1c1c",
    padding: 14,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  title: { color: "#fff", fontSize: 16, fontWeight: "600" },
  date: { color: "#888", fontSize: 12 },
  delete: { color: "red", fontSize: 14 },
  empty: { color: "#777", textAlign: "center", marginTop: 40 },
});
