import Ionicons from '@expo/vector-icons/Ionicons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';
import Index from './index';
import Market from './market';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => {
        const iconMap: Record<string, { active: string; inactive: string }> = {
          首页: { active: 'home', inactive: 'home-outline' },
          市场: { active: 'storefront', inactive: 'storefront-outline' },
        };

        return {
          tabBarIcon: ({ focused, color, size }) => {
            const icon = iconMap[route.name] ?? {
              active: 'help',
              inactive: 'help-outline',
            };
            return (
              <Ionicons
                name={(focused ? icon.active : icon.inactive) as any}
                size={size}
                color={color}
              />
            );
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
          headerShown: false, // 隐藏顶部 header
          animation: 'shift',
        };
      }}
    >
      <Tab.Screen name="首页" component={Index} />
      <Tab.Screen name="市场" component={Market} />
    </Tab.Navigator>
  );
}
