import React, { useState, useEffect, useRef } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function SessionScreen({ route, navigation }) {
  const { workout } = route.params || {};
  if (!workout) return <Text>No workout data found</Text>;

  const { name, exercises = [], id: workoutId } = workout;

  const restDuration = 15;

  // ----------------------------
  // State
  // ----------------------------
  const [loading, setLoading] = useState(true);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [currentSet, setCurrentSet] = useState(1);
  const [isResting, setIsResting] = useState(false);
  const [timer, setTimer] = useState(null); // null until loaded
  const [isRunning, setIsRunning] = useState(true);
  const [workoutComplete, setWorkoutComplete] = useState(false);

  const timerRef = useRef(null);
  const currentExercise = exercises[currentExerciseIndex] || {};

  // ----------------------------
  // Initialize session from AsyncStorage
  // ----------------------------
  useEffect(() => {
    const initializeSession = async () => {
      try {
        const storedSessions = await AsyncStorage.getItem("sessions");
        const sessions = storedSessions ? JSON.parse(storedSessions) : [];
        const session = sessions.find(s => s.workoutId === workoutId && !s.completed);

        let idx = 0;
        let setNum = 1;
        let resting = false;
        let remainingTime = exercises[0]?.duration || 30;

        if (session) {
          idx = session.currentExerciseIndex || 0;
          setNum = session.currentSet || 1;
          resting = session.isResting || false;

          const currentEx = exercises[idx] || {};
          const duration = resting ? restDuration : currentEx.duration || 30;

          if (session.exerciseStartTime) {
            const elapsed = Math.floor((new Date() - new Date(session.exerciseStartTime)) / 1000);
            remainingTime = Math.max(duration - elapsed, 0);
          } else {
            remainingTime = duration;
          }
        }

        setCurrentExerciseIndex(idx);
        setCurrentSet(setNum);
        setIsResting(resting);
        setTimer(remainingTime);
      } catch (err) {
        console.log("Error loading session:", err);
        setTimer(exercises[0]?.duration || 30);
      } finally {
        setLoading(false);
      }
    };

    initializeSession();
  }, []);

  // ----------------------------
  // Save session progress
  // ----------------------------
  const saveSessionProgress = async () => {
    try {
      const storedSessions = await AsyncStorage.getItem("sessions");
      const sessions = storedSessions ? JSON.parse(storedSessions) : [];
      const index = sessions.findIndex(s => s.workoutId === workoutId && !s.completed);

      if (index !== -1) {
        sessions[index].currentExerciseIndex = currentExerciseIndex;
        sessions[index].currentSet = currentSet;
        sessions[index].isResting = isResting;
        sessions[index].exerciseStartTime = new Date().toISOString();
        await AsyncStorage.setItem("sessions", JSON.stringify(sessions));
      }
    } catch (err) {
      console.log("Error saving session:", err);
    }
  };

  // ----------------------------
  // Mark workout complete
  // ----------------------------
  const markSessionComplete = async () => {
    try {
      const storedSessions = await AsyncStorage.getItem("sessions");
      const sessions = storedSessions ? JSON.parse(storedSessions) : [];
      const index = sessions.findIndex(s => s.workoutId === workoutId && !s.completed);

      if (index !== -1) {
        sessions[index].completed = true;
        sessions[index].endTime = new Date().toISOString();
        await AsyncStorage.setItem("sessions", JSON.stringify(sessions));
      }
    } catch (err) {
      console.log("Error marking session complete:", err);
    }
  };

  // ----------------------------
  // Handle next set/exercise
  // ----------------------------
  const handleNextSetOrExercise = async () => {
    if (!isResting) {
      if (currentSet < (currentExercise.sets || 1)) {
        setIsResting(true);
        setTimer(restDuration);
      } else if (currentExerciseIndex < exercises.length - 1) {
        setIsResting(true);
        setTimer(restDuration);
      } else {
        setWorkoutComplete(true);
        setIsRunning(false);
        await markSessionComplete();
        return;
      }
    } else {
      setIsResting(false);
      if (currentSet < (currentExercise.sets || 1)) {
        setCurrentSet(prev => prev + 1);
        setTimer(currentExercise.duration || 30);
      } else if (currentExerciseIndex < exercises.length - 1) {
        setCurrentExerciseIndex(prev => prev + 1);
        setCurrentSet(1);
        setTimer(exercises[currentExerciseIndex + 1]?.duration || 30);
      }
    }

    await saveSessionProgress();
  };

  // ----------------------------
  // Timer interval
  // ----------------------------
  useEffect(() => {
    if (timer === null || loading) return;

    if (timerRef.current) clearInterval(timerRef.current);

    timerRef.current = setInterval(() => {
      if (isRunning && timer > 0) {
        setTimer(prev => prev - 1);
      } else if (isRunning && timer === 0) {
        handleNextSetOrExercise();
      }
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, [isRunning, timer, currentExerciseIndex, currentSet, isResting, loading]);

  // ----------------------------
  // Progress calculation
  // ----------------------------
  const totalSets = exercises.reduce((sum, ex) => sum + (ex.sets || 1), 0);
  const completedSets =
    exercises.slice(0, currentExerciseIndex).reduce((sum, ex) => sum + (ex.sets || 1), 0) +
    (currentSet - (isResting ? 1 : 0));
  const progressPercent = ((completedSets / totalSets) * 100).toFixed(0);

  // ----------------------------
  // Loading screen
  // ----------------------------
  if (loading || timer === null) {
    return (
      <View style={styles.centered}>
        <Text style={{ color: "#fff" }}>Loading session...</Text>
      </View>
    );
  }

  // ----------------------------
  // Render
  // ----------------------------
  return (
    <View style={styles.container}>
      {workoutComplete ? (
        <View style={styles.centered}>
          <Text style={styles.title}>Workout Complete! 🎉</Text>
          <Button title="Back to Workout List" onPress={() => navigation.goBack()} />
        </View>
      ) : (
        <View>
          <Text style={styles.title}>{currentExercise.name}</Text>
          {currentExercise.muscleGroup && <Text style={styles.description}>{currentExercise.muscleGroup}</Text>}
          {currentExercise.notes && <Text style={styles.description}>Notes: {currentExercise.notes}</Text>}
          <Text style={styles.subtitle}>{isResting ? "Rest" : `Set ${currentSet} of ${currentExercise.sets || 1}`}</Text>
          <Text style={styles.timer}>{timer}s</Text>
          <Text style={styles.progress}>Progress: {progressPercent}%</Text>
          <View style={styles.buttons}>
            <Button title={isRunning ? "Pause" : "Start"} onPress={() => setIsRunning(!isRunning)} />
            <Button title="Next Set/Exercise" onPress={handleNextSetOrExercise} />
          </View>
        </View>
      )}
    </View>
  );
}

// ----------------------------
// Styles
// ----------------------------
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#111", padding: 20 },
  centered: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#111" },
  title: { color: "#fff", fontSize: 22, fontWeight: "700", marginBottom: 5 },
  description: { color: "#ccc", marginBottom: 15, fontStyle: "italic" },
  subtitle: { color: "#4CAF50", fontSize: 18, fontWeight: "600", marginBottom: 10 },
  timer: { color: "#FF5722", fontSize: 48, fontWeight: "700", textAlign: "center", marginVertical: 20 },
  progress: { color: "#aaa", fontSize: 14, textAlign: "center", marginBottom: 20 },
  buttons: { flexDirection: "row", justifyContent: "space-around" },
});
