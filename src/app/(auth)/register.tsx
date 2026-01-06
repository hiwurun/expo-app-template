import { AuthScaffold } from '@/components/AuthScaffold';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Text } from '@/components/ui/text';
import useViewerContext from '@/user/useViewerContext';
import { useRouter } from 'expo-router';
import { Eye, EyeClosed, Lock, Phone } from 'lucide-react-native';
import { useCallback, useState } from 'react';
import { Pressable, ScrollView, View } from 'react-native';

export default function Register() {
  const router = useRouter();
  const { login } = useViewerContext(); // Using login context for now as registration placeholder

  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const onSignUp = useCallback(async () => {
    // Implement actual registration logic here
    await login();
    router.replace('/');
  }, [login, router]);

  return (
    <AuthScaffold bgTop={-200}>
      <ScrollView
        className="flex-1"
        contentContainerClassName="flex-grow justify-end px-6 pb-12 pt-20"
      >
        <View className="w-full max-w-md gap-8">
          <View className="gap-2">
            <Text className="text-[38px] font-medium text-foreground">
              注册
            </Text>
            <View className="h-[3px] w-[74px] bg-destructive" />
          </View>

          <View className="gap-5">
            <View className="gap-2">
              <Text className="text-base font-medium text-muted-foreground">
                手机号
              </Text>
              <Input
                placeholder="请输入手机号"
                value={phone}
                onChangeText={setPhone}
                leftIcon={<Phone size={20} />}
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
                leftIcon={<Lock size={20} />}
                rightIcon={
                  <Pressable onPress={() => setShowPassword(!showPassword)}>
                    {showPassword ? <Eye size={20} /> : <EyeClosed size={20} />}
                  </Pressable>
                }
                containerClassName="bg-transparent border-0 border-b border-border rounded-none px-0 h-auto py-2"
                className="text-foreground"
              />
            </View>

            <View className="gap-2">
              <Text className="text-base font-medium text-muted-foreground">
                确认密码
              </Text>
              <Input
                placeholder="请再次输入密码"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry={!showConfirmPassword}
                leftIcon={<Lock size={20} />}
                rightIcon={
                  <Pressable
                    onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <Eye size={20} />
                    ) : (
                      <EyeClosed size={20} />
                    )}
                  </Pressable>
                }
                containerClassName="bg-transparent border-0 border-b border-border rounded-none px-0 h-auto py-2"
                className="text-foreground"
              />
            </View>
          </View>

          <Button
            onPress={onSignUp}
            variant="destructive"
            size="lg"
            className="mt-4 rounded-xl shadow-sm active:opacity-90"
          >
            <Text className="text-lg font-semibold text-destructive-foreground">
              创建账号
            </Text>
          </Button>

          <View className="flex-row justify-center gap-1">
            <Text className="text-sm text-muted-foreground">已有账号？</Text>
            <Pressable onPress={() => router.replace('/login')}>
              <Text className="text-sm font-medium text-destructive">
                前往登录
              </Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </AuthScaffold>
  );
}
