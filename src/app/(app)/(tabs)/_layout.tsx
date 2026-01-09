import Ionicons from '@expo/vector-icons/Ionicons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BlurView } from 'expo-blur';
import * as React from 'react';
import { StyleSheet } from 'react-native'; // 引入 StyleSheet
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
          headerShown: false,
          animation: 'shift',
          // 关键1：让 tab bar 绝对定位 + 透明背景
          tabBarStyle: {
            position: 'absolute',
            backgroundColor: 'transparent', // 推荐加上，避免默认白底干扰
            borderTopWidth: 0, // 可选：去掉顶部边线
          },
          // 关键2：BlurView 完全填充
          tabBarBackground: () => (
            <BlurView
              tint="light" // 可选：'light' | 'dark' | 'default'
              intensity={100}
              style={StyleSheet.absoluteFill} // 完全填充
            />
          ),
        };
      }}
    >
      <Tab.Screen name="首页" component={Index} />
      <Tab.Screen name="市场" component={Market} />
    </Tab.Navigator>
  );
}
