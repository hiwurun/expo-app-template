import { AuthScaffold } from '@/components/AuthScaffold';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { FormInput } from '@/components/ui/form-input';
import { Text } from '@/components/ui/text';
import useLogin from '@/hooks/auth/useLogin';
import { cn } from '@/lib/utils';
import { loginPasswordSchema, type LoginPasswordInput } from '@/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'expo-router';
import { Eye, EyeClosed, Lock, Phone } from 'lucide-react-native';
import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Pressable, ScrollView, View } from 'react-native';

const iconSize = 20;

export default function Login() {
  const router = useRouter();
  const { login } = useLogin('password');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<LoginPasswordInput>({
    resolver: zodResolver(loginPasswordSchema),
    defaultValues: {
      phone: '',
      password: '',
    },
    mode: 'onChange',
  });
  const onLogin = useCallback(
    async (_values: LoginPasswordInput) => {
      await login();
    },
    [login],
  );

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
            <FormInput
              control={control}
              name="phone"
              label="手机号"
              placeholder="请输入手机号"
              leftIcon={<Phone size={iconSize} />}
              keyboardType="phone-pad"
              containerClassName={cn(
                'bg-transparent border-0 border-b border-border rounded-none px-0 h-auto py-2',
                errors.phone && 'border-destructive',
              )}
              className="text-foreground"
              error={errors.phone?.message}
            />

            <FormInput
              control={control}
              name="password"
              label="密码"
              placeholder="请输入密码"
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
              containerClassName={cn(
                'bg-transparent border-0 border-b border-border rounded-none px-0 h-auto py-2',
                errors.password && 'border-destructive',
              )}
              className="text-foreground"
              error={errors.password?.message}
            />

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
            onPress={handleSubmit(onLogin)}
            variant="destructive"
            size="lg"
            disabled={!isValid || isSubmitting}
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
