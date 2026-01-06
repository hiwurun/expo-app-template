import { Text } from '@/components/ui/text';
import useAuthStore from '@/stores/useAuthStore';
import { VStack } from '@nkzw/stack';
import { useRouter } from 'expo-router';
import { useCallback } from 'react';

export default function Two() {
  const router = useRouter();
  const clearAuth = useAuthStore((state) => state.logout);

  const logout = useCallback(() => {
    clearAuth();
    router.replace('/login');
  }, [clearAuth, router]);

  return (
    <VStack flex1 padding={16}>
      <Text onPress={logout}>Logout</Text>
    </VStack>
  );
}
