import _AntDesign from '@expo/vector-icons/AntDesign.js';
import { type IconProps } from '@expo/vector-icons/build/createIconSet.js';
import { Tabs } from 'expo-router';
import { FC } from 'react';
import colors from '../../../ui/colors.ts';

// Types in `@expo/vector-icons` do not currently work correctly in `"type": "module"` packages.
const AntDesign = _AntDesign as unknown as FC<IconProps<string>>;

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        sceneStyle: {
          backgroundColor: colors.screen,
        },
        tabBarActiveTintColor: colors.accent,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ focused }: { focused: boolean }) => (
            <AntDesign
              color={focused ? colors.accent : colors.text}
              name="ie"
              size={24}
            />
          ),
          title: 'Home',
        }}
      />
      <Tabs.Screen
        name="two"
        options={{
          tabBarIcon: ({ focused }: { focused: boolean }) => (
            <AntDesign
              color={focused ? colors.accent : colors.text}
              name="printer"
              size={24}
            />
          ),
          title: 'Two',
        }}
      />
    </Tabs>
  );
}
