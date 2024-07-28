import React from 'react';
import { View, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import ControlEntradas from './ControlEntradas';
import EstadoDispositivo from './EstadoDispositivo';
import Logout from './Logout';

const Tab = createBottomTabNavigator();

const HomeScreen = ({ navigation }) => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'ControlEntradas') {
            iconName = 'home';
          } else if (route.name === 'EstadoDispositivo') {
            iconName = 'tv';
          } else if (route.name === 'Logout') {
            iconName = 'log-out';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#ffffff',
        tabBarInactiveTintColor: '#d1d1d1',
        tabBarStyle: {
          backgroundColor: '#6200ee',
        },
      })}
    >
      <Tab.Screen name="ControlEntradas" component={ControlEntradas} options={{ title: 'Control de Entradas' }} />
      <Tab.Screen name="EstadoDispositivo" component={EstadoDispositivo} options={{ title: 'Estado del Dispositivo' }} />
      <Tab.Screen name="Logout" component={Logout} options={{ title: 'Logout' }} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default HomeScreen;


