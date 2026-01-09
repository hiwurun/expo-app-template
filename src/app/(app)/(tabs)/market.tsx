import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import useAuthStore from '@/stores/useAuthStore';
import { VStack } from '@nkzw/stack';
import { useRouter } from 'expo-router';
import { useCallback } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Market() {
  const router = useRouter();
  const clearAuth = useAuthStore((state) => state.logout);

  const logout = useCallback(() => {
    clearAuth();
    router.replace('/login');
  }, [clearAuth, router]);

  return (
    <SafeAreaView style={{ flex: 1 }} edges={['top']}>
      <VStack flex1 padding={16} center gap={16}>
        <Text className="text-xl font-bold">行情</Text>
        <Text className="mt-4 text-gray-500">行情页面开发中...</Text>

        <Button onPress={logout} variant="destructive" className="mt-8">
          <Text>退出登录</Text>
        </Button>
      </VStack>
    </SafeAreaView>
  );
}
