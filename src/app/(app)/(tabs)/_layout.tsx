import Ionicons from '@expo/vector-icons/Ionicons';
import { Tabs } from 'expo-router';
import * as React from 'react';

const handleIcon = (routename: string) => {
  const routeMap = {
    index: {
      focused: 'home',
      unfocused: 'home-outline',
    },

    two: {
      focused: 'person',
      unfocused: 'person-outline',
    },
  };
  return routeMap[routename as keyof typeof routeMap]?.focused;
};

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          const iconName = handleIcon(
            route.name,
          ) as keyof typeof Ionicons.glyphMap;
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
        animation: 'shift',
        tabBarItemStyle: {
          paddingVertical: 5,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
      })}
    ></Tabs>
  );
}
