import { ViewerContext } from '@/user/useViewerContext';
import { VStack } from '@nkzw/stack';
import { PortalHost } from '@rn-primitives/portal';
import { Stack } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import '../../global.css';

export const unstable_settings = {
  initialRouteName: '(app)',
};

export default function RootLayout() {
  return (
    <ViewerContext>
      <GestureHandlerRootView>
        {/* <ThemeToggle /> */}
        <VStack className="!basis-full" flex1>
          <Stack
            screenOptions={{
              headerShown: false,
              animation: 'fade',
              gestureEnabled: true,
            }}
          >
            <Stack.Screen name="welcome" />
            <Stack.Screen name="login" options={{ gestureEnabled: false }} />
            <Stack.Screen name="register" options={{ gestureEnabled: false }} />
            <Stack.Screen name="(app)" />
          </Stack>
        </VStack>
        <PortalHost />
      </GestureHandlerRootView>
    </ViewerContext>
  );
}
