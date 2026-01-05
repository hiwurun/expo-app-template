import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import useViewerContext from '@/user/useViewerContext';
import Stack from '@nkzw/stack';
import { useRouter } from 'expo-router';
import { useCallback } from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Login() {
  const router = useRouter();
  const { login } = useViewerContext();

  const onPress = useCallback(async () => {
    await login();
    router.replace('/');
  }, [login, router]);

  return (
    <SafeAreaView className="flex-1 bg-background">
      <Stack alignCenter center className="!basis-full" flex1 padding={16}>
        <View className="w-full max-w-sm gap-6 rounded-lg border border-border bg-card p-6">
          <View className="gap-2">
            <Text variant="h2" className="text-center">
              欢迎登录
            </Text>
            <Text variant="muted" className="text-center">
              点击下方按钮登录到应用
            </Text>
          </View>

          <Button onPress={onPress}>
            <Text>登录</Text>
          </Button>

          <Text variant="small" className="text-center text-muted-foreground">
            这是一个示例登录页面
          </Text>
        </View>
      </Stack>
    </SafeAreaView>
  );
}
