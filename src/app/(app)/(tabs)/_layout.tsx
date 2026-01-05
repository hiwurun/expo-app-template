import { navigationConfig, tabRoutes } from '@/config/routes';
import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs screenOptions={navigationConfig.tabScreenOptions}>
      {tabRoutes.map((route) => (
        <Tabs.Screen
          key={route.name}
          name={route.name}
          options={{
            tabBarIcon: ({ focused }: { focused: boolean }) =>
              route.icon(focused),
            title: route.title,
          }}
        />
      ))}
    </Tabs>
  );
}
