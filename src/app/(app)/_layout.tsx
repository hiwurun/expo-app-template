import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { Redirect, Stack } from 'expo-router';
import useViewerContext from '../../user/useViewerContext';

export default function TabLayout() {
  const { isAuthenticated } = useViewerContext();

  if (!isAuthenticated) {
    return <Redirect href="/welcome" />;
  }

  return (
    <BottomSheetModalProvider>
      <Stack>
        <Stack.Screen
          name="(tabs)"
          options={{
            contentStyle: {
              backgroundColor: 'transparent',
            },
            headerShown: false,
          }}
        />
      </Stack>
    </BottomSheetModalProvider>
  );
}
