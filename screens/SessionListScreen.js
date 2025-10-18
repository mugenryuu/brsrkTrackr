import React, { useState } from 'react';
import { View, Text, Button, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

export default function SessionListScreen({ navigation }) {
  const [sessions] = useState([]); // empty to trigger fallback
  const hasSessions = sessions.length > 0;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Session History</Text>
      {hasSessions ? (
        <FlatList
          data={sessions}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.item}
              onPress={() => navigation.navigate('SessionScreen', { sessionId: item.id })}
            >
              <Text style={styles.itemText}>{item.workout}</Text>
              <Text style={styles.subText}>{item.date} — {item.duration}</Text>
            </TouchableOpacity>
          )}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No sessions yet.</Text>
          <Text style={styles.emptySub}>Start a workout to create your first session.</Text>
          <Button title="Create Session" onPress={() => navigation.navigate('SessionScreen')} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000', padding: 20 },
  title: { color: '#fff', fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  item: { backgroundColor: '#222', padding: 16, borderRadius: 8, marginBottom: 12 },
  itemText: { color: '#fff', fontSize: 18 },
  subText: { color: '#aaa', fontSize: 14 },
  emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  emptyText: { color: '#aaa', fontSize: 20, fontWeight: '600', marginBottom: 6 },
  emptySub: { color: '#666', fontSize: 14 },
});
