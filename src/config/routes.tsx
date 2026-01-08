import Ionicons from '@expo/vector-icons/Ionicons';

/**
 * 统一的路由配置
 */

// 根路由配置
export const rootRoutes = [{ name: '(auth)' }, { name: '(app)' }] as const;

// 认证路由配置
export const authRoutes = [
  { name: 'welcome' },
  { name: 'login' },
  { name: 'register' },
] as const;

// Tab 路由配置
export const tabRoutes = [
  {
    name: 'index',
    title: '首页',
    icon: (focused: boolean, color: string) => (
      <Ionicons
        name={focused ? 'home-sharp' : 'home-outline'}
        color={color}
        size={24}
      />
    ),
  },
  {
    name: 'two',
    title: '我的',
    icon: (focused: boolean, color: string) => (
      <Ionicons
        color={color}
        name={focused ? 'person-sharp' : 'person-outline'}
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
    tabBarActiveTintColor: '#007AFF',
    tabBarInactiveTintColor: '#8E8E93',
  },
};
