import { authRoutes, navigationConfig } from '@/config/routes';
import { Stack } from 'expo-router';

export default function AuthLayout() {
  return (
    <Stack screenOptions={navigationConfig.stackScreenOptions}>
      {authRoutes.map((route) => (
        <Stack.Screen key={route.name} name={route.name} />
      ))}
    </Stack>
  );
}
