import { AuthScaffold } from '@/components/AuthScaffold';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Text } from '@/components/ui/text';
import useViewerContext from '@/user/useViewerContext';
import { useRouter } from 'expo-router';
import { Eye, EyeClosed, Lock, Phone } from 'lucide-react-native';
import { useCallback, useState } from 'react';
import { Pressable, ScrollView, View } from 'react-native';

const iconSize = 20;

export default function Login() {
  const router = useRouter();
  const { login } = useViewerContext();
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const onLogin = useCallback(async () => {
    await login();
    router.replace('/');
  }, [login, router]);

  return (
    <AuthScaffold bgTop={-120}>
      <ScrollView
        className="flex-1"
        contentContainerClassName="flex-grow justify-end px-6 pb-12 pt-20"
      >
        <View className="w-full max-w-md gap-8">
          <View className="gap-2">
            <Text className="text-[38px] font-medium text-foreground">
              登录
            </Text>
            <View className="h-[3px] w-[74px] bg-destructive" />
          </View>

          <View className="gap-6">
            <View className="gap-2">
              <Text className="text-base font-medium text-muted-foreground">
                手机号
              </Text>
              <Input
                placeholder="请输入手机号"
                value={phone}
                onChangeText={setPhone}
                leftIcon={<Phone size={iconSize} />}
                keyboardType="phone-pad"
                containerClassName="bg-transparent border-0 border-b border-border rounded-none px-0 h-auto py-2"
                className="text-foreground"
              />
            </View>

            <View className="gap-2">
              <Text className="text-base font-medium text-muted-foreground">
                密码
              </Text>
              <Input
                placeholder="请输入密码"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                leftIcon={<Lock size={iconSize} />}
                rightIcon={
                  <Pressable onPress={() => setShowPassword(!showPassword)}>
                    {showPassword ? (
                      <Eye size={iconSize} />
                    ) : (
                      <EyeClosed size={iconSize} />
                    )}
                  </Pressable>
                }
                containerClassName="bg-transparent border-0 border-b border-border rounded-none px-0 h-auto py-2"
                className="text-foreground"
              />
            </View>

            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center gap-3">
                <Checkbox
                  checked={rememberMe}
                  onCheckedChange={(value) => setRememberMe(!!value)}
                  className="border-muted-foreground"
                  checkedClassName="border-destructive"
                  indicatorClassName="bg-destructive"
                  iconClassName="text-destructive-foreground"
                />
                <Text className="text-xs font-medium text-foreground">
                  记住我
                </Text>
              </View>

              <Pressable>
                <Text className="text-xs font-semibold text-destructive">
                  忘记密码？
                </Text>
              </Pressable>
            </View>
          </View>

          <Button
            onPress={onLogin}
            variant="destructive"
            size="lg"
            className="mt-4 rounded-xl shadow-sm active:opacity-90"
          >
            <Text className="text-lg font-semibold text-destructive-foreground">
              登录
            </Text>
          </Button>

          <View className="flex-row justify-center gap-1">
            <Text className="text-sm text-muted-foreground">还没有账号？</Text>
            <Pressable onPress={() => router.replace('/register')}>
              <Text className="text-sm font-medium text-destructive">
                立即注册
              </Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </AuthScaffold>
  );
}
