import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { Stack } from 'expo-router';

export default function TabLayout() {
  // const { isAuthenticated } = useViewerContext();

  // if (!isAuthenticated) {
  //   return <Redirect href="/welcome" />;
  // }

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
