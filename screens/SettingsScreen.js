import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function SettingsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>

      <View style={styles.section}>
        <Text style={styles.label}>App Version:</Text>
        <Text style={styles.value}>v1.0.0</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Theme:</Text>
        <Text style={styles.value}>Dark (default)</Text>
      </View>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>⚙️ Change Settings</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000', padding: 24 },
  title: { color: '#fff', fontSize: 28, fontWeight: 'bold', marginBottom: 20 },
  section: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 },
  label: { color: '#aaa', fontSize: 16 },
  value: { color: '#fff', fontSize: 16 },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: { color: '#fff', fontWeight: 'bold' },
});
