import { Text } from '@/components/ui/text';
import { VStack } from '@nkzw/stack';
import { useRouter } from 'expo-router';
import { useCallback } from 'react';

export default function Two() {
  const router = useRouter();
  const logout = useCallback(() => {
    router.replace('/login');
  }, []);

  return (
    <VStack flex1 padding={16}>
      <Text onPress={logout}>Logout</Text>
    </VStack>
  );
}
