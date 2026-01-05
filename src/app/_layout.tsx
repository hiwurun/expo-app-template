import '../../global.css';
import { ThemeToggle } from '@/components/ThemeToggle';
import { ViewerContext } from '@/user/useViewerContext';
import { VStack } from '@nkzw/stack';
import { PortalHost } from '@rn-primitives/portal';
import { Slot } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export const unstable_settings = {
  initialRouteName: '(app)',
};

export default function RootLayout() {
  return (
    <ViewerContext>
      <GestureHandlerRootView>
        <ThemeToggle />
        <VStack className="!basis-full" flex1>
          <Slot />
        </VStack>
        <PortalHost />
      </GestureHandlerRootView>
    </ViewerContext>
  );
}
