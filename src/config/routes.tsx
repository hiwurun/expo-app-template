import _AntDesign from '@expo/vector-icons/AntDesign.js';
import { type IconProps } from '@expo/vector-icons/build/createIconSet.js';
import { FC } from 'react';

// Types in `@expo/vector-icons` do not currently work correctly in `"type": "module"` packages.
const AntDesign = _AntDesign as unknown as FC<IconProps<string>>;

/**
 * 统一的路由配置
 */

// 根路由配置
export const rootRoutes = [
  { name: 'welcome' },
  { name: 'login' },
  { name: 'register' },
  { name: '(app)' },
] as const;

// Tab 路由配置
export const tabRoutes = [
  {
    name: 'index',
    title: 'Home',
    icon: (focused: boolean) => (
      <AntDesign
        color={focused ? 'text-accent' : 'text-text'}
        name="ie"
        size={24}
      />
    ),
  },
  {
    name: 'two',
    title: 'Two',
    icon: (focused: boolean) => (
      <AntDesign
        color={focused ? 'text-accent' : 'text-text'}
        name="printer"
        size={24}
      />
    ),
  },
] as const;

// 导航配置
export const navigationConfig = {
  initialRouteName: '(app)',
  stackScreenOptions: {
    headerShown: false,
    animation: 'fade' as const,
    gestureEnabled: false,
  },
  tabScreenOptions: {
    sceneStyle: {
      backgroundColor: 'bg-background',
    },
    tabBarActiveTintColor: 'text-accent',
  },
};
