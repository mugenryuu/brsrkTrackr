import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';


import ExercisesScreen from "./screens/ExercisesScreen"

export default function App() {
  const Tab = createBottomTabNavigator();


  const HomeScreen = () => <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Text>Home</Text></View>;
  const WorkoutsScreen = () => <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Text>Workouts</Text></View>;
  const SessionsScreen = () => <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Text>Sessions</Text></View>;
  const SettingsScreen = () => <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Text>Settings</Text></View>;



  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            switch (route.name) {
              case 'Home': iconName = focused ? 'home' : 'home-outline'; break;
              case 'Workouts': iconName = focused ? 'barbell' : 'barbell-outline'; break;
              case 'Sessions': iconName = focused ? 'timer' : 'timer-outline'; break;
              case 'Exercises': iconName = focused ? 'list' : 'list-outline'; break;
              case 'Settings': iconName = focused ? 'settings' : 'settings-outline'; break;
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#007AFF', // iOS blue
          tabBarInactiveTintColor: 'gray',
          tabBarStyle: { backgroundColor: 'white', borderTopWidth: 0.5, borderTopColor: '#ccc' },
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Workouts" component={WorkoutsScreen} />
        <Tab.Screen name="Sessions" component={SessionsScreen} />
        <Tab.Screen name="Exercises" component={ExercisesScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
