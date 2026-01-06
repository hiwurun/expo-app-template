import { AuthScaffold } from '@/components/AuthScaffold';
import { Button } from '@/components/ui/button';
import { FormInput } from '@/components/ui/form-input';
import { Text } from '@/components/ui/text';
import { cn } from '@/lib/utils';
import { signupSchema, type SignupInput } from '@/schemas';
import useViewerContext from '@/user/useViewerContext';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'expo-router';
import { Eye, EyeClosed, KeyRound, Lock, Phone } from 'lucide-react-native';
import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Pressable, ScrollView, View } from 'react-native';

const iconSize = 20;

export default function Register() {
  const router = useRouter();
  const { login } = useViewerContext();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<SignupInput>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      phone: '',
      code: '',
      password: '',
      confirmPassword: '',
    },
    mode: 'onChange',
  });

  const onSignUp = useCallback(
    async (_values: SignupInput) => {
      await login();
    },
    [login],
  );

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
              name="code"
              label="验证码"
              placeholder="请输入短信验证码"
              keyboardType="number-pad"
              leftIcon={<KeyRound size={iconSize} />}
              containerClassName={cn(
                'bg-transparent border-0 border-b border-border rounded-none px-0 h-auto py-2',
                errors.code && 'border-destructive',
              )}
              className="text-foreground"
              error={errors.code?.message}
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

            <FormInput
              control={control}
              name="confirmPassword"
              label="确认密码"
              placeholder="请再次输入密码"
              secureTextEntry={!showConfirmPassword}
              leftIcon={<Lock size={iconSize} />}
              rightIcon={
                <Pressable
                  onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <Eye size={iconSize} />
                  ) : (
                    <EyeClosed size={iconSize} />
                  )}
                </Pressable>
              }
              containerClassName={cn(
                'bg-transparent border-0 border-b border-border rounded-none px-0 h-auto py-2',
                errors.confirmPassword && 'border-destructive',
              )}
              className="text-foreground"
              error={errors.confirmPassword?.message}
            />
          </View>

          <Button
            onPress={handleSubmit(onSignUp)}
            variant="destructive"
            size="lg"
            disabled={!isValid || isSubmitting}
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
