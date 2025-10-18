import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home</Text>
      <Text style={styles.subtitle}>Welcome to BRSRK Trackr 🧩</Text>
      <Text style={styles.text}>
        Track your workouts, monitor your progress, and conquer every session.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#000' },
  title: { fontSize: 28, color: '#fff', fontWeight: 'bold', marginBottom: 8 },
  subtitle: { fontSize: 16, color: '#aaa', marginBottom: 12 },
  text: { color: '#777', fontSize: 14, textAlign: 'center', paddingHorizontal: 40 },
});
