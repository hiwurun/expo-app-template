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
