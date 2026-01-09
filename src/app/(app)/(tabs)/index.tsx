import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { USER_API_ENDPOINTS } from '@/constants/api-endpoints';
import { cx } from '@/lib/cx';
import { fetchGET } from '@/lib/fetch-helper';
import useAuthStore, { selectUser } from '@/stores/useAuthStore';
import usePointsStore, { selectPoints } from '@/stores/usePointsStore';
import Stack, { VStack } from '@nkzw/stack';
import { Stack as ExpoStack } from 'expo-router';
import { ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Index() {
  const user = useAuthStore(selectUser);
  const points = usePointsStore(selectPoints);

  // 测试 401：先把 token 改成无效值，再发起请求触发 401
  const test401 = async () => {
    // 临时设置无效 token
    useAuthStore.setState({ token: 'invalid-token-for-test' });
    try {
      // 发起请求，会因为 token 无效返回 401
      await fetchGET(USER_API_ENDPOINTS.GET_USER, { include_permissions: 1 });
    } catch (error) {
      console.log('[Test 401] 触发 401，应该跳转到 welcome');
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }} edges={['top', 'bottom']}>
      <ExpoStack.Screen options={{ headerShown: false }} />
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <VStack alignCenter center flex1 gap={16} padding>
          <Text className="text-center text-xl font-bold color-accent">
            Welcome
          </Text>
          <Text className="text-center italic">
            Modern, sensible defaults, fast.
          </Text>

          {/* 调试信息 */}
          <VStack className="bg-subtle w-full rounded-lg p-4" gap={8}>
            <Text className="font-bold">User:</Text>
            <Text className="text-xs">{JSON.stringify(user, null, 2)}</Text>
          </VStack>

          <VStack className="bg-subtle w-full rounded-lg p-4" gap={8}>
            <Text className="font-bold">Points:</Text>
            <Text className="text-xs">{JSON.stringify(points, null, 2)}</Text>
          </VStack>

          {/* 测试 401 按钮 */}
          <Button onPress={test401} variant="destructive">
            <Text>测试 401 (跳转 welcome)</Text>
          </Button>

          <Stack alignCenter center gap={4}>
            <Text className="text-center">
              Change{' '}
              <View
                className={cx(
                  'bg-subtle inline-flex rounded border border-accent p-1',
                  'android:translate-y-[9px] ios:translate-y-[9px]',
                )}
              >
                <Text>src/app/(app)/(tabs)/index.tsx</Text>
              </View>{' '}
              for live updates.
            </Text>
          </Stack>
        </VStack>
      </ScrollView>
    </SafeAreaView>
  );
}
