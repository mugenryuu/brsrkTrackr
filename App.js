import * as React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from './screens/HomeScreen';
import WorkoutListScreen from './screens/Workout/WorkoutListScreen';
import WorkoutScreen from './screens/Workout/WorkoutScreen';
import WorkoutFormScreen from './screens/Workout/WorkoutFormScreen';
import WorkoutViewScreen from './screens/Workout/WorkoutViewScreen';
import SessionListScreen from './screens/Session/SessionListScreen';
import SessionScreen from './screens/Session/SessionScreen';
import ExerciseListScreen from './screens/Exercise/ExerciseListScreen';
import ExerciseScreen from './screens/Exercise/ExerciseScreen';
import ExerciseFormScreen from './screens/Exercise/ExerciseFormScreen';
import SettingsScreen from './screens/SettingsScreen';


const WorkoutStack = createNativeStackNavigator();
const SessionStack = createNativeStackNavigator();
const ExercisesStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function WorkoutStackScreen() {
  return (
    <WorkoutStack.Navigator screenOptions={{ headerStyle: { backgroundColor: '#111' }, headerTintColor: '#fff' }}>
      <WorkoutStack.Screen name="WorkoutListScreen" component={WorkoutListScreen} options={{ title: 'Workouts' }} />
      <WorkoutStack.Screen name="WorkoutScreen" component={WorkoutScreen} options={{ title: 'Workout Details' }} />
      <WorkoutStack.Screen name="WorkoutFormScreen" component={WorkoutFormScreen} options={{ headerShown: false }} />
      <WorkoutStack.Screen name="WorkoutViewScreen" component={WorkoutViewScreen} options={{ title: "Workout Details" }} />
    </WorkoutStack.Navigator>
  );
}

function SessionStackScreen() {
  return (
    <SessionStack.Navigator screenOptions={{ headerStyle: { backgroundColor: '#111' }, headerTintColor: '#fff' }}>
      <SessionStack.Screen name="SessionListScreen" component={SessionListScreen} options={{ title: 'Sessions' }} />
      <SessionStack.Screen name="SessionScreen" component={SessionScreen} options={{ title: 'Session Details' }} />
    </SessionStack.Navigator>
  );
}

function ExercisesStackScreen() {
  return (
    <ExercisesStack.Navigator screenOptions={{ headerStyle: { backgroundColor: '#111' }, headerTintColor: '#fff' }}>
      <ExercisesStack.Screen name="ExerciseListScreen" component={ExerciseListScreen} options={{ title: 'Exercises' }} />
      <ExercisesStack.Screen name="ExerciseScreen" component={ExerciseScreen} options={{ title: 'Exercise Details' }} />
      <ExercisesStack.Screen name="ExerciseForm" component={ExerciseFormScreen} options={{ headerShown: false }}
      />
    </ExercisesStack.Navigator>
  );
}

export default function App() {
  const Tab = createBottomTabNavigator();

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
              case 'Settings': iconName = focused ? 'construct' : 'construct-outline'; break;
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#007AFF',
          tabBarInactiveTintColor: 'gray',
          tabBarStyle: { backgroundColor: 'white', borderTopWidth: 0.5, borderTopColor: '#ccc' },
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Workouts" component={WorkoutStackScreen} />
        <Tab.Screen name="Sessions" component={SessionStackScreen} />
        <Tab.Screen name="Exercises" component={ExercisesStackScreen} />
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