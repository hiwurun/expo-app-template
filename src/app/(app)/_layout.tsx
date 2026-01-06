import useRefreshAuth from '@/hooks/auth/useRefreshAuth';
import useAuthStore, { selectIsLoggedIn } from '@/stores/useAuthStore';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { Redirect, Stack } from 'expo-router';

export default function TabLayout() {
  const isLoggedIn = useAuthStore(selectIsLoggedIn);
  const hasHydrated = useAuthStore((state) => state.hasHydrated);

  useRefreshAuth();

  if (!hasHydrated) {
    return null;
  }

  if (!isLoggedIn) {
    return <Redirect href="/login" />;
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
