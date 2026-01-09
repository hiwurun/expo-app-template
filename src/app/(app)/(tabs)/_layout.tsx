import Ionicons from '@expo/vector-icons/Ionicons';
import { Tabs } from 'expo-router';
import * as React from 'react';

const handleIcon = (routename: string, focused: boolean) => {
  const routeMap = {
    index: {
      focused: 'home',
      unfocused: 'home-outline',
    },
    market: {
      focused: 'trending-up',
      unfocused: 'trending-up-outline',
    },
  };
  const route = routeMap[routename as keyof typeof routeMap];
  return focused ? route?.focused : route?.unfocused;
};

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          const iconName = handleIcon(
            route.name,
            focused,
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
    >
      <Tabs.Screen
        name="index"
        options={{
          title: '首页',
        }}
      />
      <Tabs.Screen
        name="market"
        options={{
          title: '行情',
        }}
      />
    </Tabs>
  );
}
