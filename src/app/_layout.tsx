import { navigationConfig, rootRoutes } from '@/config/routes';
import { queryClient } from '@/lib/query-client';
import { ViewerContext } from '@/user/useViewerContext';
import { VStack } from '@nkzw/stack';
import { PortalHost } from '@rn-primitives/portal';
import { QueryClientProvider } from '@tanstack/react-query';
import { Stack } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import '../../global.css';

export const unstable_settings = {
  initialRouteName: navigationConfig.initialRouteName,
};

export default function RootLayout() {
  return (
    <ViewerContext>
      <GestureHandlerRootView>
        <QueryClientProvider client={queryClient}>
          <SafeAreaProvider>
            {/* <ThemeToggle /> */}
            <VStack className="!basis-full" flex1>
              <Stack screenOptions={navigationConfig.stackScreenOptions}>
                {rootRoutes.map((route) => (
                  <Stack.Screen key={route.name} name={route.name} />
                ))}
              </Stack>
            </VStack>
            <PortalHost />
          </SafeAreaProvider>
        </QueryClientProvider>
      </GestureHandlerRootView>
    </ViewerContext>
  );
}
